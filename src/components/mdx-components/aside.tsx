import type { DetailedHTMLProps, HTMLAttributes } from "react";
import { Callout, type CalloutProps } from "./callout";
import { cn } from "@/lib/utils";

type AsideProps = DetailedHTMLProps<
  HTMLAttributes<HTMLElement>,
  HTMLElement
> & {
  "data-callout"?: CalloutProps["type"];
};

export function Aside(props: AsideProps) {
  if ("data-callout" in props && props["data-callout"]) {
    return (
      <Callout className={cn("", props.className)} type={props["data-callout"]}>
        {props.children}
      </Callout>
    );
  }

  return <aside className={cn("", props.className)} {...props} />;
}
