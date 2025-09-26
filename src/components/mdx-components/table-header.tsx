import { cn } from "@/lib/utils";
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
      className={cn(
        "border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right",
        props.className
      )}
    />
  );
}
