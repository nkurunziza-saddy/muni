import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export type StepsProps = {
  children: ReactNode;
  className?: string;
};

export function Steps({ children, className }: StepsProps) {
  return (
    <div
      className={cn("border-l border-border pl-6 ml-3 mt-6 md:ml-1", className)}
    >
      {children}
    </div>
  );
}
