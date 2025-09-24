import {
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export function SidebarRight({ headings }: { headings: any[] }) {
  if (headings.length === 0) return null;
  return (
    <div className="h-fit border-l px-6 sticky top-24">
      <SidebarHeader className="px-0 pb-3">
        <h4 className="text-sm font-semibold text-foreground">On this page</h4>
      </SidebarHeader>
      <SidebarContent className="px-0">
        {headings.length > 0 && (
          <SidebarMenu className="px-0 space-y-2">
            {headings.map((heading) => (
              <SidebarMenuItem key={heading.id} className="">
                <a
                  href={`#${heading.id}`}
                  className={`
                  group flex items-center text-sm text-muted-foreground/80 hover:text-foreground transition-all duration-200
                  ${
                    heading.level === 3
                      ? "ml-3"
                      : heading.level === 4
                      ? "ml-6"
                      : heading.level === 5
                      ? "ml-9"
                      : ""
                  }
                `}
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
                  <span className="truncate leading-tight">{heading.text}</span>
                </a>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        )}
      </SidebarContent>
    </div>
  );
}
