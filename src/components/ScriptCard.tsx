import { JSX } from 'preact';
import { useState, useEffect } from 'preact/hooks';
import { ScriptConfig, ScriptParameter } from '../types';
import { GM_setValue, GM_getValue } from '$';
import './ScriptCard.css';

interface ScriptCardProps {
  script: ScriptConfig;
  onExecute: (scriptId: string, parameters: Record<string, any>) => void;
  onStop: (scriptId: string) => void;
  isRunning: boolean;
  progress?: number;
}

export function ScriptCard({
  script,
  onExecute,
  onStop,
  isRunning,
  progress = 0
}: ScriptCardProps): JSX.Element {
  const [parameters, setParameters] = useState<Record<string, any>>({});
  const [isExpanded, setIsExpanded] = useState(false);

  // 从GM存储加载参数
  useEffect(() => {
    const storageKey = `bili_tasks_params_${script.id}`;
    const savedParams = GM_getValue(storageKey, '{}');

    try {
      const parsedParams = JSON.parse(savedParams);
      const initialParams: Record<string, any> = {};

      script.parameters.forEach(param => {
        // 优先使用保存的参数，否则使用默认值
        initialParams[param.key] = parsedParams[param.key] !== undefined
          ? parsedParams[param.key]
          : param.defaultValue;
      });

      setParameters(initialParams);
    } catch (error) {
      console.warn('Failed to load saved parameters:', error);
      // 如果解析失败，使用默认值
      const initialParams: Record<string, any> = {};
      script.parameters.forEach(param => {
        initialParams[param.key] = param.defaultValue;
      });
      setParameters(initialParams);
    }
  }, [script.id, script.parameters]);

  // 保存参数到GM存储
  useEffect(() => {
    if (Object.keys(parameters).length > 0) {
      const storageKey = `bili_tasks_params_${script.id}`;
      GM_setValue(storageKey, JSON.stringify(parameters));
    }
  }, [parameters, script.id]);

  const handleParameterChange = (key: string, value: any) => {
    setParameters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleExecute = () => {
    // 验证必填参数
    const missingParams = script.parameters
      .filter(param => param.required && !parameters[param.key])
      .map(param => param.label);

    if (missingParams.length > 0) {
      alert(`请填写必填参数: ${missingParams.join(', ')}`);
      return;
    }

    onExecute(script.id, parameters);
  };

  const handleStop = () => {
    onStop(script.id);
  };

  const renderParameterInput = (param: ScriptParameter) => {
    const value = parameters[param.key];

    switch (param.type) {
      case 'text':
        return (
          <input
            type="text"
            value={value || ''}
            onChange={(e) => handleParameterChange(param.key, (e.target as HTMLInputElement).value)}
            placeholder={param.placeholder}
            disabled={isRunning}
            class="script-input"
          />
        );

      case 'number':
        return (
          <input
            type="number"
            value={value || ''}
            onChange={(e) => handleParameterChange(param.key, Number((e.target as HTMLInputElement).value))}
            placeholder={param.placeholder}
            disabled={isRunning}
            class="script-input"
          />
        );

      case 'boolean':
        return (
          <label class="script-checkbox">
            <input
              type="checkbox"
              checked={value || false}
              onChange={(e) => handleParameterChange(param.key, (e.target as HTMLInputElement).checked)}
              disabled={isRunning}
            />
            <span class="checkmark"></span>
          </label>
        );

      case 'select':
        return (
          <select
            value={value || ''}
            onChange={(e) => handleParameterChange(param.key, (e.target as HTMLSelectElement).value)}
            disabled={isRunning}
            class="script-select"
          >
            <option value="">请选择...</option>
            {param.options?.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );

      case 'textarea':
        return (
          <textarea
            value={value || ''}
            onChange={(e) => handleParameterChange(param.key, (e.target as HTMLTextAreaElement).value)}
            placeholder={param.placeholder}
            disabled={isRunning}
            class="script-textarea"
            rows={4}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div class={`script-card ${script.category} ${isRunning ? 'running' : ''}`}>
      <div class="script-header" onClick={() => setIsExpanded(!isExpanded)}>
        <div class="script-info">
          <h3 class="script-name">{script.name}</h3>
          <p class="script-description">{script.description}</p>
          <span class={`script-category ${script.category}`}>
            {script.category === 'tool' ? '工具' : '操作'}
          </span>
        </div>
        <div class="script-controls">
          {isRunning && (
            <div class="progress-container">
              <div class="progress-bar">
                <div 
                  class="progress-fill" 
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <span class="progress-text">{Math.round(progress)}%</span>
            </div>
          )}
          <button 
            class={`expand-button ${isExpanded ? 'expanded' : ''}`}
            type="button"
          >
            <svg width="16" height="16" viewBox="0 0 16 16">
              <path d="M4 6l4 4 4-4" stroke="currentColor" stroke-width="2" fill="none"/>
            </svg>
          </button>
        </div>
      </div>

      {isExpanded && (
        <div class="script-body">
          {script.parameters.length > 0 && (
            <div class="script-parameters">
              <h4>参数配置</h4>
              {script.parameters.map(param => (
                <div key={param.key} class="parameter-group">
                  <label class="parameter-label">
                    {param.label}
                    {param.required && <span class="required">*</span>}
                  </label>
                  {renderParameterInput(param)}
                  {param.description && (
                    <p class="parameter-description">{param.description}</p>
                  )}
                </div>
              ))}
            </div>
          )}

          <div class="script-actions">
            {isRunning ? (
              <button 
                class="stop-button"
                onClick={handleStop}
                type="button"
              >
                <svg width="16" height="16" viewBox="0 0 16 16">
                  <rect x="4" y="4" width="8" height="8" fill="currentColor"/>
                </svg>
                停止执行
              </button>
            ) : (
              <button 
                class="execute-button"
                onClick={handleExecute}
                type="button"
              >
                <svg width="16" height="16" viewBox="0 0 16 16">
                  <path d="M5 3l8 5-8 5V3z" fill="currentColor"/>
                </svg>
                开始执行
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
