import { Outlet, createFileRoute } from "@tanstack/react-router";
import { useRef } from "react";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { SidebarLeft } from "@/components/navigation/sidebar-left";
import { SidebarRight } from "@/components/navigation/sidebar-right";
import { useDocsNavigation } from "@/hooks/use-docs-navigation";
import { useTableOfContents } from "@/hooks/use-table-of-contents";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "@/components/theme-toggle";
import { SearchIcon } from "lucide-react";

export const Route = createFileRoute("/_docs-layout")({
  component: DocsLayout,
});

function DocsLayout() {
  const contentRef = useRef<HTMLDivElement>(null);
  const { searchQuery, setSearchQuery, filteredNavigation } =
    useDocsNavigation();
  const headings = useTableOfContents(contentRef);

  return (
    <SidebarProvider>
      <SidebarLeft navigation={filteredNavigation} />
      <SidebarInset>
        <header className="bg-background/80 backdrop-blur-md sticky top-0 flex h-16 border-b border-border/40 z-50 shrink-0 items-center gap-2 px-6">
          <div className="flex flex-1 items-center gap-4">
            <div className="relative hidden sm:block">
              <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground/60" />
              <Input
                type="search"
                placeholder="Search docs"
                className="w-64 pl-10 h-12 bg-muted/30 border-border/50 focus:border-primary/50 focus:bg-background transition-all duration-200 rounded-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 px-2 py-1 bg-muted/50 rounded-md">
              <span className="text-xs font-mono text-muted-foreground">v</span>
              <span className="text-xs font-mono font-semibold">4.0.0</span>
            </div>
            <ThemeToggle />
          </div>
        </header>
        <div className="flex min-h-screen bg-background">
          <main ref={contentRef} className="flex-1 max-w-none">
            <div className="px-6 max-w-4xl">
              <Outlet />
            </div>
          </main>
          <aside className="hidden xl:block w-64 shrink-0 p-2">
            <SidebarRight headings={headings} />
          </aside>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
