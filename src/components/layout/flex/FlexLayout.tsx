import { CommonProps, WrapperProps, FlexAttributeProps, JUSTIFY_CONTENT, ALIGN_ITEMS } from "@/types/props";
import clsx from "clsx";

export interface FlexLayoutProps extends CommonProps, WrapperProps, FlexAttributeProps {
  horizontal?: boolean;
  wrap?: boolean;
}

export default function FlexLayout({
  as: Tag = "div",
  id,
  className,
  children,
  horizontal = false,
  wrap = false,
  justify = "center",
  align = "center",
}: FlexLayoutProps) {
  return (
    <Tag
      id={id}
      className={clsx(
        "flex",
        !horizontal && "flex-col",
        wrap && "flex-wrap",
        JUSTIFY_CONTENT[justify],
        ALIGN_ITEMS[align],
        className
      )}
    >
      {children}
    </Tag>
  );
}
