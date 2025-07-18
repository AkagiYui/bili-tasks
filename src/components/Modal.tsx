import { JSX } from 'preact';
import { useState } from 'preact/hooks';
import { ModalProps } from '../types';
import './Modal.css';

export function Modal({ isOpen, onClose, children }: ModalProps): JSX.Element | null {
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    // 等待动画完成后再调用onClose
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 300);
  };

  const handleBackdropClick = (e: MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  if (!isOpen && !isClosing) {
    return null;
  }

  return (
    <div
      class={`modal-backdrop ${isClosing ? 'modal-backdrop--closing' : ''}`}
      onClick={handleBackdropClick}
    >
      <div class={`modal-content ${isClosing ? 'modal-content--closing' : ''}`}>
        <div class="modal-header">
          <button
            class="modal-close-button"
            onClick={handleClose}
            title="关闭面板"
            aria-label="关闭面板"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19 14L12 21L5 14"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </button>
        </div>
        <div class="modal-body">
          {children}
        </div>
      </div>
    </div>
  );
}
