import type { DetailedHTMLProps, HTMLAttributes } from "react";

export function Header(
  props: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>
) {
  // NOTE: Complex layout-dependent styles have been simplified.
  const classes = "border-b border-border mb-7 pb-7";
  return <header {...props} className={`${classes} ${props.className || ''}`} />;
}