import {
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export function SidebarRight({ headings }: { headings: any[] }) {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      let currentActiveId: string | null = null;
      const fromTop = 150; // Offset from the top of the viewport

      for (const heading of headings) {
        const element = document.getElementById(heading.id);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top < fromTop) {
            currentActiveId = heading.id;
          } else {
            break;
          }
        }
      }
      setActiveId(currentActiveId);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [headings]);

  if (headings.length === 0) return null;
  return (
    <div className="h-fit border-l px-6 sticky top-24">
      <SidebarHeader className="px-0 pb-3">
        <h4 className="text-sm font-semibold text-foreground">On this page</h4>
      </SidebarHeader>
      <SidebarContent className="px-0">
        {headings.length > 0 && (
          <SidebarMenu className="px-0 space-y-2">
            {headings.map((heading, i) => {
              const isActive = activeId === heading.id;
              return (
                <SidebarMenuItem key={heading.id + i.toString()} className="">
                  <a
                    href={`#${heading.id}`}
                    className={cn(
                      "group flex items-center text-sm transition-all duration-200",
                      isActive
                        ? "text-foreground font-semibold"
                        : "text-muted-foreground/80 hover:text-foreground",
                      heading.level === 3
                        ? "ml-3"
                        : heading.level === 4
                        ? "ml-6"
                        : heading.level === 5
                        ? "ml-9"
                        : ""
                    )}
                    onClick={(e) => {
                      e.preventDefault();
                      const element = document.getElementById(heading.id);
                      if (element) {
                        element.scrollIntoView({
                          behavior: "smooth",
                          block: "start",
                        });
                        window.history.pushState(null, "", `#${heading.id}`);
                      }
                    }}
                  >
                    <span className="truncate leading-tight">
                      {heading.text}
                    </span>
                  </a>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        )}
      </SidebarContent>
    </div>
  );
}