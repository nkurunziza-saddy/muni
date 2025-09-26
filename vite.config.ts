import path from "path";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import mdx from "@mdx-js/rollup";

// Remark plugins
import remarkGfm from "remark-gfm";
import remarkDirective from "remark-directive";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";

// Rehype plugins
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeShiki from "@shikijs/rehype";
import { h } from "hastscript";
import { rehypeShikiDisplayNotation } from "./src/plugins/rehype/display-shiki-notation";
import { rehypeBlockClass } from "./src/plugins/rehype/rehype-block";
import { rehypeInlineShiki } from "./src/plugins/rehype/inline-shiki";
import { rehypePreLineNumbers } from "./src/plugins/rehype/rehype-pre-line-numbers";

// Shiki transformers
import {
  transformerNotationDiff,
  transformerNotationErrorLevel,
  transformerNotationFocus,
  transformerNotationHighlight,
  transformerNotationWordHighlight,
  transformerRemoveNotationEscape,
} from "@shikijs/transformers";
import { transformerLineNumbers } from "./src/plugins/shiki/transformerLineNumbers";
import { transformerNotationInclude } from "./src/plugins/shiki/transformerNotationInclude";
import { transformerTitle } from "./src/plugins/shiki/transformerTitle";
import { transformerEmptyLine } from "./src/plugins/shiki/transformerEmptyLine";
import { transformerTagLine } from "./src/plugins/shiki/transformerTagLine";
import { transformerSplitIdentifiers } from "./src/plugins/shiki/transformerSplitIdentifiers";

// Custom remark plugins
import { remarkCode } from "./src/plugins/remark/code";
import { remarkCodeGroup } from "./src/plugins/remark/code-group";
import { remarkFilename } from "./src/plugins/remark/filename";
import { remarkSteps } from "./src/plugins/remark/steps";
import { remarkSubheading } from "./src/plugins/remark/subheading";
import { remarkAuthors } from "./src/plugins/remark/authors";
import { remarkDetails } from "./src/plugins/remark/details";
import { remarkSponsors } from "./src/plugins/remark/sponsors";
import { remarkStrongBlock } from "./src/plugins/remark/strong-block";
import { remarkInferFrontmatter } from "./src/plugins/remark/inferred-frontmatter";
import { remarkCallout } from "./src/plugins/remark/callout";

export default defineConfig({
  plugins: [
    tanstackRouter({
      target: "react",
      autoCodeSplitting: true,
    }) as unknown as import("vite").PluginOption,
    react(),
    mdx({
      remarkPlugins: [
        remarkGfm,
        remarkDirective,
        remarkFrontmatter,
        remarkMdxFrontmatter,
        remarkCode,
        remarkCodeGroup,
        remarkCallout,
        remarkSteps,
        remarkSubheading,
        remarkFilename,
        remarkAuthors,
        remarkDetails,
        remarkSponsors,
        remarkStrongBlock,
        remarkInferFrontmatter,
      ],
      rehypePlugins: [
        rehypeSlug,
        [
          rehypeAutolinkHeadings,
          {
            behavior: "append",
            content() {
              return [h("div", { dataAutolinkIcon: true })];
            },
          },
        ],
        [
          rehypeShiki,
          {
            themes: {
              dark: "vitesse-dark",
              light: "vitesse-light",
            },
            defaultColor: "light",
            transformers: [
              transformerRemoveNotationEscape(),
              transformerLineNumbers(),
              transformerNotationDiff({ matchAlgorithm: "v3" }),
              transformerNotationFocus({ matchAlgorithm: "v3" }),
              transformerNotationHighlight({ matchAlgorithm: "v3" }),
              transformerNotationWordHighlight({ matchAlgorithm: "v3" }),
              transformerNotationErrorLevel({ matchAlgorithm: "v3" }),
              transformerNotationInclude({
                rootDir: path.resolve(__dirname, process.cwd()),
              }),
              transformerEmptyLine(),
              transformerTagLine(),
              transformerTitle(),
              transformerSplitIdentifiers(),
            ].filter(Boolean),
          },
        ],
        [
          rehypeInlineShiki,
          {
            themes: {
              dark: "vitesse-dark",
              light: "vitesse-light",
            },
            defaultColor: "light",
          },
        ],
        rehypeShikiDisplayNotation,
        rehypePreLineNumbers,
        rehypeBlockClass,
      ],
      providerImportSource: "@mdx-js/react",
    }),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
