import type { ReactNode } from "react";

export type StepsProps = {
  children: ReactNode;
  className?: string;
};

export function Steps({ children, className }: StepsProps) {
  const classes = "border-l border-border pl-6 ml-3 mt-6 md:ml-1";
  return <div className={`${classes} ${className || ""}`}>{children}</div>;
}
