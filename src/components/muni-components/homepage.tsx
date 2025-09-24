import { ArrowRight, Home } from "lucide-react";
import { DocsButton } from "../mdx-components/docs-button";

export function Homepage() {
  return (
    <div className="text-center py-16 not-prose">
      <div className="flex items-center justify-center mb-6">
        <Home className="h-12 w-12 text-primary" />
      </div>
      <h1 className="text-4xl font-bold mb-4">Welcome to Documentation</h1>
      <p className="text-lg text-muted-foreground mb-8 max-w-3xl mx-auto">
        Explore our comprehensive documentation to get started with our platform
        and APIs.
      </p>
      <div className="flex items-center justify-center gap-4">
        <DocsButton size="lg">
          Get Started
          <ArrowRight className="h-4 w-4" />
        </DocsButton>
        <DocsButton variant="outline" size="lg">
          View Examples
        </DocsButton>
      </div>
    </div>
  );
}
