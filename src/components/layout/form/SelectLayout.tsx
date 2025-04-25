import { WrapperLayoutProps } from "@/types/props";
import { CommonLayoutProps } from "@/types/props/CommonLayoutProps";
import clsx from "clsx";

export interface SelectLayoutProps extends CommonLayoutProps, Pick<WrapperLayoutProps, "children"> {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

// TODO: 반응형 레이아웃 적용
const baseStyle = "";

export default function SelectLayout({ id, className, children, value, onChange }: SelectLayoutProps) {
  return (
    <select id={id} className={clsx("border", baseStyle, className)} value={value} onChange={onChange}>
      {children}
    </select>
  );
}
