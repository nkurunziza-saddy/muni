import { Button } from "../ui/button";
import { Check, Copy } from "lucide-react";

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
      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8 p-0"
    >
      {copied ? (
        <Check className="h-4 w-4 text-green-500" />
      ) : (
        <Copy className="h-4 w-4" />
      )}
    </Button>
  );
}
