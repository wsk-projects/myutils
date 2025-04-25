import { Children, isValidElement } from "react";

interface MatchProps {
  when: boolean;
  children: React.ReactNode;
}

export function Match({ when, children }: MatchProps) {
  return when ? children : null;
}

interface SwitchProps {
  when?: boolean;
  children: React.ReactNode;
}

export function Switch({ when = true, children }: SwitchProps) {
  if (!when) return null;

  const childrenArray = Children.toArray(children);
  for (const child of childrenArray) {
    if (!isValidElement(child)) continue;
    if (child.props.when) return child;
  }

  return null;
}
