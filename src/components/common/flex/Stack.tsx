interface StackProps {
  children: React.ReactNode;
  direction: "horizontal" | "vertical";
}

function StackBuilder({ children, direction }: StackProps) {
  return <div className={`flex gap-2 ${direction === "horizontal" ? "flex-row" : "flex-col"}`}>{children}</div>;
}

export const Stack = {
  H: (props: Omit<StackProps, "direction">) => <StackBuilder {...props} direction="horizontal" />,
  V: (props: Omit<StackProps, "direction">) => <StackBuilder {...props} direction="vertical" />,
};
