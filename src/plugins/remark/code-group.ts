import { h } from "hastscript";
import type { Root } from "mdast";
import { visit } from "unist-util-visit";
import type { ContainerDirective } from "mdast-util-directive";

export function remarkCodeGroup() {
  return (tree: Root) => {
    visit(tree, "containerDirective", (node: ContainerDirective) => {
      if (node.name !== "code-group") return;

      const data = (node.data ??= {}) as any;
      const tagName = "div";

      node.attributes = { ...(node.attributes ?? {}), class: "code-group" };

      data.hName = tagName;
      data.hProperties = h(tagName, node.attributes).properties;
    });
  };
}
