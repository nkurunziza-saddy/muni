import type { ReactElement } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

export function CodeGroup({ children }: { children: ReactElement[] }) {
  if (!Array.isArray(children)) return null;
  const tabs = children.map((child_: any) => {
    const child = child_.props["data-title"] ? child_ : child_.props.children;
    const { props } = child;
    const title = (props as { "data-title"?: string })["data-title"] as string;
    const content = props.children as ReactElement;
    return { title, content };
  });

  return (
    <Tabs
      className={cn(
        "bg-card border border-border rounded-md my-6 -mx-4 md:mx-0"
      )}
      defaultValue={tabs[0].title}
    >
      <TabsList
        className={cn(
          "bg-background border-b border-border flex px-3.5 sm:px-2 rounded-t-md"
        )}
        aria-label="Code group"
      >
        {tabs.map(({ title }, i) => (
          <TabsTrigger
            key={title || i.toString()}
            value={title || i.toString()}
            className={cn(
              "border-b-2 border-transparent text-muted-foreground text-sm font-medium px-2 py-1.5 transition-colors duration-100 hover:text-foreground data-[state=active]:border-primary data-[state=active]:text-primary"
            )}
          >
            {title}
          </TabsTrigger>
        ))}
      </TabsList>
      {tabs.map(({ title, content }: any, i) => {
        const isShiki =
          content.props?.children?.props?.className?.includes("shiki");
        return (
          <TabsContent
            key={title || i.toString()}
            data-shiki={isShiki}
            value={title || i.toString()}
            className={cn("p-5 sm:p-4 bg-card")}
          >
            {content}
          </TabsContent>
        );
      })}
    </Tabs>
  );
}
