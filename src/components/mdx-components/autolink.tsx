import type { AnchorHTMLAttributes, DetailedHTMLProps } from "react";
import { Link } from "@tanstack/react-router";

export function Autolink(
  props: Omit<
    DetailedHTMLProps<
      AnchorHTMLAttributes<HTMLAnchorElement>,
      HTMLAnchorElement
    >,
    "ref"
  >
) {
  if (!props.href) return null;

  const classes = "absolute mt-[0.1em] opacity-0 -translate-x-0.5 scale-98 transition-all group-hover:opacity-100 group-hover:translate-x-0 group-hover:scale-100";

  return (
    <Link
      {...props}
      className={`${classes} ${props.className || ''}`}
      to={props.href}
    />
  );
}