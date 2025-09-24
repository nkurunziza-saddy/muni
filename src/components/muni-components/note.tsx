import React from "react";
import { AlertTriangle, Info, CheckCircle, XCircle } from "lucide-react";

export interface NoteProps {
  children?: React.ReactNode;
  type?: "info" | "warning" | "error" | "success";
  title?: string;
  className?: string;
}

const noteConfig = {
  info: {
    icon: Info,
    className:
      "border-l-blue-500 bg-blue-50/50 dark:bg-blue-950/20 text-blue-900 dark:text-blue-100",
    iconClassName: "text-blue-500",
  },
  warning: {
    icon: AlertTriangle,
    className:
      "border-l-yellow-500 bg-yellow-50/50 dark:bg-yellow-950/20 text-yellow-900 dark:text-yellow-100",
    iconClassName: "text-yellow-500",
  },
  error: {
    icon: XCircle,
    className:
      "border-l-red-500 bg-red-50/50 dark:bg-red-950/20 text-red-900 dark:text-red-100",
    iconClassName: "text-red-500",
  },
  success: {
    icon: CheckCircle,
    className:
      "border-l-green-500 bg-green-50/50 dark:bg-green-950/20 text-green-900 dark:text-green-100",
    iconClassName: "text-green-500",
  },
};

export const Note: React.FC<NoteProps> = ({
  children,
  type = "info",
  title,
  className = "",
}) => {
  const config = noteConfig[type];
  const Icon = config.icon;

  return (
    <div
      className={`border-l-4 rounded-r-md p-4 my-6 ${config.className} ${className}`}
    >
      <div className="flex gap-3">
        <Icon
          className={`h-5 w-5 mt-0.5 flex-shrink-0 ${config.iconClassName}`}
        />
        <div className="flex-1">
          {title && (
            <div className="font-bold mb-2 text-sm uppercase tracking-wider">
              {title}
            </div>
          )}
          <div className="text-sm leading-6 [&>*]:mb-0 [&>p:not(:last-child)]:mb-2">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
