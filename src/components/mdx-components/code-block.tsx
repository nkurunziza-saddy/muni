import type { DetailedHTMLProps, HTMLAttributes } from "react";

export function CodeBlock(
  props: DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
) {
  return (
    <div
      {...props}
      className={`border border-input ${props.className || ""}`}
    />
  );
}
