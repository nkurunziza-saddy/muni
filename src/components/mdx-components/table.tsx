import type { DetailedHTMLProps, HTMLAttributes } from "react";

export function Table(
  props: DetailedHTMLProps<HTMLAttributes<HTMLTableElement>, HTMLTableElement>
) {
  return (
    <div className="overflow-x-auto my-8">
      <table {...props} className={`w-full border-collapse ${props.className || ''}`} />
    </div>
  );
}