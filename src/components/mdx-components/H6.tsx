import type { DetailedHTMLProps, HTMLAttributes } from "react";
import { Heading } from "./heading";
import { cn } from "@/lib/utils";

export function H6(
  props: DetailedHTMLProps<
    HTMLAttributes<HTMLHeadingElement>,
    HTMLHeadingElement
  >
) {
  return (
    <Heading
      {...props}
      className={cn(
        "scroll-m-20 text-base font-medium tracking-tight",
        props.className
      )}
      level={6}
    />
  );
}
