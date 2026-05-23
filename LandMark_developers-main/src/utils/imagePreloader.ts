/**
 * imagePreloader.ts — Browser-native image preloading
 *
 * Uses `new Image()` to trigger browser HTTP cache population.
 * - No CORS restrictions (same as using <img src="...">)
 * - Works with cross-origin images
 * - Preloaded images are served from browser HTTP cache when LazyImage renders them
 * - Combined with imageLoadTracker so shimmer is skipped for preloaded images
 */

import { markLoaded } from "./imageLoadTracker";

// Queue of images being preloaded
const preloadQueue = new Set<string>();

/**
 * Preload a single image into the browser HTTP cache.
 * Returns a promise that resolves when loaded (or rejects on error).
 */
export function preloadImage(url: string): Promise<void> {
  if (!url || preloadQueue.has(url)) return Promise.resolve();
  preloadQueue.add(url);

  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      markLoaded(url); // mark as loaded so LazyImage skips shimmer
      resolve();
    };
    img.onerror = () => {
      resolve(); // don't reject — silently skip failed preloads
    };
    img.src = url;
  });
}

/**
 * Preload multiple images in parallel (up to `concurrency` at a time).
 * Lower-index images (higher priority) preload first.
 */
export async function preloadImages(
  urls: string[],
  concurrency = 4
): Promise<void> {
  const valid = urls.filter((u) => u && !preloadQueue.has(u));
  if (valid.length === 0) return;

  // Process in chunks of `concurrency`
  for (let i = 0; i < valid.length; i += concurrency) {
    const chunk = valid.slice(i, i + concurrency);
    await Promise.all(chunk.map(preloadImage));
  }
}

/**
 * Fire-and-forget preload — doesn't block caller.
 * Use for background preloading where you don't need to wait.
 */
export function preloadImagesBackground(urls: string[]): void {
  // Use requestIdleCallback if available so we don't block main thread
  const run = () => preloadImages(urls, 3).catch(() => {/* silent */});

  if ("requestIdleCallback" in window) {
    (window as Window & { requestIdleCallback: (cb: () => void) => void })
      .requestIdleCallback(run);
  } else {
    setTimeout(run, 100);
  }
}
