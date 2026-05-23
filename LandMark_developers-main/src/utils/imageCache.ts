/**
 * imageCache.ts
 *
 * Global in-memory image cache.
 * - First load: fetches the image as a Blob → converts to object URL → stores in Map
 * - Subsequent loads: returns the cached object URL instantly (0 network requests)
 * - Multiple components requesting the same URL share ONE in-flight fetch (deduplication)
 * - Object URLs live for the duration of the browser tab session
 */

// Map<originalUrl, blobObjectUrl>
const cache = new Map<string, string>();

// Map<originalUrl, in-flight Promise> — prevents duplicate fetches
const pending = new Map<string, Promise<string>>();

/**
 * Fetches an image URL and returns a stable blob object URL.
 * Subsequent calls with the same URL resolve instantly from the cache.
 */
export async function preloadImage(url: string): Promise<string> {
  // 1. Already cached → instant return
  if (cache.has(url)) {
    return cache.get(url)!;
  }

  // 2. Already fetching → return the same promise (no duplicate requests)
  if (pending.has(url)) {
    return pending.get(url)!;
  }

  // 3. New fetch
  const fetchPromise = fetch(url, { cache: "force-cache" })
    .then((res) => {
      if (!res.ok) throw new Error(`Failed to load image: ${url}`);
      return res.blob();
    })
    .then((blob) => {
      const objectUrl = URL.createObjectURL(blob);
      cache.set(url, objectUrl);
      pending.delete(url);
      return objectUrl;
    })
    .catch((err) => {
      pending.delete(url);
      throw err;
    });

  pending.set(url, fetchPromise);
  return fetchPromise;
}

/**
 * Returns the cached blob URL synchronously, or null if not yet cached.
 * Useful for checking before rendering.
 */
export function getCachedImage(url: string): string | null {
  return cache.get(url) ?? null;
}

/**
 * Preload a list of URLs in the background (e.g. on page mount).
 */
export function preloadImages(urls: string[]): void {
  urls.forEach((url) => {
    if (url && !cache.has(url)) {
      preloadImage(url).catch(() => {
        // silently ignore preload errors
      });
    }
  });
}
