import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import type { ShikiTransformer } from "shiki";

const includeRegex = /\/\/ \[!include ([^\]]+)\]/;
const regionRegex = /\/\/ \[!region ([^\]]+)\]/;
const regionRegexLineGlobal = /\/\/ \[!region (.*)\]\n/g;
const endRegionRegex = /\/\/ \[!endregion ([^\]]+)\]/;
const endRegionRegexLineGlobal = /\/\/ \[!endregion (.*)\](\n|$)/g;

export type TransformerNotationIncludeOptions = {
  rootDir: string;
};

export const transformerNotationInclude = ({
  rootDir,
}: TransformerNotationIncludeOptions): ShikiTransformer => ({
  name: "includes",
  preprocess(code) {
    if (!code) return code;
    return processIncludes({
      code,
      getSource(fileName) {
        if (!fileName.startsWith("~")) return undefined;
        const path = resolve(rootDir, fileName.replace("~/", "./"));
        try {
          return readFileSync(path, { encoding: "utf-8" }).replace(/\n$/, "");
        } catch (e) {
          console.error(e);
          return `// [!include] File not found: ${fileName}`;
        }
      },
    });
  },
});

export function processIncludes({
  code,
  getSource,
}: {
  code: string;
  getSource: (fileName: string) => string | undefined;
}) {
  const includes = code.includes("// [!include");
  if (!includes) return code.replace(/\n$/, "");

  const lines = code.split("\n");
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    const match = line.match(includeRegex);
    if (match) {
      const [, value] = match;
      const [file, ...query] = value.split(" ");
      const [fileName, region] = file.split(":");

      let contents = getSource(fileName);
      if (contents === undefined) {
        i++;
        continue;
      }
      contents = extractRegion(contents, region);
      contents = findAndReplace(contents, query);

      lines.splice(i, 1, contents);
    }
    i++;
  }
  return lines
    .join("\n")
    .replaceAll(regionRegexLineGlobal, "")
    .replaceAll(endRegionRegexLineGlobal, "")
    .replace(/\n$/, "");
}

function extractRegion(code: string, region: string | undefined) {
  const lines = [];

  let inRegion = !region;
  for (const line of code.split("\n")) {
    const startRegionMatch = line.match(regionRegex);
    const endRegionMatch = line.match(endRegionRegex);

    if (inRegion && !startRegionMatch && !endRegionMatch)
      lines.push(line.replaceAll(/_\$\d*/g, ""));
    else if (startRegionMatch) {
      const [, regionName] = startRegionMatch;
      if (regionName === region) {
        inRegion = true;
      }
    } else if (endRegionMatch) {
      const [, regionName] = endRegionMatch;
      if (regionName === region) {
        inRegion = false;
      }
    }
  }

  return lines.join("\n");
}

const findAndReplaceRegex = /^\/(.*)([^\\])\/(.*)\/$/;

function findAndReplace(code_: string, queries: string[]) {
  if (queries.length === 0) return code_;
  let code = code_;
  for (const query of queries) {
    const match = query.match(findAndReplaceRegex);
    if (!match) return code;
    const [, find1, find2, replace1] = match;
    const find = (find1 + find2).replace("\\/", "/");
    const replace = replace1.replace("\\/", "/");
    code = code.replaceAll(find, replace);
  }
  return code;
}
