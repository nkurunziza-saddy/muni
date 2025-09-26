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
        "border-l-2 bg-muted/50 backdrop-blur-3xl border-primary/70 px-4 py-1 italic text-muted-foreground",
        props.className
      )}
    >
      {props.children}
    </blockquote>
  );
}
