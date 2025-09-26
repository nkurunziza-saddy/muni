import type { Root } from "mdast";
import { visit } from "unist-util-visit";
import type { LeafDirective } from "mdast-util-directive";

export function remarkAuthors() {
  return (tree: Root) => {
    visit(
      tree,
      "leafDirective",
      (node: LeafDirective, index: number | undefined, parent: any) => {
        if (node.name !== "authors") return;
        if (typeof index !== "number") return;
        const prev = parent?.children?.[index - 1] as any;
        if (!prev || !Array.isArray(prev.children)) return;
        prev.children.push({
          type: "paragraph",
          data: {
            hName: "div",
            hProperties: { "data-authors": true },
          },
        });
      }
    );
  };
}
