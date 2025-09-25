import {
  useMemo,
  type DetailedHTMLProps,
  type HTMLAttributes,
  type ReactElement,
  type ReactNode,
} from "react";

import { CodeBlock } from "./code-block.js";
import { CopyButton } from "../muni-components/copy-button.js";
import { CodeTitle } from "./code-title.js";
import { useCopyCode } from "@/hooks/use-copy-code.js";
import { IsInCodeBlockContext } from "@/lib/code-context.js";
import { cn } from "@/lib/utils.js";

export function Pre({
  children,
  className,
  ...props
}: DetailedHTMLProps<HTMLAttributes<HTMLPreElement>, HTMLPreElement> & {
  "data-lang"?: string;
  "data-title"?: string;
}) {
  const { copied, copy, ref } = useCopyCode();

  function recurseChildren(children: ReactElement<any>): ReactNode {
    if (!children) return children;
    if (typeof children !== "object") return children;
    if ("props" in children)
      return {
        ...children,
        props: {
          ...children.props,
          children: Array.isArray(children.props.children)
            ? children.props.children.map(recurseChildren)
            : recurseChildren(children.props.children),
        },
      };
    return children;
  }
  const children_ = useMemo(
    () => recurseChildren(children as ReactElement),
    [children]
  );

  const wrap = (children: React.ReactNode) => {
    if (className?.includes("shiki")) {
      return (
        <CodeBlock className="">
          {props["data-title"] && (
            <CodeTitle language={props["data-lang"]}>
              {props["data-title"]}
            </CodeTitle>
          )}
          {children}
        </CodeBlock>
      );
    }
    return children;
  };

  return (
    <IsInCodeBlockContext.Provider value={true}>
      {wrap(
        <div className="relative">
          <pre ref={ref} {...props} className={cn(className, "p-2")}>
            <CopyButton copied={copied} copy={copy} />
            {children_}
          </pre>
        </div>
      )}
    </IsInCodeBlockContext.Provider>
  );
}
