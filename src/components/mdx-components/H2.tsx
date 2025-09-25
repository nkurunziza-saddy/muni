import type { DetailedHTMLProps, HTMLAttributes } from "react";
import { Heading } from "./heading";

export function H2(
  props: DetailedHTMLProps<
    HTMLAttributes<HTMLHeadingElement>,
    HTMLHeadingElement
  >
) {
  const classes =
    "text-2xl tracking-tight mb-6 border-t border-border mt-14 pt-6";
  return (
    <Heading
      {...props}
      className={`${classes} ${props.className || ""}`}
      level={2}
    />
  );
}
