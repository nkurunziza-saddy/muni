import type { DetailedHTMLProps, DetailsHTMLAttributes } from "react";

export function Details(
  props: DetailedHTMLProps<
    DetailsHTMLAttributes<HTMLDetailsElement>,
    HTMLDetailsElement
  >
) {
  return <details {...props} />;
}