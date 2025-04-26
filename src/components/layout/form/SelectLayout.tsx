import { CommonProps, WrapperProps } from "@/types/props";
import clsx from "clsx";

export interface SelectLayoutProps extends CommonProps, Pick<WrapperProps, "children"> {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export default function SelectLayout({ id, className, children, value, onChange }: SelectLayoutProps) {
  return (
    <select id={id} className={clsx(className)} value={value} onChange={onChange}>
      {children}
    </select>
  );
}
