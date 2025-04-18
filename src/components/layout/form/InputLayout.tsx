import { LayoutCommonProps } from "@/types/props/layoutCommonProps";
import clsx from "clsx";

export interface InputLayoutProps extends LayoutCommonProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}

// TODO: 반응형 레이아웃 적용
const baseStyle = "";

export default function InputLayout({ id, className, value, onChange, placeholder }: InputLayoutProps) {
  return (
    <input
      id={id}
      className={clsx(baseStyle, "border w-full", className)}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
}
