import type { Root } from "mdast";
import { visit } from "unist-util-visit";
import type { ContainerDirective } from "mdast-util-directive";

export function remarkDetails() {
  return (tree: Root) => {
    visit(tree, "containerDirective", (node: ContainerDirective) => {
      if (node.name !== "details") return;
      const data = (node.data ??= {}) as Record<string, any>;
      const summaryChild = node.children[0] as any | undefined;
      if (
        summaryChild &&
        summaryChild.type === "paragraph" &&
        summaryChild.data?.directiveLabel
      ) {
        summaryChild.data.hName = "summary";
      } else {
        node.children.unshift({
          type: "paragraph",
          children: [{ type: "text", value: "Details" }],
          data: { hName: "summary" },
        } as any);
      }
      data.hName = "details";
    });
  };
}
