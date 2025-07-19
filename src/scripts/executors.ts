import { ScriptExecutor } from './base';
import { containsAnyKeyword } from '@/utils/helpers';
import {
  getToViewList,
  getFavoriteResourceList,
  addToToView,
  clearToViewList,
  addOrDeleteToFavorite,
  moveToFavorite,
  getDynamicList,
  deleteDynamic,
  getLotteryInfo,
  getVideoInfo,
  getFavoriteInfo
} from '@/api/bili';
import { av2bv, bv2av, isValidAid } from '@/utils/bvConverter';

/**
 * BV/AV号转换执行器
 */
export class BvAvConverterExecutor extends ScriptExecutor {
  public async execute(parameters: Record<string, any>): Promise<any> {
    const { videoId } = parameters;

    if (!videoId) {
      throw new Error('请输入视频ID');
    }

    this.log('info', `开始转换视频ID: ${videoId}`);
    this.log('debug', `输入参数: ${JSON.stringify(parameters)}`);
    this.updateProgress(20);

    try {
      let result: { input: string; output: string; type: string };

      if (videoId.startsWith('BV')) {
        this.log('debug', `检测到BV号格式，准备转换为AV号`);
        const aid = bv2av(videoId);
        this.log('debug', `转换结果: BV号 ${videoId} → AV号 ${aid}`);
        result = {
          input: videoId,
          output: `av${aid}`,
          type: 'BV → AV'
        };
        this.log('success', `转换成功: ${videoId} → av${aid}`);
      } else if (videoId.startsWith('av')) {
        const aid = parseInt(videoId.slice(2));
        if (!isValidAid(aid)) {
          throw new Error('无效的AV号格式');
        }
        const bvid = av2bv(aid);
        result = {
          input: videoId,
          output: bvid,
          type: 'AV → BV'
        };
        this.log('success', `转换成功: ${videoId} → ${bvid}`);
      } else {
        // 尝试从数字解析为AV号
        const aid = parseInt(videoId);
        if (isValidAid(aid)) {
          const bvid = av2bv(aid);
          result = {
            input: `av${aid}`,
            output: bvid,
            type: 'AV → BV'
          };
          this.log('success', `转换成功: av${aid} → ${bvid}`);
        } else {
          throw new Error('无法识别的视频ID格式，请输入BV号或AV号');
        }
      }

      this.updateProgress(100);
      return result;
    } catch (error) {
      this.log('error', `转换失败: ${error instanceof Error ? error.message : String(error)}`);
      throw error;
    }
  }
}

/**
 * 视频信息获取执行器
 */
export class VideoInfoExecutor extends ScriptExecutor {
  public async execute(parameters: Record<string, any>): Promise<any> {
    const { videoIds } = parameters;

    if (!videoIds) {
      throw new Error('请输入视频ID列表');
    }

    const idList = videoIds.split('\n').filter((id: string) => id.trim()).map((id: string) => id.trim());
    if (idList.length === 0) {
      throw new Error('请输入至少一个视频ID');
    }

    this.log('info', `开始获取 ${idList.length} 个视频的信息`);
    this.updateProgress(10);

    const results: any[] = [];
    const total = idList.length;

    for (let i = 0; i < total; i++) {
      this.checkShouldStop();

      const videoId = idList[i];
      this.log('info', `正在处理: ${videoId} (${i + 1}/${total})`);

      try {
        // 调用真实的API获取视频信息
        const info = await getVideoInfo(videoId);

        results.push({
          id: videoId,
          title: info.title,
          duration: info.duration || 0,
          bvid: info.bvid,
          aid: info.aid,
          type: info.type
        });

        this.log('success', `获取成功: ${videoId} - ${info.title}`);
      } catch (error) {
        this.log('error', `获取失败: ${videoId} - ${error instanceof Error ? error.message : String(error)}`);
        results.push({
          id: videoId,
          error: error instanceof Error ? error.message : String(error)
        });
      }

      this.updateProgress(10 + (i + 1) / total * 90);
    }

    const successCount = results.filter(r => !r.error).length;
    const failCount = results.filter(r => r.error).length;

    this.log('success', `视频信息获取任务完成！成功获取 ${successCount} 个视频信息，失败 ${failCount} 个`);
    if (successCount > 0) {
      this.log('info', `成功获取的视频：${results.filter(r => !r.error).map(r => r.title).join(', ')}`);
    }

    return { results, total: results.length, successCount, failCount };
  }
}

/**
 * 移动最短视频到稍后再看执行器
 */
export class MoveShortestToToviewExecutor extends ScriptExecutor {
  public async execute(parameters: Record<string, any>): Promise<any> {
    const { favoriteId, upTo, durationThreshold, ignoreFrontPage, ignoreTitleKeywords } = parameters;
    
    if (!favoriteId) {
      throw new Error('请输入收藏夹ID');
    }

    this.log('info', `开始从收藏夹 ${favoriteId} 移动最短视频到稍后再看`);
    this.updateProgress(10);

    try {
      // 获取当前稍后再看数量
      const toviewList = await getToViewList();
      const currentCount = toviewList.count;
      const targetCount = upTo || 100;
      
      if (currentCount >= targetCount) {
        this.log('info', `稍后再看已有 ${currentCount} 个视频，达到目标数量 ${targetCount}`);
        return { added: 0, currentCount, targetCount };
      }

      const needCount = targetCount - currentCount;
      this.log('info', `需要添加 ${needCount} 个视频到稍后再看`);
      this.updateProgress(20);

      // 获取收藏夹资源
      const ignorePages = ignoreFrontPage || 6;
      const keywords = ignoreTitleKeywords ? ignoreTitleKeywords.split(',').map((k: string) => k.trim()) : [];
      const maxDuration = durationThreshold || 0;

      let addedCount = 0;
      let pageIndex = ignorePages + 1;
      const pageSize = 20;

      while (addedCount < needCount) {
        this.checkShouldStop();
        
        this.log('info', `正在获取第 ${pageIndex} 页收藏夹资源...`);
        const favoriteData = await getFavoriteResourceList(favoriteId, pageIndex, pageSize);
        
        if (!favoriteData.medias || favoriteData.medias.length === 0) {
          this.log('warn', '已到达收藏夹末尾，停止添加');
          break;
        }

        // 过滤视频
        let candidates = favoriteData.medias.filter(video => {
          // 过滤时长
          if (maxDuration > 0 && video.duration > maxDuration) {
            return false;
          }
          
          // 过滤关键词
          if (keywords.length > 0 && containsAnyKeyword(video.title, keywords)) {
            return false;
          }
          
          return true;
        });

        // 按时长排序，选择最短的
        candidates.sort((a, b) => a.duration - b.duration);
        
        for (const video of candidates) {
          if (addedCount >= needCount) break;
          
          this.checkShouldStop();
          
          try {
            await addToToView(video.id);
            addedCount++;
            this.log('success', `已添加: ${video.title} (时长: ${Math.floor(video.duration / 60)}分钟)`);
          
          } catch (error) {
            this.log('error', `添加失败: ${video.title} - ${error instanceof Error ? error.message : String(error)}`);
          }
          
          this.updateProgress(20 + (addedCount / needCount) * 70);
        }

        pageIndex++;
      }

      this.log('success', `操作完成，共添加 ${addedCount} 个视频到稍后再看`);
      return { added: addedCount, currentCount: currentCount + addedCount, targetCount };
      
    } catch (error) {
      this.log('error', `操作失败: ${error instanceof Error ? error.message : String(error)}`);
      throw error;
    }
  }
}

/**
 * 稍后再看添加到收藏夹执行器
 */
export class AddToviewToFavoriteExecutor extends ScriptExecutor {
  public async execute(parameters: Record<string, any>): Promise<any> {
    const { favoriteId, maxCount, disableSpaceCheck } = parameters;

    if (!favoriteId) {
      throw new Error('请输入收藏夹ID');
    }

    this.log('info', `开始将稍后再看的视频添加到收藏夹 ${favoriteId}`);
    this.updateProgress(5);

    try {
      // 获取稍后再看列表
      const toviewList = await getToViewList();
      if (!toviewList.list || toviewList.list.length === 0) {
        this.log('info', '稍后再看列表为空');
        return { added: 0, total: 0 };
      }

      const maxAdd = maxCount || toviewList.list.length;
      const videosToAdd = toviewList.list.slice(0, maxAdd).reverse(); // 稍后再看最新的视频添加到收藏夹最新的位置

      this.log('info', `准备添加 ${videosToAdd.length} 个视频到收藏夹`);
      this.updateProgress(10);

      // 根据参数决定是否进行容量检查
      if (disableSpaceCheck) {
        this.log('info', '已关闭空间检查，将跳过容量验证');
        this.log('warn', '注意：跳过容量检查可能导致添加失败，建议仅在添加重复视频时使用');
      } else {
        // 获取收藏夹当前信息，检查容量
        this.log('info', '正在检查收藏夹容量...');
        const favoriteInfo = await getFavoriteInfo(favoriteId);
        const currentCount = favoriteInfo.media_count;
        const toAddCount = videosToAdd.length;
        const remainingSpace = 1000 - currentCount;

        this.log('info', `收藏夹当前视频数量: ${currentCount}/1000`);
        this.log('info', `待添加视频数量: ${toAddCount}`);
        this.log('info', `剩余空间: ${remainingSpace}`);

        if (currentCount + toAddCount > 1000) {
          this.log('error', `收藏夹空间不足，无法添加所有视频。当前: ${currentCount}，待添加: ${toAddCount}，剩余空间: ${remainingSpace}`);
          throw new Error('收藏夹空间不足，无法添加所有视频');
        }
      }

      this.updateProgress(20);

      // 逐个添加视频到收藏夹（API不支持多个视频批量添加到一个收藏夹）
      let addedCount = 0;
      const total = videosToAdd.length;

      this.log('info', `开始逐个添加 ${total} 个视频到收藏夹`);

      for (let i = 0; i < total; i++) {
        this.checkShouldStop();

        const video = videosToAdd[i];
        this.log('info', `正在添加: ${video.title} (${i + 1}/${total})`);

        try {
          // 使用正确的API：一个视频添加到一个收藏夹
          await addOrDeleteToFavorite(video.aid, 2, [favoriteId], []);
          addedCount++;
          this.log('success', `添加成功: ${video.title}`);
        } catch (error) {
          this.log('error', `添加失败: ${video.title} - ${error instanceof Error ? error.message : String(error)}`);
          throw error;
        }

        this.updateProgress(30 + (i + 1) / total * 60);
      }

      this.log('success', `操作完成，成功添加 ${addedCount}/${total} 个视频到收藏夹`);
      if (addedCount > 0) {
        this.log('info', `成功添加的视频：${videosToAdd.slice(0, addedCount).map(v => v.title).join(', ')}`);
      }

      return {
        added: addedCount,
        total,
        videos: videosToAdd.slice(0, addedCount).map(v => ({ id: v.id, title: v.title }))
      };
      
    } catch (error) {
      this.log('error', `操作失败: ${error instanceof Error ? error.message : String(error)}`);
      throw error;
    }
  }
}

/**
 * 移动收藏夹视频执行器
 */
export class MoveFavoriteExecutor extends ScriptExecutor {
  public async execute(parameters: Record<string, any>): Promise<any> {
    const { fromFavorite, toFavorite, upTo, onlyWithKeywords } = parameters;
    
    if (!fromFavorite || !toFavorite) {
      throw new Error('请输入源收藏夹ID和目标收藏夹ID');
    }

    this.log('info', `开始从收藏夹 ${fromFavorite} 移动视频到收藏夹 ${toFavorite}`);
    this.updateProgress(10);

    try {
      const keywords = onlyWithKeywords ? onlyWithKeywords.split(',').map((k: string) => k.trim()) : [];
      const maxCount = upTo || 1000;
      
      let movedCount = 0;
      let pageIndex = 1;
      const pageSize = 20;

      while (movedCount < maxCount) {
        this.checkShouldStop();
        
        this.log('info', `正在获取第 ${pageIndex} 页源收藏夹资源...`);
        const favoriteData = await getFavoriteResourceList(fromFavorite, pageIndex, pageSize);
        
        if (!favoriteData.medias || favoriteData.medias.length === 0) {
          this.log('info', '已处理完所有视频');
          break;
        }

        // 过滤视频
        let candidates = favoriteData.medias;
        if (keywords.length > 0) {
          candidates = candidates.filter(video => 
            containsAnyKeyword(video.title, keywords)
          );
        }

        for (const video of candidates) {
          if (movedCount >= maxCount) break;
          
          this.checkShouldStop();
          
          try {
            await moveToFavorite(
              fromFavorite, 
              toFavorite, 
              [{ id: video.id, type: video.type }]
            );
            movedCount++;
            this.log('success', `已移动: ${video.title}`);
            
          } catch (error) {
            this.log('error', `移动失败: ${video.title} - ${error instanceof Error ? error.message : String(error)}`);
          }
          
          this.updateProgress(10 + (movedCount / maxCount) * 80);
        }

        pageIndex++;
      }

      this.log('success', `操作完成，共移动 ${movedCount} 个视频`);
      return { moved: movedCount, maxCount };
      
    } catch (error) {
      this.log('error', `操作失败: ${error instanceof Error ? error.message : String(error)}`);
      throw error;
    }
  }
}

/**
 * 删除过期抽奖动态执行器
 */
export class DeleteTimeoutLotteryExecutor extends ScriptExecutor {
  public async execute(parameters: Record<string, any>): Promise<any> {
    const { detectOnly, notDeleteWinning, userId } = parameters;
    
    this.log('info', `开始${detectOnly ? '检测' : '删除'}过期抽奖动态`);
    this.updateProgress(10);

    try {
      let deletedCount = 0;
      let detectedCount = 0;
      let offset = '';
      
      while (true) {
        this.checkShouldStop();
        
        this.log('info', '正在获取动态列表...');
        const dynamicData = await getDynamicList(userId, offset);
        
        if (!dynamicData.items || dynamicData.items.length === 0) {
          this.log('info', '已处理完所有动态');
          break;
        }

        for (const item of dynamicData.items) {
          this.checkShouldStop();
          
          // 检查是否为抽奖动态
          if (item.type === 'DYNAMIC_TYPE_FORWARD' && item.modules?.module_dynamic?.additional?.type === 'ADDITIONAL_TYPE_LOTTERY') {
            try {
              const lotteryInfo = await getLotteryInfo(item.id_str);
              const isExpired = new Date(lotteryInfo.lottery_time * 1000) < new Date();
              const isWinning = lotteryInfo.lottery_result?.is_winner;
              
              if (isExpired) {
                detectedCount++;
                
                if (notDeleteWinning && isWinning) {
                  this.log('info', `跳过中奖动态: ${item.id_str}`);
                  continue;
                }
                
                if (!detectOnly) {
                  await deleteDynamic(item.id_str);
                  deletedCount++;
                  this.log('success', `已删除过期抽奖动态: ${item.id_str}`);
                } else {
                  this.log('info', `检测到过期抽奖动态: ${item.id_str}`);
                }
              }
            } catch (error) {
              this.log('error', `处理动态失败: ${item.id_str} - ${error instanceof Error ? error.message : String(error)}`);
            }
          }
        }

        offset = dynamicData.offset;
        if (!offset) break;
        
        this.updateProgress(Math.min(90, 10 + detectedCount * 2));
      }

      const message = detectOnly 
        ? `检测完成，发现 ${detectedCount} 个过期抽奖动态`
        : `删除完成，共删除 ${deletedCount}/${detectedCount} 个过期抽奖动态`;
      
      this.log('success', message);
      return { detected: detectedCount, deleted: deletedCount, detectOnly };
      
    } catch (error) {
      this.log('error', `操作失败: ${error instanceof Error ? error.message : String(error)}`);
      throw error;
    }
  }
}

/**
 * 清空稍后再看执行器
 */
export class ClearToviewExecutor extends ScriptExecutor {
  public async execute(parameters: Record<string, any>): Promise<any> {
    const { confirm } = parameters;
    
    if (!confirm) {
      throw new Error('请确认要清空稍后再看列表');
    }

    this.log('info', '开始清空稍后再看列表');
    this.updateProgress(20);

    try {
      // 获取当前稍后再看数量
      const toviewList = await getToViewList();
      const totalCount = toviewList.count;
      
      if (totalCount === 0) {
        this.log('info', '稍后再看列表已为空');
        return { cleared: 0, total: 0 };
      }

      this.log('info', `准备清空 ${totalCount} 个视频`);
      this.updateProgress(50);

      await clearToViewList();
      
      this.updateProgress(100);
      this.log('success', `成功清空稍后再看列表，共清除 ${totalCount} 个视频`);
      
      return { cleared: totalCount, total: totalCount };
      
    } catch (error) {
      this.log('error', `清空失败: ${error instanceof Error ? error.message : String(error)}`);
      throw error;
    }
  }
}
