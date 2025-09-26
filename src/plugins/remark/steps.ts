import { h } from "hastscript";
import type { Heading, Root } from "mdast";
import { visit } from "unist-util-visit";
import type { ContainerDirective } from "mdast-util-directive";

export function remarkSteps() {
  return (tree: Root) => {
    visit(tree, "containerDirective", (node: ContainerDirective) => {
      if (node.name !== "steps") return;
      const data = (node.data ??= {}) as Record<string, any>;
      node.attributes = { ...(node.attributes ?? {}), "data-steps": "true" };
      data.hName = "div";
      data.hProperties = h("div", node.attributes ?? {}).properties;
      const depth =
        (
          node.children.find((child: any) => child.type === "heading") as
            | Heading
            | undefined
        )?.depth ?? 2;
      let currentChild: any = undefined;
      const children: any[] = [];
      for (const child of node.children) {
        if (child.type === "heading" && child.depth === depth) {
          if (currentChild && currentChild.children.length > 0)
            children.push(currentChild);
          currentChild = {
            type: "paragraph",
            children: [],
            data: {
              hName: "div",
              hProperties: { "data-depth": depth },
            },
          } as any;
        }
        if (!currentChild)
          currentChild = {
            type: "paragraph",
            children: [],
            data: { hName: "div", hProperties: { "data-depth": depth } },
          } as any;
        currentChild.children.push(child);
      }
      if (currentChild) children.push(currentChild);
      node.children = children;
    });
  };
}
