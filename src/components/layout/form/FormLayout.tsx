import { CommonProps, WrapperProps } from "@/types/props";
import clsx from "clsx";
import { FormEvent } from "react";

export interface FormLayoutProps extends CommonProps, Pick<WrapperProps, "children"> {
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

export default function FormLayout({ id, className, children, onSubmit }: FormLayoutProps) {
  return (
    <form id={id} className={clsx(className)} onSubmit={onSubmit}>
      {children}
    </form>
  );
}
