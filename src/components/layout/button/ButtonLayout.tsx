import { CommonLayoutProps } from "@/types/props/CommonLayoutProps";
import { WrapperLayoutProps } from "@/types/props";
import clsx from "clsx";

export interface FormButtonProps extends CommonLayoutProps, Pick<WrapperLayoutProps, "children"> {
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

// TODO: 반응형 레이아웃 적용
const baseStyle = "";

export default function FormButton({ id, className, children, onClick = () => {} }: FormButtonProps) {
  return (
    <button id={id} className={clsx(baseStyle, className)} onClick={onClick}>
      {children}
    </button>
  );
}
