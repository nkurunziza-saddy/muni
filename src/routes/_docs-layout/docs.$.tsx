import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense } from "react";
import MDXWrapper from "@/components/mdx-wrapper";
import { AlertTriangle, ArrowLeft, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { DocsPagination } from "@/components/navigation/docs-pagination";

export const Route = createFileRoute("/_docs-layout/docs/$")({
  component: MdxComponent,
  errorComponent: ErrorComponent,
  notFoundComponent: NotFoundComponent,
});

function LoadingSkeleton() {
  return (
    <div className=" space-y-4">
      <div className="h-12 bg-muted rounded animate-pulse" />
      <div className="space-y-3">
        <div className="h-4 bg-muted rounded w-3/4 animate-pulse" />
        <div className="h-4 bg-muted rounded w-1/2 animate-pulse" />
        <div className="h-4 bg-muted rounded w-5/6 animate-pulse" />
      </div>
      <div className="h-32 bg-muted rounded animate-pulse" />
      <div className="space-y-2">
        <div className="h-4 bg-muted rounded animate-pulse" />
        <div className="h-4 bg-muted rounded animate-pulse" />
        <div className="h-4 bg-muted rounded w-2/3 animate-pulse" />
      </div>
    </div>
  );
}

function NotFoundComponent() {
  return (
    <div className="text-center">
      <div className="flex items-center justify-center mb-6">
        <AlertTriangle className="h-16 w-16 text-muted-foreground" />
      </div>
      <h1 className="text-4xl font-bold mb-4">Page Not Found</h1>
      <p className="text-xl text-muted-foreground mb-8 max-w-lg mx-auto">
        The documentation page you're looking for doesn't exist or has been
        moved.
      </p>
      <div className="flex items-center justify-center gap-4">
        <Button asChild>
          <Link to="/">
            <Home className="h-4 w-4 mr-2" />
            Go Home
          </Link>
        </Button>
        <Button variant="outline" onClick={() => window.history.back()}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Go Back
        </Button>
      </div>
    </div>
  );
}

function ErrorComponent({ error }: { error: Error }) {
  return (
    <div className="text-center">
      <div className="flex items-center justify-center mb-6">
        <AlertTriangle className="h-16 w-16 text-destructive/70" />
      </div>
      <h1 className="text-4xl font-bold mb-4">Something went wrong</h1>
      <p className="text-xl text-muted-foreground mb-4">
        We encountered an error while loading this page.
      </p>
      <details className="text-left mb-8 p-4 bg-muted rounded-lg max-w-2xl mx-auto">
        <summary className="cursor-pointer font-medium mb-2">
          Error Details
        </summary>
        <code className="text-sm text-destructive/90 break-all">
          {error.message}
        </code>
      </details>
      <div className="flex items-center justify-center gap-4">
        <Button onClick={() => window.location.reload()}>Try Again</Button>
        <Button variant="outline" asChild>
          <Link to="/">
            <Home className="h-4 w-4 mr-2" />
            Go Home
          </Link>
        </Button>
      </div>
    </div>
  );
}

function MdxComponent() {
  const { _splat } = Route.useParams();

  const modules = import.meta.glob("../../docs/**/*.mdx");
  const mdxPath = `../../docs/${_splat}.mdx`;
  const importFn = modules[mdxPath];

  if (!importFn) {
    throw new Error(`MDX file not found: ${mdxPath}`);
  }

  const Component = lazy(
    () => importFn() as Promise<{ default: React.ComponentType<any> }>
  );

  return (
    <div className="py-6">
      <Suspense fallback={<LoadingSkeleton />}>
        <MDXWrapper>
          <Component />
        </MDXWrapper>
      </Suspense>
      <DocsPagination />
    </div>
  );
}
