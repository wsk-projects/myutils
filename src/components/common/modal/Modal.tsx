"use client";

import { X } from "lucide-react";
import React, { useEffect, useState } from "react";
import styles from "./Modal.module.css";
import clsx from "clsx";

export interface ModalLayoutProps {
  className: string;
  icon?: React.ReactNode;
  title: string;
  message: string;
  duration?: number;
  onClose?: () => void;
}

export function ModalLayout({
  className,
  icon,
  title,
  message,
  duration = 5000,
  onClose = () => {},
}: ModalLayoutProps): React.ReactNode {
  const [isHiding, setIsHiding] = useState(false);

  useEffect(() => {
    setIsHiding(false);

    const timer = setTimeout(() => {
      setIsHiding(true);
      setTimeout(onClose, 500); // 애니메이션 완료 후 onClose 호출
    }, duration);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed bottom-4 left-0 right-0 z-50 px-4">
      <div
        className={clsx(
          "p-4 rounded mx-auto w-3/4 max-w-2xl shadow-lg",
          isHiding && styles.hiding,
          styles.modalContainer,
          className
        )}
      >
        <div className="flex items-center">
          {icon && <div className="py-1">{icon}</div>}
          <div className="flex-1">
            <p className="font-bold">{title}</p>
            <p className="text-sm">{message}</p>
          </div>
          <div>
            <button
              onClick={() => {
                setIsHiding(true);
                setTimeout(onClose, 500);
              }}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={28} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
