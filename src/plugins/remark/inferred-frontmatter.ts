import type { Root, Yaml } from "mdast";
import { visit } from "unist-util-visit";

export function remarkInferFrontmatter() {
  return (tree: Root) => {
    visit(tree, (node, _, parent: any) => {
      if (parent?.type !== "root") return;
      if (node.type !== "heading" || node.depth !== 1) return;
      if (!node.children?.length) return;
      const child = node.children[0] as any;
      if (!("value" in child)) return;
      const value = (child.value as string).trim();
      let title: string | undefined;
      let description: string | undefined;
      if (value.includes("[")) {
        const m = value.match(/(.*) \[(.*)\]/);
        if (m) {
          title = m[1].trim();
          description = m[2].trim();
        }
      } else {
        title = value;
      }
      const frontmatterIndex = parent.children.findIndex(
        (c: any) => c.type === "yaml"
      );
      if (frontmatterIndex === -1) {
        const fm: Yaml = { type: "yaml", value: "" } as any;
        if (title && !fm.value.includes("title"))
          fm.value += `title: ${title}\n`;
        if (description && !fm.value.includes("description"))
          fm.value += `description: ${description}\n`;
        tree.children.unshift(fm);
      } else {
        const fm = parent.children[frontmatterIndex] as Yaml;
        fm.value = fm.value ?? "";
        if (title && !fm.value.includes("title"))
          fm.value += `\ntitle: ${title}\n`;
        if (description && !fm.value.includes("description"))
          fm.value += `description: ${description}\n`;
      }
    });
  };
}
