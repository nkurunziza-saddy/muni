import { useState, useEffect, useMemo } from "react";
import { Search, FileText, Hash, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";

interface SearchResult {
  type: "page" | "heading";
  title: string;
  content?: string;
  url: string;
  category?: string;
  slug?: string;
}

interface SearchProps {
  docs: Array<{
    slug: string;
    title?: string;
    category?: string;
    description?: string;
  }>;
  className?: string;
  onResultClick?: () => void;
}

export function SearchComponent({
  docs,
  className = "",
  onResultClick,
}: SearchProps) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Create search index from docs
  const searchIndex = useMemo(() => {
    const results: SearchResult[] = [];

    docs.forEach((doc) => {
      if (doc.title) {
        results.push({
          type: "page",
          title: doc.title,
          content: doc.description,
          url: `/docs/${doc.slug}`,
          category: doc.category,
          slug: doc.slug,
        });
      }
    });

    return results;
  }, [docs]);

  // Filter results based on query
  const filteredResults = useMemo(() => {
    if (!query.trim()) return [];

    const lowercaseQuery = query.toLowerCase();

    return searchIndex
      .filter(
        (result) =>
          result.title.toLowerCase().includes(lowercaseQuery) ||
          result.content?.toLowerCase().includes(lowercaseQuery) ||
          result.category?.toLowerCase().includes(lowercaseQuery)
      )
      .slice(0, 8); // Limit to 8 results
  }, [query, searchIndex]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setSelectedIndex((prev) =>
            prev < filteredResults.length - 1 ? prev + 1 : prev
          );
          break;
        case "ArrowUp":
          e.preventDefault();
          setSelectedIndex((prev) => (prev > 0 ? prev - 1 : 0));
          break;
        case "Enter":
          e.preventDefault();
          if (filteredResults[selectedIndex]) {
            handleResultClick(filteredResults[selectedIndex]);
          }
          break;
        case "Escape":
          setIsOpen(false);
          setQuery("");
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, filteredResults, selectedIndex]);

  // Reset selected index when query changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const handleResultClick = (result: SearchResult) => {
    console.log("Navigating to:", result.url);
    setIsOpen(false);
    setQuery("");
    onResultClick?.();
  };

  const highlightMatch = (text: string, query: string) => {
    if (!query.trim()) return text;

    const regex = new RegExp(`(${query})`, "gi");
    const parts = text.split(regex);

    return parts.map((part, index) =>
      regex.test(part) ? (
        <mark
          key={index}
          className="bg-yellow-200 dark:bg-yellow-800 text-foreground"
        >
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  return (
    <div className={`relative ${className}`}>
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search documentation..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => {
            if (query) setIsOpen(true);
          }}
          className="pl-9 pr-4 h-10 bg-background border border-border focus:border-primary"
        />
        {query && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setQuery("");
              setIsOpen(false);
            }}
            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Search Results Dropdown */}
      {isOpen && query && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-background border border-border rounded-md shadow-lg z-50 max-h-80 overflow-y-auto">
          {filteredResults.length > 0 ? (
            <div className="py-2">
              {filteredResults.map((result, index) => (
                <Link
                  key={`${result.type}-${result.url}`}
                  to={result.url}
                  onClick={() => handleResultClick(result)}
                  className={`block px-4 py-3 hover:bg-muted/50 transition-colors ${
                    index === selectedIndex ? "bg-muted/50" : ""
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-1">
                      {result.type === "page" ? (
                        <FileText className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <Hash className="h-4 w-4 text-muted-foreground" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm text-foreground truncate">
                        {highlightMatch(result.title, query)}
                      </div>
                      {result.content && (
                        <div className="text-xs text-muted-foreground mt-1 line-clamp-2">
                          {highlightMatch(result.content, query)}
                        </div>
                      )}
                      {result.category && (
                        <div className="text-xs text-muted-foreground mt-1 opacity-60">
                          in {result.category}
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="px-4 py-8 text-center text-sm text-muted-foreground">
              <Search className="h-8 w-8 mx-auto mb-2 opacity-50" />
              No results found for "{query}"
            </div>
          )}
        </div>
      )}

      {/* Backdrop for mobile */}
      {isOpen && query && (
        <div
          className="fixed inset-0 z-40 bg-black/20 sm:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}
