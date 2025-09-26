import type { Root } from "mdast";
import { visit } from "unist-util-visit";
import type { LeafDirective } from "mdast-util-directive";

export function remarkSponsors() {
  return (tree: Root) => {
    visit(
      tree,
      "leafDirective",
      (node: LeafDirective, index: number | undefined, parent: any) => {
        if (node.name !== "sponsors") return;
        if (!index && index !== 0) return;
        const target = parent?.children?.[index] as any;
        if (!target || !Array.isArray(target.children)) return;
        target.children.push({
          type: "paragraph",
          data: {
            hName: "div",
            hProperties: { "data-sponsors": true },
          },
        });
      }
    );
  };
}
