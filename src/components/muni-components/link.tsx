import { forwardRef } from "react";
import { useLocation } from "@tanstack/react-router";
import {
  Link as RouterLink,
  type LinkProps as RouterLinkProps,
} from "@tanstack/react-router";
import { ExternalLink } from "./external-link";

type LinkProps = {
  children: React.ReactNode;
  className?: string;
  hideExternalIcon?: boolean;
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  href?: string;
  variant?: "accent" | "styleless";
};

export const Link = forwardRef<HTMLAnchorElement, LinkProps>((props, ref) => {
  const { hideExternalIcon, href, variant = "accent", className } = props;
  const { pathname } = useLocation();

  const accentClasses =
    "text-primary font-medium underline-offset-4 hover:underline";
  const stylelessClasses = ""; // No special styles

  const variantClasses =
    variant === "accent" ? accentClasses : stylelessClasses;

  // External links
  if (href?.match(/^(www|https?)/)) {
    return (
      <ExternalLink
        {...props}
        ref={ref}
        className={`${variantClasses} ${className || ""}`}
        hideExternalIcon={hideExternalIcon}
      />
    );
  }

  // Internal links
  const [before, after] = (href || "").split("#");
  const to = `${before ? before : pathname}${after ? `#${after}` : ""}`;
  return (
    <RouterLink
      {...(props as Omit<RouterLinkProps, "to">)}
      ref={ref}
      className={`${variantClasses} ${className || ""}`}
      to={to}
    />
  );
});
