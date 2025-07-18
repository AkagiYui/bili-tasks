import { JSX } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import { TaskPanelProps } from '../types';
import './TaskPanel.css';
import { GM_setValue, GM_getValue } from '$';

export function TaskPanel(_props: TaskPanelProps = {}): JSX.Element {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const savedCount = GM_getValue('count', 0);
    setCount(savedCount);
  }, []);
  useEffect(() => {
    GM_setValue('count', count);
  }, [count]);

  return (
    <div class="task-panel">
      <div class="task-panel-header">
        <h1>哔哩哔哩任务面板</h1>
        <p>这是一个示例计数器，真正的功能将在未来实现</p>
      </div>
      
      <div class="task-panel-content">
        <div class="counter-section">
          <h2>计数器示例</h2>
          <div class="counter-display">
            <span class="counter-value">{count}</span>
          </div>
          <div class="counter-controls">
            <button 
              class="counter-button counter-button--decrease"
              onClick={() => setCount(count - 1)}
            >
              -
            </button>
            <button 
              class="counter-button counter-button--reset"
              onClick={() => setCount(0)}
            >
              重置
            </button>
            <button 
              class="counter-button counter-button--increase"
              onClick={() => setCount(count + 1)}
            >
              +
            </button>
          </div>
        </div>
        
        <div class="placeholder-section">
          <h2>未来功能</h2>
          <div class="feature-list">
            <div class="feature-item">
              <div class="feature-icon">📋</div>
              <div class="feature-text">
                <h3>任务管理</h3>
                <p>管理哔哩哔哩相关任务</p>
              </div>
            </div>
            <div class="feature-item">
              <div class="feature-icon">⚙️</div>
              <div class="feature-text">
                <h3>设置选项</h3>
                <p>自定义脚本行为</p>
              </div>
            </div>
            <div class="feature-item">
              <div class="feature-icon">📊</div>
              <div class="feature-text">
                <h3>数据统计</h3>
                <p>查看使用统计信息</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
