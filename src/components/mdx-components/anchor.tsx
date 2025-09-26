import type { ReactNode } from "react";
import { Link, useLocation } from "@tanstack/react-router";

import { Autolink } from "./autolink.js";

type AnchorProps = {
  children: ReactNode;
  className?: string;
  href?: string;
};

export function Anchor(props: AnchorProps) {
  const { children, href, className } = props;
  const { pathname } = useLocation();

  const classes = "font-medium text-primary underline-offset-4 hover:underline";

  // Heading slug links
  if (
    children &&
    typeof children === "object" &&
    "props" in children &&
    (children.props as { "data-autolink-icon"?: boolean })["data-autolink-icon"]
  )
    return <Autolink className={`${className} ${classes}`} {...props} />;

  // ID links
  if (href?.match(/^#/))
    return (
      <a
        className={`${className} ${classes}`}
        {...props}
        href={`${pathname}${href}`}
      />
    );

  return (
    <Link to={href} className={`${className} ${classes}`} {...props}>
      {children}
    </Link>
  );
}
