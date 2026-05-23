/**
 * apiCache.ts — Stale-While-Revalidate localStorage + in-memory cache
 *
 * Strategy:
 *  1. First visit        → fetch from network, save to localStorage + memory, show data
 *  2. Revisit (< TTL)    → return memory/localStorage instantly, fetch fresh in background
 *  3. Revisit (> TTL)    → return stale cache (no spinner!), refresh in background
 *  4. localStorage miss  → fetch from network (first visit / cleared cache)
 *  5. Slow 2G network    → extend TTL to 30 min, skip background revalidation
 *
 * This eliminates the loading spinner on every revisit.
 */

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  version: number;
}

const CACHE_VERSION = 1;

// ── In-memory runtime cache (avoids JSON.parse on every read) ────────────────
const memoryCache = new Map<string, unknown>();

// ── Network Information API detection ────────────────────────────────────────
type Connection = { effectiveType?: string; saveData?: boolean };

/**
 * Returns true when the user is on a slow mobile network (2G / slow-2G)
 * or has "Data Saver" mode enabled.
 */
export function isMobileNetwork(): boolean {
  try {
    const nav = navigator as Navigator & { connection?: Connection };
    const conn = nav.connection;
    if (!conn) return false;
    if (conn.saveData) return true;
    return conn.effectiveType === '2g' || conn.effectiveType === 'slow-2g';
  } catch {
    return false;
  }
}

/**
 * Returns the appropriate TTL for the current network:
 * - Slow/2G: 30 minutes (avoid unnecessary re-fetches)
 * - Normal:  5 minutes
 */
export function getNetworkAwareTTL(
  normalTtlMs = 5 * 60 * 1000,
  mobileTtlMs = 30 * 60 * 1000
): number {
  return isMobileNetwork() ? mobileTtlMs : normalTtlMs;
}

// ── Read from localStorage (with in-memory fast path) ───────────────────────
export function readCache<T>(key: string): T | null {
  // 1. In-memory hit → zero-cost, no JSON.parse
  if (memoryCache.has(key)) {
    return memoryCache.get(key) as T;
  }

  // 2. localStorage fallback
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    const entry: CacheEntry<T> = JSON.parse(raw);
    if (entry.version !== CACHE_VERSION) return null; // version mismatch → ignore
    // Warm the in-memory cache for next read
    memoryCache.set(key, entry.data);
    return entry.data;
  } catch {
    return null;
  }
}

// ── Write to localStorage + memory ───────────────────────────────────────────
export function writeCache<T>(key: string, data: T): void {
  // Always update in-memory cache
  memoryCache.set(key, data);

  try {
    const entry: CacheEntry<T> = {
      data,
      timestamp: Date.now(),
      version: CACHE_VERSION,
    };
    localStorage.setItem(key, JSON.stringify(entry));
  } catch {
    // localStorage might be full — silently skip
  }
}

// ── Age of cache entry in ms ──────────────────────────────────────────────────
export function cacheAge(key: string): number {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return Infinity;
    const entry: CacheEntry<unknown> = JSON.parse(raw);
    return Date.now() - entry.timestamp;
  } catch {
    return Infinity;
  }
}

// ── Clear a single key (both memory + localStorage) ──────────────────────────
export function clearCache(key: string): void {
  memoryCache.delete(key);
  localStorage.removeItem(key);
}

// ── Cache info for debugging and TTL decisions ────────────────────────────────
export interface CacheInfo {
  exists: boolean;
  ageMs: number;
  remainingMs: (ttlMs: number) => number;
  isStale: (ttlMs: number) => boolean;
  fromMemory: boolean;
}

export function getCacheInfo(key: string): CacheInfo {
  const fromMemory = memoryCache.has(key);
  const ageMs = cacheAge(key);
  return {
    exists: ageMs !== Infinity,
    ageMs,
    remainingMs: (ttlMs: number) => Math.max(0, ttlMs - ageMs),
    isStale: (ttlMs: number) => ageMs > ttlMs,
    fromMemory,
  };
}

/**
 * staleWhileRevalidate
 *
 * Returns cached data immediately (if available), then fetches fresh data
 * in the background. Both the cached AND fresh data are delivered via `onData`.
 *
 * @param key          - localStorage cache key
 * @param fetcher      - async function to fetch fresh data
 * @param onData       - called with data (may be called twice: cache then fresh)
 * @param onError      - called if BOTH cache miss AND fetch fail
 * @param ttlMs        - if cache is older than this, also show loading on first call
 *                       (default: Infinity = always use stale, never block on network)
 */
export async function staleWhileRevalidate<T>(
  key: string,
  fetcher: () => Promise<T>,
  onData: (data: T, fromCache: boolean) => void,
  onError: (err: unknown) => void,
  ttlMs = Infinity
): Promise<void> {
  const cached = readCache<T>(key);
  const age = cacheAge(key);

  if (cached !== null) {
    // Deliver stale data immediately — no spinner
    onData(cached, true);

    if (age < ttlMs) {
      // Cache is fresh enough — skip background refresh
      return;
    }
  }

  // Fetch fresh data (background refresh or first load)
  try {
    const fresh = await fetcher();
    writeCache(key, fresh);
    onData(fresh, false);
  } catch (err) {
    if (cached === null) {
      // No cached fallback → surface the error
      onError(err);
    }
    // If we had cached data, stay silent — user already sees content
  }
}
