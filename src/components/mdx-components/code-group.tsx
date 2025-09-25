import type { ReactElement } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { IsInCodeBlockContext } from "@/lib/code-context";
import { Pre } from "./pre";

export function CodeGroup({ children }: { children: ReactElement[] }) {
  if (!Array.isArray(children)) return null;

  const tabs = children.map((child_) => {
    const child = child_.props["data-title"] ? child_ : child_.props.children;
    const { props } = child;
    const tabTitle = (props as { "data-title"?: string })[
      "data-title"
    ] as string;
    return { tabTitle, props };
  });

  return (
    <Tabs className={cn("border border-input")} defaultValue={tabs[0].tabTitle}>
      <TabsList
        className={cn(
          "bg-muted/40 backdrop-blur-3xl border-b flex px-2 sm:px-2"
        )}
        aria-label="Code group"
      >
        {tabs.map(({ tabTitle }, i) => (
          <TabsTrigger
            key={tabTitle + i.toString()}
            value={tabTitle}
            className={cn(
              "border-b-2 border-transparent text-muted-foreground text-sm font-medium px-2 py-1.5 transition-colors duration-100 hover:text-foreground data-[state=active]:border-primary data-[state=active]:text-primary"
            )}
          >
            {tabTitle}
          </TabsTrigger>
        ))}
      </TabsList>
      {tabs.map(({ tabTitle, props }, i) => {
        const isShiki = props.className?.includes("shiki");

        return (
          <IsInCodeBlockContext.Provider key={tabTitle || i} value={true}>
            <TabsContent
              key={tabTitle || i}
              data-shiki={isShiki}
              value={tabTitle}
              className={cn("")}
            >
              <Pre isTabContent {...props} />
            </TabsContent>
          </IsInCodeBlockContext.Provider>
        );
      })}
    </Tabs>
  );
}
