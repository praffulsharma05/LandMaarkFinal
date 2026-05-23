import { useEffect, useRef } from "react";

/**
 * usePrefetchOnScroll
 *
 * Fires prefetch callbacks when the user has scrolled past a percentage
 * threshold of the page. Each callback is called only ONCE per page load.
 *
 * Typical use: warm caches for the next page the user is likely to visit
 * (e.g. townships, properties) before they click a link.
 *
 * @param threshold  Fraction of page height to trigger at (0.0–1.0). Default: 0.6
 * @param callbacks  Array of fire-and-forget prefetch functions
 *
 * Usage:
 * ```tsx
 * usePrefetchOnScroll(0.6, [prefetchTownships, prefetchProperties]);
 * ```
 */
export function usePrefetchOnScroll(
  threshold = 0.6,
  callbacks: Array<() => void> = []
): void {
  const firedRef = useRef(false);

  useEffect(() => {
    if (callbacks.length === 0) return;

    const handleScroll = () => {
      if (firedRef.current) return;

      const scrolled = window.scrollY + window.innerHeight;
      const total = document.documentElement.scrollHeight;

      if (scrolled / total >= threshold) {
        firedRef.current = true;
        // Defer to idle time so scroll handler stays fast
        const run = () => callbacks.forEach((cb) => cb());

        if ("requestIdleCallback" in window) {
          (window as Window & { requestIdleCallback: (cb: () => void) => void })
            .requestIdleCallback(run);
        } else {
          setTimeout(run, 100);
        }

        window.removeEventListener("scroll", handleScroll, { capture: false });
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [threshold]);
}
