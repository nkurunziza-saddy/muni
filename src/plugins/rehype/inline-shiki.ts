import type { RehypeShikiCoreOptions } from "@shikijs/rehype/core";
import type { Root, Element } from "hast";
import { getSingletonHighlighter, type LanguageInput } from "shiki";
import type { Plugin } from "unified";
import { visit } from "unist-util-visit";

const inlineShikiRegex = /(.+)#([\w-]+)$/;

export type RehypeInlineShikiOptions = RehypeShikiCoreOptions & {
  langs?: LanguageInput[];
};

export const rehypeInlineShiki: Plugin<[RehypeInlineShikiOptions], Root> = (
  options = {} as any
) => {
  const highlighterPromise = getSingletonHighlighter();

  return async (tree) => {
    const highlighter = await highlighterPromise;

    const themes = (
      "themes" in options ? Object.values(options.themes) : [options.theme]
    ).filter(Boolean);
    await Promise.all(
      themes.map((theme) => highlighter.loadTheme(theme as any))
    );
    if (options.langs) {
      await Promise.all(
        options.langs.map((lang) => highlighter.loadLanguage(lang as any))
      );
    }

    visit(tree, "element", (node, index, parent) => {
      if (
        node.tagName !== "code" ||
        node.children[0]?.type !== "text" ||
        !parent ||
        index === undefined
      )
        return;

      const match = node.children[0].value.match(inlineShikiRegex);
      if (!match) return;

      const [, code, lang] = match;

      if (!highlighter.getLoadedLanguages().includes(lang as any)) return;

      const hast = highlighter.codeToHast(code, { ...options, lang });

      const codeEl = (hast.children[0] as Element)?.children?.[0] as Element;
      if (!codeEl) return;

      codeEl.properties = { ...node.properties, ...codeEl.properties };
      parent.children.splice(index, 1, codeEl);
    });
  };
};
