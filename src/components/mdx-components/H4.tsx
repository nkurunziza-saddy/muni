import type { DetailedHTMLProps, HTMLAttributes } from "react";
import { Heading } from "./heading";

export function H4(
  props: DetailedHTMLProps<
    HTMLAttributes<HTMLHeadingElement>,
    HTMLHeadingElement
  >
) {
  // NOTE: The original complex selectors have been simplified.
  const classes = "text-lg mt-4 pt-3 mb-6";
  return (
    <Heading
      {...props}
      className={`${classes} ${props.className || ""}`}
      level={4}
    />
  );
}
