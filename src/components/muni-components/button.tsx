import { Button as SButton } from "../ui/button";

export function Button({
  children,
  variant = "default",
  size = "default",
  ...props
}: React.ComponentProps<typeof SButton>) {
  return (
    <SButton
      variant={variant}
      size={size}
      className="inline-flex items-center gap-2 not-prose"
      {...props}
    >
      {children}
    </SButton>
  );
}
