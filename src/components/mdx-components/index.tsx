import type { MDXComponents } from "mdx/types.js";

import { Anchor } from "./anchor";
import { Blockquote } from "./blockquote";
import { Code } from "./code";
import { Figure } from "./figure";
import { H1 } from "./H1";
import { H2 } from "./H2";
import { H3 } from "./H3";
import { H4 } from "./H4";
import { H5 } from "./H5";
import { H6 } from "./H6";
import { HorizontalRule } from "./horizontal-rule";
import { Kbd } from "./kbd";
import { List } from "./list";
import { ListItem } from "./list-item";
import { Paragraph } from "./paragraph";
import { Pre } from "./pre";
import { Section } from "./section";
import { Span } from "./span";
import { Strong } from "./strong";
import { Summary } from "./summary";
import { Table } from "./table";
import { TableCell } from "./table-cell";
import { TableHeader } from "./table-header";
import { TableRow } from "./table-row";
import { Aside } from "./aside";
import { Details } from "./details";
import { Div } from "./div";
import { Header } from "./header";
import { Figcaption } from "./figcaption";
import { Callout } from "./alert-callout";

export const mdxComponents: MDXComponents = {
  Callout,
  a: Anchor as any,
  aside: Aside,
  blockquote: Blockquote,
  code: Code,
  details: Details,
  div: Div,
  pre: Pre,
  header: Header,
  figcaption: Figcaption,
  figure: Figure,
  h1: H1,
  h2: H2,
  h3: H3,
  h4: H4,
  h5: H5,
  h6: H6,
  hr: HorizontalRule,
  kbd: Kbd,
  li: ListItem,
  ol: (props) => <List ordered {...props} />,
  p: Paragraph,
  section: Section,
  span: Span,
  strong: Strong,
  summary: Summary,
  table: Table,
  td: TableCell,
  th: TableHeader,
  tr: TableRow,
  ul: (props) => <List ordered={false} {...props} />,
};
