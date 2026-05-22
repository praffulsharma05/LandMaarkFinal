/**
 * imageLoadTracker.ts
 *
 * Tracks which image URLs have already been loaded into the browser.
 * Once an image is loaded, its URL is stored in this Set so that
 * when the component re-renders (e.g. scroll back up), it skips
 * the shimmer and renders instantly.
 *
 * Works WITH the browser's native HTTP cache — no CORS issues,
 * no blob URLs, no cross-origin fetch needed.
 */

const loadedSet = new Set<string>();

export function markLoaded(url: string): void {
  loadedSet.add(url);
}

export function isLoaded(url: string): boolean {
  return loadedSet.has(url);
}
