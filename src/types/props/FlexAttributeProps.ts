export interface FlexAttributeProps {
  justify?: "start" | "end" | "center" | "between" | "around";
  align?: "start" | "end" | "center" | "baseline" | "stretch";
  wrap?: boolean;
}

export const JUSTIFY_CONTENT = {
  start: "justify-start",
  end: "justify-end",
  center: "justify-center",
  between: "justify-between",
  around: "justify-around",
};

export const ALIGN_ITEMS = {
  start: "items-start",
  end: "items-end",
  center: "items-center",
  baseline: "items-baseline",
  stretch: "items-stretch",
};
