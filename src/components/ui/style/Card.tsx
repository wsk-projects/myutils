import { CardLayout, CardLayoutProps } from "@/components/layout/CardLayout";

export interface CardProps extends CardLayoutProps {
  title?: string;
  description?: string;
  children?: React.ReactNode;
}

export default function Card({ title, description, children, ...props }: CardProps) {
  return (
    <CardLayout title={title} description={description} {...props}>
      {children}
    </CardLayout>
  );
}
