import type { DetailedHTMLProps, HTMLAttributes } from "react";

export function HorizontalRule(
  props: DetailedHTMLProps<HTMLAttributes<HTMLHRElement>, HTMLHRElement>
) {
  return <hr {...props} className={`border-t border-border my-8 ${props.className || ''}`} />;
}