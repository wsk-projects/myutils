import ButtonLayout, { ButtonLayoutProps } from "@/components/layout/button/ButtonLayout";
import clsx from "clsx";

interface ButtonProps extends ButtonLayoutProps {
  variant: "primary" | "secondary" | "select";
  selected?: boolean;
}

function ButtonBuilder({ id, className, children, onClick, variant, selected }: ButtonProps) {
  const variantStyle = {
    primary: "bg-black text-white hover:bg-gray-800",
    secondary: "bg-white text-black hover:bg-gray-100",
    select: selected ? "bg-black text-white" : "bg-white text-gray-800",
  };

  return (
    <ButtonLayout
      id={id}
      className={clsx("px-2 py-1 rounded-md text-sm border", variantStyle[variant], className)}
      onClick={onClick}
    >
      {children}
    </ButtonLayout>
  );
}

const Button = {
  Primary: (props: Omit<ButtonProps, "variant" | "selected">) => <ButtonBuilder {...props} variant="primary" />,
  Secondary: (props: Omit<ButtonProps, "variant" | "selected">) => <ButtonBuilder {...props} variant="secondary" />,
  Select: (props: Omit<ButtonProps, "variant">) => <ButtonBuilder {...props} variant="select" />,
};

export default Button;
