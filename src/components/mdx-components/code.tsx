import { useIsInCodeBlock } from "@/lib/code-context.js";
import { cn } from "@/lib/utils";
import type { DetailedHTMLProps, HTMLAttributes } from "react";

export function Code(
  props: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>
) {
  const isInCodeBlock = useIsInCodeBlock();
  const children = filterEmptyLines(props.children);
  return (
    <code
      {...props}
      className={cn(
        "font-mono text-sm",
        !isInCodeBlock && "bg-muted px-1.5 py-1 rounded-sm",
        props.className
      )}
    >
      {children}
    </code>
  );
}

function filterEmptyLines(nodes: React.ReactNode) {
  if (!Array.isArray(nodes)) return nodes;
  return nodes
    .map((child, index) =>
      child.props &&
      "data-line" in child.props &&
      typeof child.props.children === "string" &&
      child.props.children.trim() === "" &&
      nodes[index + 1]?.props?.className?.includes("twoslash-tag-line")
        ? null
        : child
    )
    .filter(Boolean);
}
