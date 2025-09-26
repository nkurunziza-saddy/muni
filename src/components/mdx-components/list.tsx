import { cn } from "@/lib/utils";
import type { DetailedHTMLProps, HTMLAttributes } from "react";

type UnorderedListProps = DetailedHTMLProps<
  HTMLAttributes<HTMLUListElement>,
  HTMLUListElement
>;

type OrderedListProps = DetailedHTMLProps<
  HTMLAttributes<HTMLOListElement>,
  HTMLOListElement
>;

type ListProps = (UnorderedListProps | OrderedListProps) & {
  ordered?: boolean;
};

export function List({ ordered = false, ...props }: ListProps) {
  if (ordered) {
    const { className, ...rest } = props as OrderedListProps;
    return (
      <ol
        {...rest}
        className={cn("my-2 ml-6", "list-decimal", "[&>li]:mt-2", className)}
      />
    );
  } else {
    const { className, ...rest } = props as UnorderedListProps;
    return (
      <ul
        {...rest}
        className={cn("my-2 ml-6", "list-disc", "[&>li]:mt-2", className)}
      />
    );
  }
}
