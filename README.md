Nice — let’s cut the fluff and build the exact **super-minimal, Tailwind-v4 + MDX + TanStack Router** docs starter you asked for. I’ll give you copy-paste-ready files, commands, and plain-English guidance so you can get started even if you’re not used to this.

Highlights:

- Vite + React + TypeScript
- MDX via `vite-plugin-mdx`
- Tailwind CSS **v4** using the official Vite plugin (`@tailwindcss/vite`). Tailwind v4 simplifies setup and ships a dedicated Vite plugin. ([Tailwind CSS][1])
- TanStack Router for clean, type-safe routing; `/docs` is the docs entry and every `.mdx` under `src/docs` becomes a page automatically. ([tanstack.com][2])

---

## Quick plan (what I’ll give you)

1. exact `package.json` + install commands
2. Vite config + Tailwind v4 plugin + MDX plugin
3. Router setup using TanStack Router that maps `src/docs/**/*.mdx` → `/docs/...` routes automatically (index -> `/docs`)
4. tiny layout, MDX components mapping, and example MDX pages
5. step-by-step usage (dev, build) + troubleshooting tips

---

## 0) Prereqs

- Node.js ≥ 18 (recommended).
- Basic terminal & editor.
  If Node is older, update it — Tailwind v4 and latest tooling like Vite expect modern Node.

---

## 1) Create the project & install deps

Run this (copy/paste):

```bash
mkdir minimal-docs && cd minimal-docs
npm init -y

# core deps
npm install react react-dom

# dev deps (Vite, TS, MDX plugin, Tailwind v4, TanStack Router)
npm install -D vite typescript @types/react @types/react-dom vite-plugin-mdx @mdx-js/react \
  tailwindcss @tailwindcss/vite postcss autoprefixer \
  @tanstack/react-router @tanstack/react-router-devtools
```

Notes:

- `vite-plugin-mdx` is a reliable MDX plugin for Vite. ([npm][3])
- TanStack Router docs and install instructions are here. Use `@tanstack/react-router`. ([tanstack.com][2])

---

## 2) `package.json` scripts (add these scripts)

Open `package.json` and set scripts (or run these as `npm set-script`):

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
}
```

---

## 3) Vite + Tailwind v4 + MDX config

Create `vite.config.ts`:

```ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import mdx from "vite-plugin-mdx";
import tailwindcss from "@tailwindcss/vite"; // tailwind v4 vite plugin

export default defineConfig({
  plugins: [
    react(),
    mdx({
      // optional MDX remark/rehype plugins here
    }),
    tailwindcss(),
  ],
});
```

Why `@tailwindcss/vite`? Tailwind v4 promotes a dedicated Vite plugin to simplify setup and speed. ([Tailwind CSS][4])

---

## 4) Tailwind config & CSS

`tailwind.config.cjs`:

```js
module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx,mdx}"],
  theme: { extend: {} },
  plugins: [],
};
```

`postcss.config.cjs` (still useful for tooling):

```js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

`src/index.css`:

```css
@import "tailwindcss";

/* tiny readable defaults for MDX content */
.prose :where(h1, h2, h3, p, li) {
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}
```

Note: Tailwind v4 can also accept different import styles — this `@import "tailwindcss"` works with the v4 plugin approach. ([Tailwind CSS][1])

---

## 5) App structure (files to create)

Create this short tree:

```
/src
  /docs
    index.mdx
    getting-started.mdx
  /components
    DocsLayout.tsx
  mdx-components.tsx
  router.tsx
  main.tsx
  index.css
index.html
vite.config.ts
tailwind.config.cjs
postcss.config.cjs
```

I’ll paste the key files below.

---

## 6) `index.html`

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Minimal Docs</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

---

## 7) `src/main.tsx` — app mount

```tsx
import React from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "@tanstack/react-router";
import router from "./router";
import "./index.css";

const root = createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
```

---

## 8) `src/router.tsx` — the magic (auto-generate routes from `src/docs`)

This uses `import.meta.glob` to load all MDX files at build time, then creates a TanStack Router tree where `/docs` is the entry. The code below creates child routes per file; `index.mdx` maps to `/docs`.

```tsx
// src/router.tsx
import React from "react";
import {
  createRouter,
  createRootRoute,
  createRoute,
  RouterProvider,
} from "@tanstack/react-router";
import DocsLayout from "./components/DocsLayout";
import MDXWrapper from "./mdx-components"; // wrapper that provides MDX components (see file)

// 1) root route (wraps whole app)
const rootRoute = createRootRoute({
  component: () => (
    <div className="min-h-screen">
      <Outlet />
    </div>
  ),
});

// 2) docs parent route at /docs
const docsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "docs",
  component: () => <DocsLayout />,
});

// 3) load all mdx files under src/docs (eager so we have frontmatter)
const mdxModules = import.meta.glob("./docs/**/*.mdx", {
  eager: true,
}) as Record<string, any>;

/**
 mdxModules keys look like "./docs/index.mdx" or "./docs/foo/bar.mdx"
 Each module (eager) should export:
  - default: React component that renders the MDX
  - optionally: frontmatter via `export const frontmatter = { title: "...", order: 0 }`
*/

// helper to convert path -> route segment
function pathToSegment(path: string) {
  // "./docs/index.mdx" -> "" (index route)
  // "./docs/getting-started.mdx" -> "getting-started"
  const p = path.replace(/^\.\/docs/, "").replace(/\.mdx$/, "");
  if (p === "/index" || p === "/index.mdx" || p === "") return "";
  return p.replace(/^\//, "");
}

// collect child routes
const childRoutes = Object.entries(mdxModules).map(([filePath, mod]) => {
  const segment = pathToSegment(filePath); // e.g. '' or 'getting-started' or 'guide/part-1'
  const Component = mod.default;
  const meta = mod.frontmatter ?? {};
  // create a route for this MDX page
  return createRoute({
    getParentRoute: () => docsRoute,
    path: segment, // '' makes it the index route under /docs
    // component wraps the MDX default export with MDX components provider + meta (optional)
    component: () => (
      <MDXWrapper>
        <Component />
      </MDXWrapper>
    ),
    // attach meta to route instance (optional)
    // You could add loaders or other route-level settings here later.
    ...(meta ? { meta } : {}),
  });
});

// attach children to docsRoute
const routeTree = rootRoute.addChildren([docsRoute.addChildren(childRoutes)]);

// create router instance
const router = createRouter({
  routeTree,
  // defaults: preload on intent, scroll restoration etc available
  defaultPreload: "intent",
});

// export default router (used by main.tsx)
export default router;

// small helper import for Outlet used in rootRoute component
import { Outlet } from "@tanstack/react-router";
```

Notes:

- `import.meta.glob(..., { eager: true })` makes all MDX available at build time — fast, and bundles only what you need. Vite docs explain `import.meta.glob`. ([vitejs][5])
- TanStack Router lets you programmatically create routes via `createRoute` and assemble a tree. Docs give this pattern. ([tanstack.com][6])

---

## 9) `src/mdx-components.tsx` — MDX wrapper + shared components

Use this file to provide shared components for MDX. We’ll export `MDXWrapper` and some simple components (Note, Callout). You can expand anytime.

```tsx
// src/mdx-components.tsx
import React from "react";
import { MDXProvider } from "@mdx-js/react";

// small styled components
export const Note: React.FC<{ children?: React.ReactNode }> = ({
  children,
}) => (
  <div className="border-l-4 border-sky-500 bg-sky-50 p-3 rounded-md prose">
    {children}
  </div>
);

const components = {
  h1: (props: any) => <h1 className="text-3xl font-bold" {...props} />,
  h2: (props: any) => <h2 className="text-2xl font-semibold" {...props} />,
  a: (props: any) => <a className="underline" {...props} />,
  Note,
  // add more mappings if needed
};

const MDXWrapper: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return <MDXProvider components={components}>{children}</MDXProvider>;
};

export default MDXWrapper;
```

---

## 10) `src/components/DocsLayout.tsx` — sidebar + content wrapper

```tsx
// src/components/DocsLayout.tsx
import React from "react";
import { Link, useRouter } from "@tanstack/react-router";

// We'll create simple props: pages list is not strictly required because router builds pages,
// but we keep the UI minimal.
export default function DocsLayout({
  children,
}: {
  children?: React.ReactNode;
}) {
  // basic hardcoded nav — or you can introspect route tree for automated sidebar later
  return (
    <div className="min-h-screen flex bg-gray-50">
      <aside className="w-64 p-4 border-r bg-white">
        <div className="mb-6">
          <Link to="/docs">Docs</Link>
        </div>
        <nav className="space-y-1">
          <Link to="/docs" className="block py-1.5 hover:opacity-80">
            Home
          </Link>
          <Link
            to="/docs/getting-started"
            className="block py-1.5 hover:opacity-80"
          >
            Getting started
          </Link>
        </nav>
      </aside>

      <main className="flex-1 p-8 max-w-4xl">
        <div className="prose max-w-none">{children}</div>
      </main>
    </div>
  );
}
```

(If you want a fully automatic sidebar that reads file titles from frontmatter, I can add that next — but I kept this minimal and explicit.)

---

## 11) Example MDX pages

`src/docs/index.mdx`:

```mdx
export const frontmatter = { title: "Welcome", order: 0 };

# Welcome

This is a minimal docs site: MDX + Tailwind v4 + TanStack Router.

<Note>MDX renders TSX components fine (see `Note`).</Note>
```

`src/docs/getting-started.mdx`:

```mdx
export const frontmatter = { title: "Getting started", order: 1 };

# Getting started

- Add more `.mdx` files into `src/docs/`
- They become pages under `/docs/<filename>`
```

---

## 12) Run it

```bash
npm run dev
# open http://localhost:5173/docs
```

If you go to `/` it will show the root layout (you might want to redirect `/` → `/docs`; I left it explicit so you can control behavior). To add an automatic redirect, add a tiny index route that navigates to `/docs`.

---

## 13) Quick troubleshooting & tips (real talk)

- If MDX pages hot-reload behaves weirdly, ensure `vite-plugin-mdx` version is current — it’s maintained and works well. ([npm][3])
- If Tailwind classes don’t show up, check `tailwind.config.cjs` `content` globs include `mdx` and that `@tailwindcss/vite` plugin is in `vite.config.ts`. ([Tailwind CSS][4])
- TanStack Router is intentionally different from React Router — you’ll want to read their quick start if you plan to use advanced routing features (loaders, code splitting). But for file->route mapping like this, the pattern above is solid. ([tanstack.com][2])

---

## 14) Next-level optional add-ons (easy & tiny)

- Auto-generated sidebar: read the `mdxModules` entries and build a sidebar array from `frontmatter.title` or file path (I can add that).
- Search: drop `fuse.js` and create a tiny index from MDX frontmatter + content (precompute on build).
- Syntax highlighting: add `rehype-prism-plus` or `shiki` integration in the MDX plugin config.
- Static export: `vite build` produces `dist/` you can host on Netlify/Vercel/Cloudflare Pages.

---

## Sources & further reading

- Tailwind v4 + Vite plugin docs. ([Tailwind CSS][1])
- `vite-plugin-mdx` (useful for examples & options). ([npm][3])
- TanStack Router docs (file-based & code-based routing examples). ([tanstack.com][2])
- Vite `import.meta.glob` docs (used for MDX auto-import). ([vitejs][5])

---

If you want, I’ll:

- Turn this into a **GitHub-ready repo** (full `package.json` with pinned versions + all files) you can clone, or
- Add an **automatic sidebar generator** that reads `frontmatter.title` and groups pages by folders, or
- Add **search (Fuse)** and show how to index MDX for fast client search.

Pick one and I’ll spit out the repo or the sidebar code — fast and clean. No BS.

[1]: https://tailwindcss.com/blog/tailwindcss-v4?utm_source=chatgpt.com "Tailwind CSS v4.0"
[2]: https://tanstack.com/router/latest/docs/framework/react/installation "Installation | TanStack Router React Docs"
[3]: https://www.npmjs.com/package/vite-plugin-mdx?activeTab=dependencies&utm_source=chatgpt.com "vite-plugin-mdx - NPM"
[4]: https://tailwindcss.com/docs?utm_source=chatgpt.com "Installing Tailwind CSS with Vite"
[5]: https://vite.dev/guide/features?utm_source=chatgpt.com "Features - Vite"
[6]: https://tanstack.com/router/latest/docs/framework/react/examples/basic?utm_source=chatgpt.com "React TanStack Router Basic Example"
