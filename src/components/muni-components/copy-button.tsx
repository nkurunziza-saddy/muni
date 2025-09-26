import { Button } from "../ui/button";
import { ClipboardCheck, ClipboardCopy } from "lucide-react";

export function CopyButton({
  copy,
  copied,
}: {
  copy: () => void;
  copied: boolean;
}) {
  return (
    <Button
      variant="ghost"
      size="sm"
      data-copied={copied}
      onClick={copy}
      type="button"
      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 duration-200 transition-opacity h-8 w-8 p-0"
    >
      {copied ? (
        <ClipboardCheck className="h-4 w-4 text-success-foreground " />
      ) : (
        <ClipboardCopy className="h-4 w-4 text-muted-foreground" />
      )}
    </Button>
  );
}
