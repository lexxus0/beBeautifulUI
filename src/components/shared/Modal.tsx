"use client";

import { ReactNode, useEffect } from "react";
import { createPortal } from "react-dom";
import Icon from "./Icon";

type BaseModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  showCloseButton?: boolean;
  maxWidth?: string;
};

export function BaseModal({
  isOpen,
  onClose,
  children,
  showCloseButton = true,
  maxWidth = "max-w-md",
}: BaseModalProps) {
  useEffect(() => {
    if (isOpen) {
        const original = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
          document.body.style.overflow = original;
        };
      }
    }, [isOpen]);
  
    if (!isOpen) return null;

    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      };

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center"
      onClick={handleBackdropClick}
    >
      <div
        className={`relative w-[90%] ${maxWidth} rounded-2xl backdrop-blur-[90px] bg-[linear-gradient(180deg,rgba(175,176,178,0.2)_0%,rgba(235,235,235,0.2)_50%,rgba(175,176,178,0.2)_100%)] 
        px-[34px] pt-[32px] pb-[10px] shadow-xl`}
        onClick={(e) => e.stopPropagation()} // не закривати при кліку всередині
      >
        {showCloseButton && (
          <button
          type="button"
            onClick={onClose}
            className="w-5 h-5 absolute right-6 top-6 border-2 border-[#F2F6FF] rounded-sm flex items-center justify-center text-gray-400 hover:text-gray-700"
            aria-label="Закрити"
          >
            <Icon name='icon-close-modal' className="w-2 h-2 text-[#F2F6FF]"/>
          </button>
        )}
        {children}
      </div>
    </div>,
    document.body
  );
}
