import { CommonProps, WrapperProps } from "@/types/props";
import clsx from "clsx";

export interface ModalLayoutProps extends CommonProps, WrapperProps {}

export default function ModalLayout({ as: Tag = "div", id, className, children }: ModalLayoutProps): React.ReactNode {
  return (
    <Tag id={id} className={clsx("z-50", className)}>
      {children}
    </Tag>
  );
}
