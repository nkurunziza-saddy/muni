import { cn } from "@/lib/utils";
import { File, Terminal } from "lucide-react";

export function CodeTitle({
  children,
  className,
  language,
  ...props
}: {
  children: string;
  className?: string;
  language?: string;
}) {
  return (
    <div
      {...props}
      className={cn(
        "text-sm bg-muted/40 backdrop-blur-3xl",
        "flex items-center gap-1.5 px-1 md:px-2 py-2 text-sm font-medium group-[.code-group]:hidden",
        className
      )}
    >
      {language === "bash" ? (
        <Terminal size={14} />
      ) : children.match(/\.(.*)$/) ? (
        <File size={14} />
      ) : null}
      {children}
    </div>
  );
}
