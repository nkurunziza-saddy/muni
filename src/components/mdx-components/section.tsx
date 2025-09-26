import type { DetailedHTMLProps, HTMLAttributes } from "react";
import { Footnotes } from "./footnotes";

export function Section(
  props: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>
) {
  const classes = "border-t border-border mt-14 pt-6";

  if ("data-footnotes" in props)
    return (
      <Footnotes {...props} className={`${props.className || ""} ${classes}`} />
    );
  return (
    <section {...props} className={`${props.className || ""} ${classes}`} />
  );
}
