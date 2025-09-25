import type { Root } from 'mdast';
import { visit } from 'unist-util-visit';

const filenameRegex = /filename="(.*)"/;

export function remarkFilename() {
  return (tree: Root) => {
    visit(tree, (node) => {
      if (node.type === 'code' && node.meta?.includes('filename')) {
        const filenameMatch = node.meta?.match(filenameRegex);
        if (filenameMatch) {
          const [, fileName] = filenameMatch;
          node.data = {
            ...node.data,
            hProperties: {
              ...(node.data?.hProperties || {}),
              'data-filename': fileName,
            },
          };
        }
      }
    });
  };
}
