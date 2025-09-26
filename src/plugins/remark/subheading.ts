import type { Root } from "mdast";
import { visit } from "unist-util-visit";

export function remarkSubheading() {
  return (tree: Root) => {
    visit(
      tree,
      "heading",
      (node: any, index: number | undefined, parent: any) => {
        if (!index && index !== 0) return;
        if (node.depth !== 1) return;
        if (!node.children?.length) return;
        const subheadingRegex = / \[(.*)\]$/;
        const subheadingChild = node.children.find(
          (child: any) =>
            typeof child.value === "string" &&
            child.value.match(subheadingRegex)
        ) as any | undefined;
        const match = subheadingChild?.value?.match(subheadingRegex);
        const subheading = match?.[1];
        if (subheadingChild && match)
          subheadingChild.value = subheadingChild.value.replace(match[0], "");
        parent?.children.splice(index, 1);
        const header = {
          type: "paragraph",
          data: { hName: "header" },
          children: [
            node,
            subheading
              ? {
                  type: "paragraph",
                  children: [{ type: "text", value: subheading }],
                  data: { hName: "div", hProperties: { role: "doc-subtitle" } },
                }
              : undefined,
          ].filter(Boolean),
        } as any;
        parent?.children.splice(index, 0, header);
      }
    );
  };
}
