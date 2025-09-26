import type { ShikiTransformer } from "shiki";

export const transformerLineNumbers = (): ShikiTransformer => ({
  name: "line-numbers",
  code(hast) {
    const rawMeta = this.options.meta?.__raw;
    if (!rawMeta || !rawMeta.includes("showLineNumbers")) return;

    hast.properties["data-line-numbers"] = true;
  },
  line(hast, lineNumber) {
    const rawMeta = this.options.meta?.__raw;
    if (!rawMeta || !rawMeta.includes("showLineNumbers")) return;

    hast.properties["data-line-number"] = lineNumber;
  },
});
