import type { DetailedHTMLProps, HTMLAttributes } from "react";

export function ListItem(
  props: DetailedHTMLProps<HTMLAttributes<HTMLLIElement>, HTMLLIElement>
) {
  return <li {...props} className={`leading-relaxed ${props.className || ''}`} />;
}