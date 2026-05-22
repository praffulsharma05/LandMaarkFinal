import { useState, useEffect, useRef, useCallback } from "react";

interface UseVirtualListOptions {
  /** Number of items to show initially and on each "load more" */
  batchSize?: number;
  /** IntersectionObserver rootMargin — how far ahead to load next batch */
  rootMargin?: string;
}

interface UseVirtualListResult<T> {
  /** Slice of items currently visible */
  visibleItems: T[];
  /** Ref to attach to the sentinel element at the bottom of the list */
  sentinelRef: React.RefObject<HTMLDivElement | null>;
  /** Whether there are more items to reveal */
  hasMore: boolean;
  /** Total items count */
  total: number;
}

/**
 * useVirtualList
 *
 * Reveals list items in batches as the user scrolls, preventing
 * large lists from rendering all DOM nodes at once.
 *
 * Usage:
 * ```tsx
 * const { visibleItems, sentinelRef, hasMore } = useVirtualList(items, { batchSize: 6 });
 * return (
 *   <>
 *     {visibleItems.map(item => <Card key={item.id} item={item} />)}
 *     {hasMore && <div ref={sentinelRef} />}
 *   </>
 * );
 * ```
 */
export function useVirtualList<T>(
  items: T[],
  { batchSize = 6, rootMargin = "400px 0px" }: UseVirtualListOptions = {}
): UseVirtualListResult<T> {
  const [visibleCount, setVisibleCount] = useState(batchSize);
  const sentinelRef = useRef<HTMLDivElement>(null);

  const hasMore = visibleCount < items.length;

  const loadMore = useCallback(() => {
    setVisibleCount((prev) => Math.min(prev + batchSize, items.length));
  }, [batchSize, items.length]);

  // Reset visible count when items array changes (e.g. data refresh)
  useEffect(() => {
    const handle = setTimeout(() => {
      setVisibleCount(batchSize);
    }, 0);
    return () => clearTimeout(handle);
  }, [items.length, batchSize]);

  // IntersectionObserver: when sentinel is in view, load next batch
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel || !hasMore) return;

    if (!("IntersectionObserver" in window)) {
      // Fallback: just show everything
      const handle = setTimeout(() => {
        setVisibleCount(items.length);
      }, 0);
      return () => clearTimeout(handle);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      { rootMargin, threshold: 0 }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [hasMore, loadMore, rootMargin, items.length]);

  return {
    visibleItems: items.slice(0, visibleCount),
    sentinelRef,
    hasMore,
    total: items.length,
  };
}
