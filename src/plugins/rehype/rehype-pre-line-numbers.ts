import { visit } from "unist-util-visit";

export const rehypePreLineNumbers = () => (tree: any) => {
  visit(tree, "element", (node) => {
    if (node.tagName !== "pre") return;

    const codeChild = (node as any).children?.find(
      (child: any) =>
        child.tagName === "code" && !!child.properties?.["data-line-numbers"]
    );
    if (!codeChild) return;

    const existingClasses = [
      ...(node.properties?.className || []),
      ...(typeof node.properties?.class === "string"
        ? node.properties.class.split(" ")
        : []),
    ];

    node.properties.className = [
      ...new Set([...existingClasses, "has-line-numbers"]),
    ];
    delete node.properties.class;
  });
};
