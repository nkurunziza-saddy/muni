import type { Plugin } from "unified";
import { visitParents } from "unist-util-visit-parents";
import type { Root, Element } from "hast";

const blockElements = new Set([
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
  "code",
  "pre",
]);

export const rehypeBlockClass: Plugin<[], Root> = () => {
  return (tree) => {
    visitParents(
      tree,
      "element",
      (node: Element, ancestors: (Root | Element)[]) => {
        if (!blockElements.has(node.tagName)) {
          return;
        }

        const props = node.properties || {};

        const classesToAdd = [
          "mdx-block",
          `mdx-depth-${ancestors.length}`,
          "my-3",
        ];

        const existingClasses = [];
        if (props.className && Array.isArray(props.className)) {
          existingClasses.push(...props.className);
        }
        if (props.class && typeof props.class === "string") {
          existingClasses.push(...props.class.split(" "));
        }

        const finalClasses = [
          ...new Set([...existingClasses, ...classesToAdd].filter(Boolean)),
        ];

        // todo: fix classes not found for these tags
        // if (
        //   node.tagName === "pre" ||
        //   node.tagName === "code" ||
        //   node.tagName === "div"
        // ) {
        //   console.log("Found code element:", {
        //     tagName: node.tagName,
        //     properties: node.properties,
        //     className: node.properties?.className,
        //     class: node.properties?.class,
        //   });
        //   return;
        // }

        props.className = finalClasses;
        delete props.class;
        node.properties = props;
      }
    );
  };
};
