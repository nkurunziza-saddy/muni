import type { DetailedHTMLProps, HTMLAttributes } from "react";

export function List({
  ordered = false,
  ...props
}: DetailedHTMLProps<
  HTMLAttributes<HTMLOListElement | HTMLUListElement>,
  HTMLOListElement | HTMLUListElement
> & { ordered?: boolean }) {
  const Element = ordered ? "ol" : "ul";
  const listStyle = ordered ? "list-decimal" : "list-disc";
  return (
    <Element
      {...props}
      className={`${listStyle} pl-6 mb-4 space-y-2 ${props.className || ""}`}
    />
  );
}
