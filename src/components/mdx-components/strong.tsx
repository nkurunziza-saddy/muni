import type { DetailedHTMLProps, HTMLAttributes } from "react";

export function Strong(
  props: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>
) {
  return <strong {...props} className={`font-semibold ${props.className || ''}`} />;
}