import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Link } from "@tanstack/react-router";
import { ChevronDown } from "lucide-react";

export function SidebarLeft({
  navigation,
  ...props
}: React.ComponentProps<typeof Sidebar> & {
  navigation: { title: string; items: any[] }[];
}) {
  return (
    <Sidebar className="bg-sidebar backdrop-blur-sm border-r" {...props}>
      <SidebarHeader className="h-16 border-b border-border/40 px-6">
        <span className="my-auto font-semibold text-lg">Muni</span>
      </SidebarHeader>
      <SidebarContent className="px-3 py-6">
        <SidebarMenu className="space-y-8">
          {navigation.map((section) => (
            <SidebarMenuItem
              key={section.title}
              className="border-b last:border-0 pb-6"
            >
              <div className="px-3 space-y-3">
                <h3 className="text-sm text-foreground/90 tracking-wider">
                  {section.title}
                </h3>
                <ul className="space-y-1">
                  {section.items.map((item: any) => (
                    <li key={item.slug}>
                      <Link
                        to="/docs/$"
                        params={{ _splat: item.slug }}
                        className="flex items-center text-sm text-muted-foreground/80 hover:text-foreground rounded-md transition-all duration-200 group"
                        activeProps={{
                          className: "text-primary",
                        }}
                      >
                        <span className="flex-1">{item.title}</span>
                        {item.hasChildren && (
                          <ChevronDown className="h-4 w-4 opacity-50 group-hover:opacity-100 transition-opacity" />
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
