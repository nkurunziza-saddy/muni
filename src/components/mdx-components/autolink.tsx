import type { AnchorHTMLAttributes, DetailedHTMLProps } from "react";
import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

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

  return (
    <Link
      {...props}
      className={cn("underline hover:text-primary", props.className)}
      to={props.href}
    />
  );
}
