import type { DetailedHTMLProps, HTMLAttributes } from "react";
import { Heading } from "./heading";

export function H1(
  props: DetailedHTMLProps<
    HTMLAttributes<HTMLHeadingElement>,
    HTMLHeadingElement
  >
) {
  return (
    <Heading
      {...props}
      className={`text-3xl tracking-tight ${props.className || ""}`}
      level={1}
    />
  );
}
