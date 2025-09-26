import type { Plugin } from "unified";
import { visit } from "unist-util-visit";
import type { Root, Element } from "hast";

export const rehypeBlockClass: Plugin<[], Root> = () => {
  return (tree) => {
    function assignClasses(node: Element, depth: number) {
      if (
        [
          "p",
          "blockquote",
          "table",
          "h1",
          "h2",
          "h3",
          "h4",
          "h5",
          "h6",
          "figure",
          "div",
        ].includes(node.tagName)
      ) {
        const props = node.properties || {};

        const existingClasses = [
          ...(Array.isArray(props.className) ? props.className : []),
          ...(typeof props.class === "string" ? props.class.split(" ") : []),
        ];

        const depthClass = `mdx-depth-${depth}`;
        const blockClass = "mdx-block";
        const spacingClass = "my-3";

        props.className = [
          ...new Set([
            ...existingClasses,
            blockClass,
            depthClass,
            spacingClass,
          ]),
        ];
        delete props.class;
        node.properties = props;
      }

      if (Array.isArray(node.children)) {
        for (const child of node.children) {
          if ((child as Element).type === "element") {
            assignClasses(child as Element, depth + 1);
          }
        }
      }
    }

    visit(tree, "element", (node: Element) => {
      assignClasses(node, 0);
    });
  };
};
