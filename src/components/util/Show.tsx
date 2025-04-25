interface ShowProps {
  when: boolean;
  children: React.ReactNode;
}

export default function Show({ when, children }: ShowProps) {
  return when ? children : null;
}
