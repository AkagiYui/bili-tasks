import { JSX } from 'preact';

// 基础组件Props类型
export interface BaseComponentProps {
  children?: JSX.Element | JSX.Element[] | string;
  className?: string;
}

// 悬浮按钮组件Props
export interface FloatingButtonProps {
  onClick: () => void;
  disabled?: boolean;
  title?: string;
  'aria-label'?: string;
}

// 模态框组件Props
export interface ModalProps extends BaseComponentProps {
  isOpen: boolean;
  onClose: () => void;
  closeOnBackdropClick?: boolean;
  closeOnEscape?: boolean;
}

// 任务面板组件Props
export interface TaskPanelProps extends BaseComponentProps {
  // 未来可能添加的props
  initialCount?: number;
  onCountChange?: (count: number) => void;
}

// 动画状态类型
export type AnimationState = 'idle' | 'opening' | 'closing';

// 模态框状态类型
export interface ModalState {
  isOpen: boolean;
  isClosing: boolean;
  animationState: AnimationState;
}

// 计数器状态类型
export interface CounterState {
  count: number;
  isLoading?: boolean;
  error?: string | null;
}

// 事件处理器类型
export type ClickHandler = (event: MouseEvent) => void;
export type KeyboardHandler = (event: KeyboardEvent) => void;

// 油猴脚本相关类型
export interface UserScriptInfo {
  name: string;
  version: string;
  namespace: string;
  match: string[];
}

// 应用配置类型
export interface AppConfig {
  theme: 'light' | 'dark' | 'auto';
  position: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
  autoStart: boolean;
  enableAnimations: boolean;
}

// 导出所有类型
export type {
  JSX
} from 'preact';
