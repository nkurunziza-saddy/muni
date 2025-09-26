import { cn } from "@/lib/utils";
import type { DetailedHTMLProps, TdHTMLAttributes } from "react";

export function TableCell(
  props: DetailedHTMLProps<
    TdHTMLAttributes<HTMLTableCellElement>,
    HTMLTableCellElement
  >
) {
  return (
    <td
      {...props}
      className={cn(
        "border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right",
        props.className
      )}
    />
  );
}
