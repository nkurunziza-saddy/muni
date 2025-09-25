import type { DetailedHTMLProps, HTMLAttributes } from "react";

export function Figure(
  props: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>
) {
  return <figure {...props} />;
}
