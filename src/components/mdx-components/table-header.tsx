import type { DetailedHTMLProps, ThHTMLAttributes } from "react";

export function TableHeader(
  props: DetailedHTMLProps<
    ThHTMLAttributes<HTMLTableCellElement>,
    HTMLTableCellElement
  >
) {
  return (
    <th
      {...props}
      className={`p-3 border border-border bg-muted font-semibold text-left ${props.className || ''}`}
    />
  );
}