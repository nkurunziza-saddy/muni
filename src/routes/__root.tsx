import { createRootRoute, Outlet } from "@tanstack/react-router";
import { ThemeProvider } from "@/components/theme-provider";
import "../styles/index.css";

export const Route = createRootRoute({
  component: () => (
    <ThemeProvider defaultTheme="dark" storageKey="muni-docs-theme">
      <Outlet />
    </ThemeProvider>
  ),
});
