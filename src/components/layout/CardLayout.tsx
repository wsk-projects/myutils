import { LayoutCommonProps, LayoutWrapperProps } from "@/types/props";
import clsx from "clsx";

export interface CardLayoutProps extends LayoutCommonProps, LayoutWrapperProps {
  title?: string;
  description?: string;
  size?: "sm" | "md" | "lg";
}

// TODO: 사이즈 별 반응형 레이아웃 적용
const baseLayoutSize = {
  sm: "min-w-[160px] rounded-md p-[8px] space-y-[4px]",
  md: "min-w-[224px] rounded-lg p-[12px] space-y-[8px]",
  lg: "min-w-[288px] rounded-xl p-[16px] space-y-[12px]",
};

// 제목 텍스트 크기
const titleFontSize = {
  sm: "text-[14px] font-semibold",
  md: "text-[16px] font-semibold",
  lg: "text-[18px] font-semibold",
};

// 설명 텍스트 크기
const descriptionFontSize = {
  sm: "text-[12px]",
  md: "text-[14px]",
  lg: "text-[16px]",
};

export const CardLayout = ({
  as: Tag = "div",
  id,
  className,
  children,
  title = "Lorem Ipsum",
  description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.\nSed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
  size = "md",
}: CardLayoutProps) => {
  return (
    <Tag id={id} className={clsx("bg-white shadow-lg", baseLayoutSize[size], className)}>
      <h1 className={clsx("text-gray-800", titleFontSize[size])}>{title}</h1>
      <p className={clsx("bg-gray-100 text-gray-700 p-[8px] rounded", descriptionFontSize[size])}>{description}</p>
      {children}
    </Tag>
  );
};
