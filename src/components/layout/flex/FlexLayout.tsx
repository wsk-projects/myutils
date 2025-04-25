import { CommonLayoutProps, WrapperLayoutProps } from "@/types/props";

export interface FlexLayoutProps extends CommonLayoutProps, WrapperLayoutProps {
  direction: "horizontal" | "vertical";
}

export default function FlexLayout({ as: Tag = "div", id, className, children, direction }: FlexLayoutProps) {
  return (
    <Tag id={id} className={`flex ${direction === "horizontal" ? "flex-row" : "flex-col"} ${className}`}>
      {children}
    </Tag>
  );
}
