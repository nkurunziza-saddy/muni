import { cn } from "@/lib/utils";
import type { DetailedHTMLProps, HTMLAttributes } from "react";

export function HorizontalRule(
  props: DetailedHTMLProps<HTMLAttributes<HTMLHRElement>, HTMLHRElement>
) {
  return (
    <hr {...props} className={cn(`border-t border-border`, props.className)} />
  );
}
