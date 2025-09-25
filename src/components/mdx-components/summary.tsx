import type { DetailedHTMLProps, HTMLAttributes } from "react";

export function Summary(
  props: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>
) {
  const classes = "text-muted-foreground text-xl font-light leading-[1.5em] mt-1";
  return <summary {...props} className={`${classes} ${props.className || ''}`} />;
}