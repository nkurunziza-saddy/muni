import type { ReactNode } from "react";

export function Subtitle({ children }: { children: ReactNode }) {
  const classes = "text-muted-foreground text-xl font-light leading-[1.5em] mt-1";
  return <div className={classes}>{children}</div>;
}