import { LayoutCommonProps, LayoutWrapperProps } from "@/types/props";
import clsx from "clsx";
import { FormEvent } from "react";

export interface FormLayoutProps extends LayoutCommonProps, Pick<LayoutWrapperProps, "children"> {
  flex?: boolean;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

// 크기 고정 레이아웃
export default function FormLayout({ id, className, children, flex = true, onSubmit }: FormLayoutProps) {
  return (
    <form id={id} className={clsx(flex && "flex flex-col", className)} onSubmit={onSubmit}>
      {children}
    </form>
  );
}
