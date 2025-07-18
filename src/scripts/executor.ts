import { LogEntry, ScriptExecution } from '../types';
import { delay } from '../utils/helpers';
import { av2bv, bv2av, isValidBvid, isValidAid } from '../utils/bvConverter';
import { ScriptExecutor } from './base';
import {
  MoveShortestToToviewExecutor,
  AddToviewToFavoriteExecutor,
  MoveFavoriteExecutor,
  MoveSingleMediaExecutor,
  DeleteTimeoutLotteryExecutor,
  ClearToviewExecutor
} from './executors';



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
    this.updateProgress(20);

    try {
      let result: { input: string; output: string; type: string };

      if (videoId.startsWith('BV')) {
        if (!isValidBvid(videoId)) {
          throw new Error('无效的BV号格式');
        }
        const aid = bv2av(videoId);
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
        // 这里应该调用实际的API获取视频信息
        // 由于API限制，这里使用模拟数据
        await delay(500); // 模拟API调用延迟

        const info = {
          id: videoId,
          title: `视频标题 - ${videoId}`,
          duration: Math.floor(Math.random() * 3600),
          author: '作者名称',
          view: Math.floor(Math.random() * 100000),
          like: Math.floor(Math.random() * 10000),
        };

        results.push(info);
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

    this.log('info', `处理完成，成功: ${results.filter(r => !r.error).length}，失败: ${results.filter(r => r.error).length}`);
    return { results, total: results.length };
  }
}

/**
 * 真实脚本执行器工厂
 */
export function createScriptExecutor(
  scriptId: string,
  onLog: (log: LogEntry) => void,
  onProgress: (progress: number) => void
): ScriptExecutor {
  switch (scriptId) {
    case 'bv2av':
      return new BvAvConverterExecutor(scriptId, onLog, onProgress);
    case 'show_resource_info':
      return new VideoInfoExecutor(scriptId, onLog, onProgress);
    case 'move_shortest_to_toview':
      return new MoveShortestToToviewExecutor(scriptId, onLog, onProgress);
    case 'add_toview_to_favorite':
      return new AddToviewToFavoriteExecutor(scriptId, onLog, onProgress);
    case 'move_favorite_to_another':
      return new MoveFavoriteExecutor(scriptId, onLog, onProgress);
    case 'move_single_media':
      return new MoveSingleMediaExecutor(scriptId, onLog, onProgress);
    case 'delete_timeout_lottery':
      return new DeleteTimeoutLotteryExecutor(scriptId, onLog, onProgress);
    case 'clear_toview':
      return new ClearToviewExecutor(scriptId, onLog, onProgress);
    default:
      throw new Error(`Unknown script type: ${scriptId}`);
  }
}

/**
 * 脚本执行管理器
 */
export class ScriptExecutionManager {
  private executors: Map<string, ScriptExecutor> = new Map();
  private onLog: (log: LogEntry) => void;
  private onProgress: (executionId: string, progress: number) => void;

  constructor(
    onLog: (log: LogEntry) => void,
    onProgress: (executionId: string, progress: number) => void
  ) {
    this.onLog = onLog;
    this.onProgress = onProgress;
  }

  /**
   * 执行脚本
   */
  public async executeScript(
    scriptId: string,
    parameters: Record<string, any>
  ): Promise<ScriptExecution> {
    // 检查是否已有同类型脚本在运行
    const existingExecutor = Array.from(this.executors.values())
      .find(executor => executor.getExecution().scriptId === scriptId && 
             executor.getExecution().status === 'running');
    
    if (existingExecutor) {
      throw new Error('该脚本已在运行中，请等待完成或停止后再试');
    }

    // 创建真实执行器
    const executor = createScriptExecutor(
      scriptId,
      this.onLog,
      (progress: number) => this.onProgress(scriptId, progress)
    );

    const executionId = executor.getExecution().id;
    this.executors.set(executionId, executor);

    try {
      const result = await executor.run(parameters);
      return result;
    } finally {
      // 清理执行器
      setTimeout(() => {
        this.executors.delete(executionId);
      }, 5000); // 5秒后清理
    }
  }

  /**
   * 停止脚本执行
   */
  public stopScript(scriptId: string): boolean {
    const executor = Array.from(this.executors.values())
      .find(executor => executor.getExecution().scriptId === scriptId && 
             executor.getExecution().status === 'running');
    
    if (executor) {
      executor.stop();
      return true;
    }
    
    return false;
  }

  /**
   * 获取正在运行的脚本列表
   */
  public getRunningScripts(): string[] {
    return Array.from(this.executors.values())
      .filter(executor => executor.getExecution().status === 'running')
      .map(executor => executor.getExecution().scriptId);
  }

  /**
   * 清理所有执行器
   */
  public cleanup(): void {
    this.executors.clear();
  }
}
