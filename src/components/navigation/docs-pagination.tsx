import { useDocsNavigation } from "@/hooks/use-docs-navigation";
import { Link, useLocation } from "@tanstack/react-router";
import { useMemo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function DocsPagination({ className }: { className?: string }) {
  const { filteredNavigation } = useDocsNavigation();
  const { pathname } = useLocation();

  const flattenedPages = useMemo(() => {
    return filteredNavigation.flatMap((section) => section.items);
  }, [filteredNavigation]);

  const currentPageIndex = useMemo(() => {
    const currentSlug = pathname.replace("/docs/", "").replace(/\/$/, "");
    return flattenedPages.findIndex((page) => page.slug === currentSlug);
  }, [flattenedPages, pathname]);

  const prevPage =
    currentPageIndex > 0 ? flattenedPages[currentPageIndex - 1] : null;
  const nextPage =
    currentPageIndex !== -1 && currentPageIndex < flattenedPages.length - 1
      ? flattenedPages[currentPageIndex + 1]
      : null;

  if (!prevPage && !nextPage) {
    return null;
  }

  return (
    <div
      className={`flex items-center justify-between mt-12 pt-6 border-t ${
        className || ""
      }`}
    >
      <div>
        {prevPage && (
          <Link
            to="/docs/$"
            params={{ _splat: prevPage.slug }}
            className="flex items-end gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ChevronLeft className="h-4 w-4 mb-1" />
            <div>
              <div className="text-xs">Previous</div>
              <div>{prevPage.title}</div>
            </div>
          </Link>
        )}
      </div>
      <div>
        {nextPage && (
          <Link
            to="/docs/$"
            params={{ _splat: nextPage.slug }}
            className="flex items-end gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors text-right"
          >
            <div>
              <div className="text-xs">Next</div>
              <div>{nextPage.title}</div>
            </div>
            <ChevronRight className="h-4 w-4 mb-1" />
          </Link>
        )}
      </div>
    </div>
  );
}
