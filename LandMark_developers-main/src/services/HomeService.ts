import axios from "axios";
import { ApiConstants } from "../constants/ApiConstants";
import { ApiEndPoints } from "../constants/ApiEndpoints";
import { Section3Item } from "../store/HomePage/Section3";
import { SectionItem } from "../store/HomePage/section";
import { Cards as Section5Item } from "../store/HomePage/Section5Card";
import { Section6Type as Section6Item } from "../store/HomePage/Section6Card";
import { Section7Type as Section7Item } from "../store/HomePage/section7Card";
import { Section8Type as Section8Item } from "../store/HomePage/section8Card";
import { Section9Type as Section9Item } from "../store/HomePage/section9Card";
import { readCache, writeCache, getNetworkAwareTTL, cacheAge, isMobileNetwork } from "../utils/apiCache";

export interface HeroSlide {
  id: number;
  image: string;
  title: string;
  titleHighlight: string;
  subtitle: string;
}

export interface FooterDetails {
  logoText: string;
  locations: Array<{
    city: string;
    address: string;
    phone: string;
  }>;
  socialLinks: Array<{
    platform: string;
    href: string;
  }>;
  websiteUrl: string;
  websiteHref: string;
  copyrightPattern: string;
}

export interface HomepageData {
  showEnquiryForm: boolean;
  hero: {
    title: string;
    slides: HeroSlide[];
  };
  section3: {
    title: string;
    items: Section3Item[];
  };
  section: {
    title: string;
    subtitle: string;
    items: SectionItem[];
  };
  section5: {
    title: string;
    subtitle: string;
    footerText: string;
    items: Section5Item[];
  };
  section6: {
    title: string;
    subtitle: string;
    items: Section6Item[];
  };
  section7: {
    title: string;
    subtitle: string;
    items: Section7Item[];
  };
  section8: {
    title: string;
    subtitle: string;
    videoUrl: string;
    items: Section8Item[];
  };
  section9: {
    title: string;
    items: Section9Item[];
  };
  footer: FooterDetails;
  logoText?: string;
  locations?: Array<{
    city: string;
    address: string;
    phone: string;
  }>;
  socialLinks?: Array<{
    platform: string;
    href: string;
  }>;
  websiteUrl?: string;
  websiteHref?: string;
  copyrightPattern?: string;
}

const CACHE_KEY = "landmaark_homepage_v1";
// Normal TTL: 10 minutes. On slow/2G networks: 30 minutes (avoids wasting data).
const CACHE_TTL_NORMAL_MS = 10 * 60 * 1000;
const CACHE_TTL_MOBILE_MS = 30 * 60 * 1000;

// In-flight promise dedupe (prevents multiple tabs fetching simultaneously)
let inFlightPromise: Promise<HomepageData> | null = null;

// ── Raw network fetch ─────────────────────────────────────────────────────────
async function fetchFromNetwork(): Promise<HomepageData> {
  if (inFlightPromise) return inFlightPromise;

  inFlightPromise = (async () => {
    try {
      const response = await axios.get(
        `${ApiConstants.API_BASE_URL}${ApiEndPoints.HomePageData}`,
        { headers: ApiConstants.HEADERS }
      );
      if (response.data) {
        const data = response.data.data || response.data;
        if (data.footer) {
          if (data.websiteUrl && !data.footer.websiteUrl) {
            data.footer.websiteUrl = data.websiteUrl;
          }
          if (data.websiteHref && !data.footer.websiteHref) {
            data.footer.websiteHref = data.websiteHref;
          }
        }
        return data as HomepageData;
      }
      throw new Error("Empty response from API");
    } finally {
      inFlightPromise = null;
    }
  })();

  return inFlightPromise;
}

// ── Public API: stale-while-revalidate ──────────────────────────────────────────
/**
 * Fetches homepage data with stale-while-revalidate caching:
 *
 *  - INSTANT on revisit: returns cached data from localStorage immediately
 *  - Background refresh: fetches fresh data after cache hit (unless on slow network)
 *  - No spinner on revisit: user sees content instantly, data updates silently
 *  - Mobile-aware: on 2G/slow-2G, extends TTL to 30 min to save data
 *
 * @param onUpdate  Called when fresh data arrives (use to update UI silently)
 */
export async function fetchHomepageData(
  onUpdate?: (fresh: HomepageData) => void
): Promise<HomepageData> {
  // 1. Try localStorage/memory first
  const cached = readCache<HomepageData>(CACHE_KEY);
  const ttlMs = getNetworkAwareTTL(CACHE_TTL_NORMAL_MS, CACHE_TTL_MOBILE_MS);
  const age = cacheAge(CACHE_KEY);
  const isCacheFresh = age < ttlMs;
  const onSlowNetwork = isMobileNetwork();

  if (cached) {
    // Return cached data immediately (no network wait)
    // Skip background refresh if: cache is fresh OR user is on a slow network with recent cache
    const skipRefresh = isCacheFresh || (onSlowNetwork && age < CACHE_TTL_MOBILE_MS);

    if (!skipRefresh) {
      // Refresh in background — don't block user
      fetchFromNetwork()
        .then((fresh) => {
          writeCache(CACHE_KEY, fresh);
          onUpdate?.(fresh); // notify caller of fresh data
        })
        .catch(() => {
          // Network failed — cached data stays, no error shown
        });
    }

    return cached;
  }

  // 2. No cache — must wait for network (first visit)
  try {
    const data = await fetchFromNetwork();
    writeCache(CACHE_KEY, data);
    return data;
  } catch (error) {
    // Clear the cached promise so retry() works
    inFlightPromise = null;
    throw error;
  }
}

// ── Fire-and-forget prefetch ──────────────────────────────────────────────────
/**
 * Silently warms the homepage cache — no UI effects.
 * Call this on page entry to pre-populate cache before the component mounts,
 * or from other pages when the user is likely to navigate back to Home.
 */
export function prefetchHomepageData(): void {
  const existing = readCache<HomepageData>(CACHE_KEY);
  const ttlMs = getNetworkAwareTTL(CACHE_TTL_NORMAL_MS, CACHE_TTL_MOBILE_MS);
  const age = cacheAge(CACHE_KEY);

  // Only prefetch if cache is missing or stale
  if (existing && age < ttlMs) return;

  fetchFromNetwork()
    .then((data) => writeCache(CACHE_KEY, data))
    .catch(() => { /* silent */ });
}
