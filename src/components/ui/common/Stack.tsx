import FlexLayout, { FlexLayoutProps } from "../../layout/flex/FlexLayout";

const baseStyle = "flex gap-2";

const Stack = {
  H: (props: Omit<FlexLayoutProps, "direction">) => (
    <FlexLayout {...props} direction="horizontal" className={baseStyle} />
  ),
  V: (props: Omit<FlexLayoutProps, "direction">) => (
    <FlexLayout {...props} direction="vertical" className={baseStyle} />
  ),
};

export default Stack;
