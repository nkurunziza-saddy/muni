import {
  InfoIcon,
  LightbulbIcon,
  CheckCircle2Icon,
  TriangleAlertIcon,
} from "lucide-react";
import type { ReactNode } from "react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const alertConfig = {
  note: {
    variant: "note",
    icon: InfoIcon,
    title: "Note",
  },
  info: {
    variant: "info",
    icon: InfoIcon,
    title: "Info",
  },
  warning: {
    variant: "warning",
    icon: TriangleAlertIcon,
    title: "Warning",
  },
  danger: {
    variant: "destructive",
    icon: TriangleAlertIcon,
    title: "Danger",
  },
  tip: {
    variant: "tip",
    icon: LightbulbIcon,
    title: "Tip",
  },
  success: {
    variant: "success",
    icon: CheckCircle2Icon,
    title: "Success",
  },
} as const;

export type CalloutProps = {
  children: ReactNode;
  type: keyof typeof alertConfig;
  title?: string;
};

export function Callout({ children, type, title }: CalloutProps) {
  const config = alertConfig[type];
  const Icon = config.icon;

  return (
    <Alert variant={config.variant} className="not-prose my-4">
      <Icon />
      <AlertTitle>{title ?? config.title}</AlertTitle>
      <AlertDescription>{children}</AlertDescription>
    </Alert>
  );
}
