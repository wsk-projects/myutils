import InfoSvg from "@/components/img/svg/Info";
import WarningSvg from "@/components/img/svg/Warning";
import ModalLayout from "@/components/ui/common/modal/BottomModal";
import React from "react";

interface ModalBuilderProps {
  type: "error" | "info";
  title: string;
  message: string;
  duration?: number;
  onClose?: () => void;
}

const modalStyles = {
  error: {
    icon: <WarningSvg />,
    className: "border-l-4 border-red-500 bg-red-50 text-red-700",
  },
  info: {
    icon: <InfoSvg />,
    className: "border-l-4 border-blue-500 bg-blue-50",
  },
};

function ModalBuilder({
  type,
  title,
  message,
  duration = 3000,
  onClose = () => {},
}: ModalBuilderProps): React.ReactNode {
  const { icon, className } = modalStyles[type];
  return (
    <ModalLayout icon={icon} className={className} duration={duration} onClose={onClose}>
      <p className="font-bold">{title}</p>
      <p className="text-sm">{message}</p>
    </ModalLayout>
  );
}

const Modal = {
  Error: (props: Omit<ModalBuilderProps, "type" | "title">) => <ModalBuilder {...props} type="error" title="오류" />,
  Info: (props: Omit<ModalBuilderProps, "type" | "title">) => <ModalBuilder {...props} type="info" title="알림" />,
};

export default Modal;
