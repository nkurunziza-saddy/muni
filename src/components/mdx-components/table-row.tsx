import type { DetailedHTMLProps, HTMLAttributes } from "react";

export function TableRow(
  props: DetailedHTMLProps<
    HTMLAttributes<HTMLTableRowElement>,
    HTMLTableRowElement
  >
) {
  return <tr {...props} className={`border-t border-border even:bg-muted ${props.className || ''}`} />;
}