import { JSX } from 'preact';
import { useEffect, useRef } from 'preact/hooks';
import { LogEntry } from '../types';
import './LogPanel.css';

interface LogPanelProps {
  logs: LogEntry[];
  onClear: () => void;
}

export function LogPanel({ logs, onClear }: LogPanelProps): JSX.Element {
  const logContainerRef = useRef<HTMLDivElement>(null);

  // 自动滚动到底部
  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logs]);

  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString('zh-CN', {
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  const getLogIcon = (level: LogEntry['level']): string => {
    switch (level) {
      case 'info':
        return 'ℹ️';
      case 'warn':
        return '⚠️';
      case 'error':
        return '❌';
      case 'success':
        return '✅';
      default:
        return 'ℹ️';
    }
  };

  return (
    <div class="log-panel">
      <div class="log-header">
        <h3>执行日志</h3>
        <div class="log-controls">
          <span class="log-count">{logs.length} 条日志</span>
          <button 
            class="clear-button"
            onClick={onClear}
            title="清空日志"
          >
            <svg width="16" height="16" viewBox="0 0 16 16">
              <path 
                d="M2 3h12M5.5 3V2a1 1 0 011-1h3a1 1 0 011 1v1M7 7v6M9 7v6M4 3v10a1 1 0 001 1h6a1 1 0 001-1V3" 
                stroke="currentColor" 
                stroke-width="1.5" 
                fill="none"
              />
            </svg>
            清空
          </button>
        </div>
      </div>

      <div class="log-container" ref={logContainerRef}>
        {logs.length === 0 ? (
          <div class="log-empty">
            <div class="empty-icon">📝</div>
            <p>暂无日志</p>
            <span>执行脚本后，日志将在这里显示</span>
          </div>
        ) : (
          <div class="log-list">
            {logs.map((log) => (
              <div key={log.id} class={`log-entry ${log.level}`}>
                <div class="log-meta">
                  <span class="log-icon">{getLogIcon(log.level)}</span>
                  <span class="log-time">{formatTime(log.timestamp)}</span>
                  {log.scriptId && (
                    <span class="log-script">[{log.scriptId}]</span>
                  )}
                </div>
                <div class="log-message">{log.message}</div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div class="log-footer">
        <div class="log-legend">
          <div class="legend-item">
            <span class="legend-icon info">ℹ️</span>
            <span>信息</span>
          </div>
          <div class="legend-item">
            <span class="legend-icon warn">⚠️</span>
            <span>警告</span>
          </div>
          <div class="legend-item">
            <span class="legend-icon error">❌</span>
            <span>错误</span>
          </div>
          <div class="legend-item">
            <span class="legend-icon success">✅</span>
            <span>成功</span>
          </div>
        </div>
      </div>
    </div>
  );
}
