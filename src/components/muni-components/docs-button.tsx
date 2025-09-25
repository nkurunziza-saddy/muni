import { Button } from "../ui/button";

export function DocsButton({
  children,
  variant = "default",
  size = "default",
  ...props
}: React.ComponentProps<typeof Button>) {
  return (
    <Button
      variant={variant}
      size={size}
      className="inline-flex items-center gap-2 not-prose"
      {...props}
    >
      {children}
    </Button>
  );
}
