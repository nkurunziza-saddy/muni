import { useMemo, useState } from "react";
import muniConfig from "../../muni.config";

const mdxModules = import.meta.glob("../docs/**/*.mdx", {
  eager: true,
}) as Record<string, { frontmatter?: any }>;

const docsBySlug = Object.fromEntries(
  Object.entries(mdxModules).map(([path, module]) => {
    const slug = path.replace("../docs/", "").replace(".mdx", "");
    return [slug, module.frontmatter || {}];
  })
);

export function useDocsNavigation() {
  const [searchQuery, setSearchQuery] = useState("");

  const navigation = useMemo(() => {
    return muniConfig.navigation.map(section => ({
      title: section.title,
      items: section.items.map(item => {
        const frontmatter = docsBySlug[item.slug] || {};
        return {
          ...item,
          ...frontmatter,
        };
      }),
    }));
  }, []);

  const filteredNavigation = useMemo(() => {
    if (!searchQuery) return navigation;

    return navigation
      .map((section) => ({
        ...section,
        items: section.items.filter(
          (item) =>
            item.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.description?.toLowerCase().includes(searchQuery.toLowerCase())
        ),
      }))
      .filter((section) => section.items.length > 0);
  }, [navigation, searchQuery]);

  return { searchQuery, setSearchQuery, filteredNavigation };
}

