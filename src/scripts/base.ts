import { ScriptExecution, LogEntry } from '@/types';
import { generateId } from '@/utils/helpers';

/**
 * 脚本执行器基类
 */
export abstract class ScriptExecutor {
  protected execution: ScriptExecution;
  protected onLog: (log: LogEntry) => void;
  protected onProgress: (progress: number) => void;
  protected shouldStop: boolean = false;

  constructor(
    scriptId: string,
    onLog: (log: LogEntry) => void,
    onProgress: (progress: number) => void
  ) {
    this.execution = {
      id: generateId(),
      scriptId,
      status: 'running',
      startTime: new Date(),
      progress: 0,
      logs: [],
    };
    this.onLog = onLog;
    this.onProgress = onProgress;
  }

  /**
   * 记录日志
   */
  protected log(level: LogEntry['level'], message: string): void {
    const logEntry: LogEntry = {
      id: generateId(),
      timestamp: new Date(),
      level,
      message,
      scriptId: this.execution.scriptId,
    };
    
    this.execution.logs.push(logEntry);
    this.onLog(logEntry);
  }

  /**
   * 更新进度
   */
  protected updateProgress(progress: number): void {
    this.execution.progress = Math.max(0, Math.min(100, progress));
    this.onProgress(this.execution.progress);
  }

  /**
   * 检查是否应该停止执行
   */
  protected checkShouldStop(): void {
    if (this.shouldStop) {
      throw new Error('Script execution was stopped by user');
    }
  }

  /**
   * 停止脚本执行
   */
  public stop(): void {
    this.shouldStop = true;
    this.log('warn', '用户请求停止脚本执行');
  }

  /**
   * 执行脚本（抽象方法，由子类实现）
   */
  public abstract execute(parameters: Record<string, any>): Promise<any>;

  /**
   * 运行脚本的完整流程
   */
  public async run(parameters: Record<string, any>): Promise<ScriptExecution> {
    try {
      this.log('info', '开始执行脚本');
      this.updateProgress(0);

      const result = await this.execute(parameters);

      this.execution.status = 'completed';
      this.execution.endTime = new Date();
      this.execution.result = result;
      this.updateProgress(100);
      this.log('success', '脚本执行完成');

    } catch (error) {
      this.execution.status = this.shouldStop ? 'stopped' : 'failed';
      this.execution.endTime = new Date();
      this.execution.error = error instanceof Error ? error.message : String(error);
      
      if (this.shouldStop) {
        this.log('warn', '脚本执行已停止');
      } else {
        this.log('error', `脚本执行失败: ${this.execution.error}`);
      }
    }

    return this.execution;
  }

  /**
   * 获取执行状态
   */
  public getExecution(): ScriptExecution {
    return { ...this.execution };
  }
}
