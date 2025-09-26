import type { Root } from "mdast";
import { visit } from "unist-util-visit";
import type { ContainerDirective } from "mdast-util-directive";

const alertTypes = new Set([
  "alert",
  "info",
  "warning",
  "danger",
  "tip",
  "success",
  "note",
]);

export function remarkCallout() {
  return (tree: Root) => {
    visit(tree, "containerDirective", (node: ContainerDirective) => {
      if (node.name === undefined) return;
      if (!alertTypes.has(node.name)) return;

      const data = (node.data ??= {}) as Record<string, any>;
      const type = node.name === "alert" ? "note" : node.name;

      const titleNode = node.children.find(
        (child: any) => child.data?.directiveLabel
      ) as any | undefined;
      const title = titleNode
        ? (titleNode.children?.[0]?.value as string | undefined)
        : undefined;

      if (title) {
        node.children = node.children.filter(
          (child: any) => !child.data?.directiveLabel
        );
      }

      data.hName = "Callout";
      data.hProperties = {
        type,
        title,
      };
    });
  };
}
