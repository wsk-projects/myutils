import clsx from "clsx";
import FlexLayout, { FlexLayoutProps } from "../../layout/flex/FlexLayout";

interface StackProps extends Omit<FlexLayoutProps, "direction"> {
  wrap?: boolean;
}

const baseStyle = "gap-2";

const Stack = {
  H: ({ justify = "start", align = "center", ...props }: StackProps) => (
    <FlexLayout {...props} className={clsx(baseStyle, props.className)} justify={justify} align={align} horizontal />
  ),
  V: ({ justify = "start", align = "start", ...props }: StackProps) => (
    <FlexLayout {...props} className={clsx(baseStyle, props.className)} justify={justify} align={align} />
  ),
};

export default Stack;
