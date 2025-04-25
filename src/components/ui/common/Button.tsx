import clsx from "clsx";

interface ButtonProps {
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  variant: "primary" | "secondary" | "select";
  selected?: boolean;
}

function ButtonBuilder({ className, children, onClick, variant, selected }: ButtonProps) {
  const baseStyle = "px-2 py-1 rounded-md text-sm";

  const variantStyle = {
    primary: "bg-black text-white hover:bg-gray-800",
    secondary: "bg-white text-black hover:bg-gray-100",
    select: selected ? "bg-black text-white" : "bg-white text-gray-800",
  };

  return (
    <button className={clsx(baseStyle, variantStyle[variant], className)} onClick={onClick}>
      {children}
    </button>
  );
}

const Button = {
  Primary: (props: Omit<ButtonProps, "variant" | "selected">) => <ButtonBuilder {...props} variant="primary" />,
  Secondary: (props: Omit<ButtonProps, "variant" | "selected">) => <ButtonBuilder {...props} variant="secondary" />,
  Select: (props: Omit<ButtonProps, "variant">) => <ButtonBuilder {...props} variant="select" />,
};

export default Button;
