import { type ReactNode } from "react";
import { Step } from "../muni-components/step";
import { Steps as Steps_ } from "../muni-components/steps";

export function Steps({ children }: { children: ReactNode }) {
  if (!Array.isArray(children)) return null;
  return (
    <Steps_>
      {children.map(({ props }, i) => {
        const [title, ...children] = Array.isArray(props.children)
          ? props.children
          : [props.children];
        return (
          <Step key={i} title={title} step={i + 1}>
            {children}
          </Step>
        );
      })}
    </Steps_>
  );
}
