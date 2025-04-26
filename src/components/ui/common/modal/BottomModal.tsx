"use client";

import ModalLayout from "@/components/layout/modal/ModalLayout";
import { CommonProps, WrapperProps } from "@/types/props";
import clsx from "clsx";
import { X } from "lucide-react";
import React, { useEffect, useState } from "react";
import styles from "./BottomModal.module.css";

export interface BottomModalProps extends CommonProps, WrapperProps {
  position?: "top" | "bottom";
  icon?: React.ReactNode;
  duration?: number;
  onClose?: () => void;
}

const baseStyle = "p-4 rounded w-3/4 max-w-2xl";

const positionStyles = {
  top: "fixed top-4 left-0 right-0 z-50",
  bottom: "fixed bottom-4 left-0 right-0 z-50",
};

export default function Modal({
  as: Tag = "div",
  id,
  className,
  children,
  position = "bottom",
  icon,
  duration = 5000,
  onClose = () => {},
}: BottomModalProps): React.ReactNode {
  const [isHiding, setIsHiding] = useState(false);

  useEffect(() => {
    setIsHiding(false);

    const timer = setTimeout(() => {
      setIsHiding(true);
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, []);

  return (
    <ModalLayout
      id={id}
      className={clsx(
        baseStyle,
        positionStyles[position],
        "mx-auto px-4 shadow-lg",
        className,
        isHiding && styles.hiding,
        styles.modalContainer
      )}
    >
      <div className="flex items-center">
        {icon && <div className="py-1">{icon}</div>}
        <div className="flex-1">{children}</div>
        <div>
          <button
            onClick={() => {
              setIsHiding(true);
              onClose();
            }}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={28} strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </ModalLayout>
  );
}
