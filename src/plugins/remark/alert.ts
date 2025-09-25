import type { Root } from "mdast";
import { visit } from "unist-util-visit";

const alertTypes = new Set([
  "alert",
  "info",
  "warning",
  "danger",
  "tip",
  "success",
  "note",
]);

export function remarkAlert() {
  return (tree: Root) => {
    visit(tree, (node) => {
      if (node.type !== "containerDirective") return;
      if (!alertTypes.has(node.name)) return;

      const data = node.data || (node.data = {});
      const type = node.name === "alert" ? "note" : node.name; // Default 'alert' to 'note'

      // Extract the title from the directive label, e.g., :::info[My Title]
      const titleNode = node.children.find(
        (child) => child.data?.directiveLabel
      );
      const title = titleNode
        ? ((titleNode.children[0] as any).value as string)
        : undefined;

      // Filter out the label node from the children
      if (title) {
        node.children = node.children.filter(
          (child: any) => !child.data?.directiveLabel
        );
      }

      // Convert the mdast node to a hast node that represents the Callout component
      data.hName = "Callout"; // This should be the name of the component
      data.hProperties = {
        type: type,
        title: title,
      };
    });
  };
}
