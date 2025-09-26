import type { DetailedHTMLProps, HTMLAttributes } from "react";
import { Heading } from "./heading";
import { cn } from "@/lib/utils";

export function H1(
  props: DetailedHTMLProps<
    HTMLAttributes<HTMLHeadingElement>,
    HTMLHeadingElement
  >
) {
  return (
    <Heading
      {...props}
      className={cn(
        "scroll-m-20 text-4xl font-extrabold tracking-tight text-balance ",
        props.className
      )}
      level={1}
    />
  );
}
