import { cn } from "@/lib/utils";
import type { BlockquoteHTMLAttributes, DetailedHTMLProps } from "react";

export function Blockquote(
  props: DetailedHTMLProps<
    BlockquoteHTMLAttributes<HTMLQuoteElement>,
    HTMLQuoteElement
  >
) {
  return (
    <blockquote
      {...props}
      className={cn(
        "border-l-2 bg-muted/80 border-primary pl-4 italic py-2 text-muted-foreground",
        props.className
      )}
    >
      {props.children}
    </blockquote>
  );
}
