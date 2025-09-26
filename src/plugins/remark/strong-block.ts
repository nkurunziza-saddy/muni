import type { Root } from "mdast";
import { visit } from "unist-util-visit";

export function remarkStrongBlock() {
  return (tree: Root) => {
    visit(tree, "strong", (node: any, _, parent: any) => {
      if (!parent) return;
      if (parent.type !== "paragraph") return;
      if (parent.children.length > 1) return;
      parent.type = "strong";
      parent.children = node.children;
    });
  };
}
