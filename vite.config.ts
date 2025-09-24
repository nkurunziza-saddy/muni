import path from "path";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import mdx from "@mdx-js/rollup";
import rehypeShiki from "@shikijs/rehype";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import {
  // transformerNotationInclude,
  transformerNotationHighlight,
  transformerNotationDiff,
  // transformerTwoslash,
  transformerNotationFocus,
} from "@shikijs/transformers";

export default defineConfig({
  plugins: [
    tanstackRouter({
      target: "react",
      autoCodeSplitting: true,
    }) as unknown as import("vite").PluginOption,
    react(),
    mdx({
      remarkPlugins: [remarkGfm],
      rehypePlugins: [
        [
          rehypeHighlight,
          rehypeSlug,
          rehypeShiki,
          {
            themes: { light: "github-light", dark: "github-dark" },
            transformers: [
              // transformerNotationInclude(),
              transformerNotationHighlight(),
              transformerNotationDiff(),
              // transformerTwoslash(),
              transformerNotationFocus(),
            ],
          },
        ],
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
