import type { DetailedHTMLProps, HTMLAttributes } from "react";
import { Callout, type CalloutProps } from "./alert-callout";
import { cn } from "@/lib/utils";

export function Aside(
  props: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>
) {
  if ("data-alert" in props) return;

  <Callout
    className={cn(props.className)}
    type={props["data-alert"] as CalloutProps["type"]}
  >
    {props.children}
  </Callout>;

  return <aside {...props} />;
}
