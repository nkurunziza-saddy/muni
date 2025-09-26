import type { ReactNode } from "react";
import { H2 } from "../mdx-components/H2";
import { H3 } from "../mdx-components/H3";
import { H4 } from "../mdx-components/H4";
import { H5 } from "../mdx-components/H5";
import { H6 } from "../mdx-components/H6";
import { cn } from "@/lib/utils";

export type StepProps = {
  children: ReactNode;
  className?: string;
  title: ReactNode | string;
  titleLevel?: 2 | 3 | 4 | 5 | 6;
  step: number;
};

export function Step({
  children,
  className,
  title,
  titleLevel = 2,
  step,
}: StepProps) {
  const HeadingComponent = {
    2: H2,
    3: H3,
    4: H4,
    5: H5,
    6: H6,
  }[titleLevel];

  return (
    <div className={cn("mb-7", className)}>
      <div className="relative">
        <div className="absolute left-[-39px] -top-0.5 flex items-center justify-center size-[34px] bg-muted rounded-full border-[0.5em] border-background text-muted-foreground text-xs font-normal">
          {step}
        </div>
        {typeof title === "string" ? (
          <HeadingComponent>{title}</HeadingComponent>
        ) : (
          title
        )}
      </div>
      <div className="prose dark:prose-invert">{children}</div>
    </div>
  );
}
