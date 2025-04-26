import { CommonProps } from "@/types/props/CommonProps";
import { WrapperProps } from "@/types/props/WrapperProps";
import clsx from "clsx";

export interface ButtonLayoutProps extends CommonProps, Pick<WrapperProps, "children"> {
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function ButtonLayout({ id, className, children, onClick = () => {} }: ButtonLayoutProps) {
  return (
    <button id={id} className={clsx(className)} onClick={onClick}>
      {children}
    </button>
  );
}
