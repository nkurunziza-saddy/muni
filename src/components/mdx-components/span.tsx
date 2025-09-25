import type { DetailedHTMLProps, HTMLAttributes } from "react";

export function Span(
  props: DetailedHTMLProps<HTMLAttributes<HTMLSpanElement>, HTMLSpanElement>
) {
  return <span {...props} />;
}