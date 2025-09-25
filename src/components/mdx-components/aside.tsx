import type { DetailedHTMLProps, HTMLAttributes } from "react";

export function Aside(
  props: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>
) {
  if ("data-callout" in props) return <div>cllout</div>;
  return <aside {...props} />;
}
