import { useState, useEffect } from "react";
import { useLocation } from "@tanstack/react-router";

export function useTableOfContents(
  contentRef: React.RefObject<HTMLElement | null>
) {
  const location = useLocation();
  const [headings, setHeadings] = useState<
    Array<{ id: string; text: string; level: number }>
  >([]);

  useEffect(() => {
    if (!contentRef.current) return;

    const observer = new MutationObserver(() => {
      const headingElements =
        contentRef.current?.querySelectorAll("h2, h3, h4");
      if (headingElements) {
        const newHeadings = Array.from(headingElements).map((heading) => ({
          id:
            heading.id ||
            heading.textContent?.toLowerCase().replace(/\s+/g, "-") ||
            "",
          text: heading.textContent || "",
          level: parseInt(heading.tagName.charAt(1)),
        }));
        setHeadings((currentHeadings) => {
          if (JSON.stringify(currentHeadings) !== JSON.stringify(newHeadings)) {
            return newHeadings;
          }
          return currentHeadings;
        });
      }
    });

    const headingElements = contentRef.current?.querySelectorAll("h2, h3, h4");
    if (headingElements) {
      const initialHeadings = Array.from(headingElements).map((heading) => ({
        id:
          heading.id ||
          heading.textContent?.toLowerCase().replace(/\s+/g, "-") ||
          "",
        text: heading.textContent || "",
        level: parseInt(heading.tagName.charAt(1)),
      }));
      setHeadings(initialHeadings);
    }

    observer.observe(contentRef.current, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, [location.pathname, contentRef]);

  return headings;
}
