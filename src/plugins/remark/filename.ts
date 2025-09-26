import type { Root, Code } from "mdast";
import { visit } from "unist-util-visit";

const filenameRegex = /filename="(.*)"/;

export function remarkFilename() {
  return (tree: Root) => {
    visit(tree, "code", (node: Code) => {
      if (!node.meta?.includes("filename")) return;
      const filenameMatch = node.meta.match(filenameRegex);
      if (!filenameMatch) return;
      const [, fileName] = filenameMatch;
      node.data = {
        ...(node.data ?? {}),
        hProperties: {
          ...((node.data as any)?.hProperties ?? {}),
          "data-filename": fileName,
        },
      } as any;
    });
  };
}
