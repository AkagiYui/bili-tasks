import { JSX } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import { ScriptCard } from './ScriptCard';
import { LogPanel } from './LogPanel';
import { LogEntry, AppState } from '../types';
import { SCRIPT_CONFIGS } from '../scripts/config';
import { ScriptExecutionManager } from '../scripts/executor';
import { generateId } from '../utils/helpers';
import { GM_setValue, GM_getValue } from '$';
import './ScriptManager.css';

export function ScriptManager(): JSX.Element {
  const [appState, setAppState] = useState<AppState>(() => ({
    scripts: SCRIPT_CONFIGS.map(config => ({ ...config })),
    executions: [],
    logs: [],
    selectedScript: null,
    isModalOpen: true,
  }));

  const [executionManager] = useState(() => new ScriptExecutionManager(
    (log: LogEntry) => {
      setAppState(prev => ({
        ...prev,
        logs: [...prev.logs, log]
      }));
    },
    (scriptId: string, progress: number) => {
      setAppState(prev => ({
        ...prev,
        scripts: prev.scripts.map(script => 
          script.id === scriptId 
            ? { ...script, progress }
            : script
        )
      }));
    }
  ));

  // 从GM存储加载日志
  useEffect(() => {
    const savedLogs = GM_getValue('bili_tasks_logs', '[]');
    try {
      const logs = JSON.parse(savedLogs).map((log: any) => ({
        ...log,
        timestamp: new Date(log.timestamp)
      }));
      setAppState(prev => ({ ...prev, logs }));
    } catch (error) {
      console.warn('Failed to load saved logs:', error);
    }
  }, []);

  // 保存日志到GM存储
  useEffect(() => {
    const logsToSave = appState.logs.slice(-100); // 只保存最近100条
    GM_setValue('bili_tasks_logs', JSON.stringify(logsToSave));
  }, [appState.logs]);

  const handleExecuteScript = async (scriptId: string, parameters: Record<string, any>) => {
    // 更新脚本运行状态
    setAppState(prev => ({
      ...prev,
      scripts: prev.scripts.map(script => 
        script.id === scriptId 
          ? { ...script, isRunning: true, lastRun: new Date() }
          : script
      )
    }));

    try {
      await executionManager.executeScript(scriptId, parameters);
    } catch (error) {
      const errorLog: LogEntry = {
        id: generateId(),
        timestamp: new Date(),
        level: 'error',
        message: `脚本执行失败: ${error instanceof Error ? error.message : String(error)}`,
        scriptId,
      };
      
      setAppState(prev => ({
        ...prev,
        logs: [...prev.logs, errorLog]
      }));
    } finally {
      // 更新脚本运行状态
      setAppState(prev => ({
        ...prev,
        scripts: prev.scripts.map(script => 
          script.id === scriptId 
            ? { ...script, isRunning: false }
            : script
        )
      }));
    }
  };

  const handleStopScript = (scriptId: string) => {
    const success = executionManager.stopScript(scriptId);
    if (success) {
      const stopLog: LogEntry = {
        id: generateId(),
        timestamp: new Date(),
        level: 'warn',
        message: '用户请求停止脚本执行',
        scriptId,
      };
      
      setAppState(prev => ({
        ...prev,
        logs: [...prev.logs, stopLog],
        scripts: prev.scripts.map(script => 
          script.id === scriptId 
            ? { ...script, isRunning: false }
            : script
        )
      }));
    }
  };

  const handleClearLogs = () => {
    setAppState(prev => ({ ...prev, logs: [] }));
    GM_setValue('bili_tasks_logs', '[]');
  };

  const getScriptProgress = (scriptId: string): number => {
    const script = appState.scripts.find(s => s.id === scriptId);
    return (script as any)?.progress || 0;
  };

  const toolScripts = appState.scripts.filter(script => script.category === 'tool');
  const operationScripts = appState.scripts.filter(script => script.category === 'operation');

  return (
    <div class="script-manager">
      <div class="script-manager-header">
        <h1>哔哩哔哩任务管理器</h1>
        <p>基于油猴脚本的B站自动化工具集合</p>
        <div class="status-bar">
          <div class="status-item">
            <span class="status-label">工具脚本:</span>
            <span class="status-value">{toolScripts.length}</span>
          </div>
          <div class="status-item">
            <span class="status-label">操作脚本:</span>
            <span class="status-value">{operationScripts.length}</span>
          </div>
          <div class="status-item">
            <span class="status-label">运行中:</span>
            <span class="status-value running">
              {appState.scripts.filter(s => s.isRunning).length}
            </span>
          </div>
        </div>
      </div>

      <div class="script-manager-content">
        <div class="scripts-panel">
          <div class="scripts-section">
            <h2>🔧 工具脚本</h2>
            <div class="scripts-list">
              {toolScripts.map(script => (
                <ScriptCard
                  key={script.id}
                  script={script}
                  onExecute={handleExecuteScript}
                  onStop={handleStopScript}
                  isRunning={script.isRunning}
                  progress={getScriptProgress(script.id)}
                />
              ))}
            </div>
          </div>

          <div class="scripts-section">
            <h2>⚙️ 操作脚本</h2>
            <div class="scripts-list">
              {operationScripts.map(script => (
                <ScriptCard
                  key={script.id}
                  script={script}
                  onExecute={handleExecuteScript}
                  onStop={handleStopScript}
                  isRunning={script.isRunning}
                  progress={getScriptProgress(script.id)}
                />
              ))}
            </div>
          </div>
        </div>

        <div class="logs-panel">
          <LogPanel 
            logs={appState.logs}
            onClear={handleClearLogs}
          />
        </div>
      </div>
    </div>
  );
}
