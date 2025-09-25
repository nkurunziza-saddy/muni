import { h } from 'hastscript';
import type { Root } from 'mdast';
import { visit } from 'unist-util-visit';

export function remarkCodeGroup() {
  return (tree: Root) => {
    visit(tree, (node) => {
      if (node.type !== 'containerDirective') return;
      if (node.name !== 'code-group') return;

      const data = node.data || (node.data = {});
      const tagName = 'div';

      node.attributes = {
        ...node.attributes,
        class: 'code-group',
      };

      data.hName = tagName;
      data.hProperties = h(tagName, node.attributes || {}).properties;
    });
  };
}
