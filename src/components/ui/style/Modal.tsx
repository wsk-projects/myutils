import React from "react";
import { ModalLayout } from "@/components/common/modal/Modal";
import WarningSvg from "@/components/img/svg/Warning";
import InfoSvg from "@/components/img/svg/Info";

interface ModalProps {
  type: "error" | "info";
  message: string;
  onClose?: () => void;
  duration?: number;
}

const modalStyles = {
  error: {
    icon: <WarningSvg />,
    title: "오류",
    className: "border-l-4 border-red-500 bg-red-50 text-red-700",
  },
  info: {
    icon: <InfoSvg />,
    title: "알림",
    className: "border-l-4 border-blue-500 bg-blue-50",
  },
};

function ModalBuilder({ type, message, onClose = () => {}, duration }: ModalProps): React.ReactNode {
  const { icon, title, className } = modalStyles[type];
  return (
    <ModalLayout
      icon={icon}
      title={title}
      className={className}
      message={message}
      duration={duration}
      onClose={onClose}
    />
  );
}

const Modal = {
  Error: (props: Omit<ModalProps, "type">) => <ModalBuilder {...props} type="error" duration={3000} />,
  Info: (props: Omit<ModalProps, "type">) => <ModalBuilder {...props} type="info" duration={3000} />,
};

export default Modal;
