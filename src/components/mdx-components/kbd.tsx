import type { DetailedHTMLProps, HTMLAttributes } from "react";

export function Kbd(
  props: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>
) {
  return (
    <kbd
      {...props}
      className={`px-2 py-1 text-xs font-sans bg-muted border border-b-2 rounded-md ${props.className || ''}`}
    />
  );
}