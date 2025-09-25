import type { DetailedHTMLProps, HTMLAttributes } from "react";

export function Figcaption(
  props: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>
) {
  return <figcaption {...props} />;
}
