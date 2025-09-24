import type {
  HTMLAttributes,
  AnchorHTMLAttributes,
  TableHTMLAttributes,
  ThHTMLAttributes,
  TdHTMLAttributes,
} from "react";
import React from "react";
import { CopyButton } from "./copy-button";
import { Note } from "../muni-components/note";
import { DocsButton } from "./docs-button";
import { Homepage } from "../muni-components/homepage";

type HeadingProps = React.PropsWithChildren<HTMLAttributes<HTMLHeadingElement>>;
type ParagraphProps = React.PropsWithChildren<
  HTMLAttributes<HTMLParagraphElement>
>;
type CodeProps = React.PropsWithChildren<React.HTMLAttributes<HTMLElement>> & {
  className?: string;
};
type ListProps = React.PropsWithChildren<
  HTMLAttributes<HTMLUListElement | HTMLOListElement>
>;
type ListItemProps = React.PropsWithChildren<HTMLAttributes<HTMLLIElement>>;
type BlockquoteProps = React.PropsWithChildren<HTMLAttributes<HTMLElement>>;
type AnchorProps = React.PropsWithChildren<
  AnchorHTMLAttributes<HTMLAnchorElement>
>;
type TableProps = React.PropsWithChildren<
  TableHTMLAttributes<HTMLTableElement>
>;
type ThProps = React.PropsWithChildren<ThHTMLAttributes<HTMLTableCellElement>>;
type TdProps = React.PropsWithChildren<TdHTMLAttributes<HTMLTableCellElement>>;

function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .trim();
}

export const mdxComponents = {
  h1: ({ children, ...props }: HeadingProps) => {
    const text = typeof children === "string" ? children : "";
    const id = generateSlug(text);

    return (
      <h1
        id={id}
        className="text-3xl font-bold mb-8 mt-6 tracking-tight scroll-mt-20"
        {...props}
      >
        {children}
      </h1>
    );
  },

  h2: ({ children, ...props }: HeadingProps) => {
    const text = typeof children === "string" ? children : "";
    const id = generateSlug(text);

    return (
      <h2
        id={id}
        className="text-2xl font-semibold mb-4 mt-12 tracking-tight scroll-mt-20 group"
        {...props}
      >
        {children}
      </h2>
    );
  },

  h3: ({ children, ...props }: HeadingProps) => {
    const text = typeof children === "string" ? children : "";
    const id = generateSlug(text);

    return (
      <h3
        id={id}
        className="text-xl font-semibold mb-3 mt-8 tracking-tight scroll-mt-20 group"
        {...props}
      >
        {children}
      </h3>
    );
  },

  h4: ({ children, ...props }: HeadingProps) => {
    const text = typeof children === "string" ? children : "";
    const id = generateSlug(text);

    return (
      <h4
        id={id}
        className="text-lg font-semibold mb-2 mt-6 tracking-tight scroll-mt-20 group"
        {...props}
      >
        {children}
      </h4>
    );
  },

  p: ({ children, ...props }: ParagraphProps) => (
    <p className="mb-6 leading-7 text-foreground/90" {...props}>
      {children}
    </p>
  ),

  code: ({ children, className, ...props }: CodeProps) => {
    const isInline = !className;
    const codeContent = typeof children === "string" ? children : "";

    if (isInline) {
      return (
        <code
          className="relative rounded-md px-2 py-1 text-sm font-mono bg-muted/80 text-foreground border"
          {...props}
        >
          {children}
        </code>
      );
    }

    return (
      <div className="relative group my-6">
        <pre className="overflow-x-auto rounded-xl border bg-muted/30 p-4">
          <code className={`text-sm font-mono ${className ?? ""}`} {...props}>
            {children}
          </code>
        </pre>
        <CopyButton text={codeContent} />
      </div>
    );
  },

  ul: ({ children, ...props }: ListProps) => (
    <ul className="my-6 ml-6 list-disc space-y-2" {...props}>
      {children}
    </ul>
  ),

  ol: ({ children, ...props }: ListProps) => (
    <ol className="my-6 ml-6 list-decimal space-y-2" {...props}>
      {children}
    </ol>
  ),

  li: ({ children, ...props }: ListItemProps) => (
    <li className="leading-7" {...props}>
      {children}
    </li>
  ),

  blockquote: ({ children, ...props }: BlockquoteProps) => (
    <blockquote
      className="border-l-4 border-primary bg-muted/30 rounded-r-lg px-6 py-4 italic my-6 text-foreground/80"
      {...props}
    >
      {children}
    </blockquote>
  ),

  a: ({ children, href, ...props }: AnchorProps) => (
    <a
      href={href}
      className="font-medium text-primary hover:underline underline-offset-4"
      {...props}
    >
      {children}
    </a>
  ),

  table: ({ children, ...props }: TableProps) => (
    <div className="my-6 w-full overflow-y-auto">
      <table className="w-full text-sm" {...props}>
        {children}
      </table>
    </div>
  ),

  th: ({ children, ...props }: ThProps) => (
    <th
      className="border-b border-border px-4 py-3 text-left font-semibold text-muted-foreground"
      {...props}
    >
      {children}
    </th>
  ),

  td: ({ children, ...props }: TdProps) => (
    <td className="border-b border-border px-4 py-3" {...props}>
      {children}
    </td>
  ),

  // Custom components
  Note,
  Button: DocsButton,
  Homepage,

  // Add wrapper for better prose styling
  wrapper: ({ children, ...props }: { children: React.ReactNode }) => (
    <div className="max-w-none" {...props}>
      {children}
    </div>
  ),
};
