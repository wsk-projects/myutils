import { CommonProps, InputElementProps } from "@/types/props";
import clsx from "clsx";

export interface InputLayoutProps extends CommonProps, InputElementProps {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function InputLayout({ id, className, value, onChange, placeholder }: InputLayoutProps) {
  return <input id={id} className={clsx(className)} value={value} onChange={onChange} placeholder={placeholder} />;
}
