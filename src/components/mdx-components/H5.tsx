import type { DetailedHTMLProps, HTMLAttributes } from "react";
import { Heading } from "./heading";

export function H5(
  props: DetailedHTMLProps<
    HTMLAttributes<HTMLHeadingElement>,
    HTMLHeadingElement
  >
) {
  return (
    <Heading
      {...props}
      className={`text-base font-semibold mt-4 mb-2 ${props.className || ""}`}
      level={5}
    />
  );
}
