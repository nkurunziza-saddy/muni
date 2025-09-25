import type { DetailedHTMLProps, TdHTMLAttributes } from "react";

export function TableCell(
  props: DetailedHTMLProps<
    TdHTMLAttributes<HTMLTableCellElement>,
    HTMLTableCellElement
  >
) {
  return <td {...props} className={`p-3 border border-border ${props.className || ''}`} />;
}