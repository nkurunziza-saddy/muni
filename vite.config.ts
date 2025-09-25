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
import { rehypeInlineShiki } from "./src/plugins/rehype/inline-shiki";

// Shiki transformers
import {
  transformerNotationDiff,
  transformerNotationFocus,
  transformerNotationHighlight,
  transformerNotationWordHighlight,
} from "@shikijs/transformers";
import { transformerLineNumbers } from "./src/plugins/shiki/transformerLineNumbers";
import { transformerNotationInclude } from "./src/plugins/shiki/transformerNotationInclude";
import { transformerTitle } from "./src/plugins/shiki/transformerTitle";
import { transformerEmptyLine } from "./src/plugins/shiki/transformerEmptyLine";
import { transformerTagLine } from "./src/plugins/shiki/transformerTagLine";
import { transformerSplitIdentifiers } from "./src/plugins/shiki/transformerSplitIdentifiers";

// Remark plugins
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
              dark: "github-dark-dimmed",
              light: "vitesse-light",
            },
            defaultColor: "light-dark()",
            transformers: [
              transformerLineNumbers(),
              transformerNotationDiff(),
              transformerNotationFocus(),
              transformerNotationHighlight(),
              transformerNotationWordHighlight(),
              transformerNotationInclude({
                rootDir: path.resolve(__dirname, "./src"),
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
              dark: "github-dark",
              light: "github-light",
            },
            defaultColor: "light-dark()",
          },
        ],
        rehypeShikiDisplayNotation,
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
