import { LayoutCommonProps } from "@/types/props/LayoutCommonProps";
import { LayoutWrapperProps } from "@/types/props";
import clsx from "clsx";

export interface FormButtonProps extends LayoutCommonProps, Pick<LayoutWrapperProps, "children"> {
  variant?: "primary" | "secondary";
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

// TODO: 반응형 레이아웃 적용
const baseStyle = "";

// TODO: 색상 추가
const colorStyles = {
  primary: "bg-black text-white hover:bg-gray-800",
  secondary: "bg-white text-black hover:bg-gray-100",
};

export default function FormButton({
  id,
  className,
  children,
  variant = "primary",
  onClick = () => {},
}: FormButtonProps) {
  return (
    <button id={id} className={clsx(baseStyle, colorStyles[variant], className)} onClick={onClick}>
      {children}
    </button>
  );
}
