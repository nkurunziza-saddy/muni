import { forwardRef } from "react";
import { ArrowUpRight } from "lucide-react";

export type ExternalLinkProps = React.DetailedHTMLProps<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
> & { hideExternalIcon?: boolean };

export const ExternalLink = forwardRef<HTMLAnchorElement, ExternalLinkProps>(
  ({ className, children, hideExternalIcon, href, ...props }, ref) => {
    return (
      <a
        ref={ref}
        className={className}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      >
        {children}
        {!hideExternalIcon && typeof children === "string" && (
          <ArrowUpRight className="inline-block w-4 h-4 ml-1 align-text-bottom" />
        )}
      </a>
    );
  }
);