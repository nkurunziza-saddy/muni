import { cn } from "@/lib/utils";
import type { DetailedHTMLProps, HTMLAttributes } from "react";

export function Table(
  props: DetailedHTMLProps<HTMLAttributes<HTMLTableElement>, HTMLTableElement>
) {
  return (
    <div className="my-2 w-full overflow-y-auto">
      <table {...props} className={cn("w-full", props.className)} />
    </div>
  );
}
