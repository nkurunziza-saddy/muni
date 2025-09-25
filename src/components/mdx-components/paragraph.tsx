import type { DetailedHTMLProps, HTMLAttributes } from "react";

export function Paragraph(
  props: DetailedHTMLProps<
    HTMLAttributes<HTMLParagraphElement>,
    HTMLParagraphElement
  >
) {
  return <p {...props} className={`leading-7 mb-4 ${props.className || ''}`} />;
}