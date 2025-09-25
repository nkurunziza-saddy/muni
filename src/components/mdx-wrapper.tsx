import { MDXProvider } from "@mdx-js/react";
import { mdxComponents } from "./mdx-components";

const MDXWrapper: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  return (
    <MDXProvider components={mdxComponents}>
      <div className="prose">{children}</div>
    </MDXProvider>
  );
};

export default MDXWrapper;