type StrapiData<T> = { data: T };

type StrapiListEntity = { id: number; attributes?: Record<string, unknown> } & Record<string, unknown>;

const STRAPI_BASE_URL = (process.env.STRAPI_URL || process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337").replace(/\/+$/, "");
const RAW_STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN?.trim();
const STRAPI_API_TOKEN =
  RAW_STRAPI_API_TOKEN &&
  !/^replace-with/i.test(RAW_STRAPI_API_TOKEN) &&
  RAW_STRAPI_API_TOKEN.toLowerCase() !== "change-me"
    ? RAW_STRAPI_API_TOKEN
    : undefined;

function buildHeaders(extra?: HeadersInit): Headers {
  const headers = new Headers(extra);

  headers.set("Content-Type", "application/json");

  // For development, we may not have a valid token
  // This allows the CMS API to work in development mode
  // In production, ensure STRAPI_API_TOKEN is properly configured
  if (STRAPI_API_TOKEN) {
    headers.set("Authorization", `Bearer ${STRAPI_API_TOKEN}`);
  }

  return headers;
}

export async function strapiRequest<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${STRAPI_BASE_URL}${path}`, {
    ...init,
    headers: buildHeaders(init?.headers),
    cache: "no-store",
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Strapi request failed (${response.status}) ${path}: ${errorText || response.statusText}`);
  }

  return (await response.json()) as T;
}

export function normalizeEntity<T extends Record<string, unknown>>(entity: StrapiListEntity | null | undefined): (T & { id: number }) | null {
  if (!entity || typeof entity !== "object") return null;

  if (entity.attributes && typeof entity.attributes === "object") {
    return {
      id: Number(entity.id),
      ...(entity.attributes as T),
    };
  }

  const { id, ...rest } = entity;

  return {
    id: Number(id),
    ...(rest as T),
  };
}

export type { StrapiData };

export interface StrapiMediaObject {
  id?: number;
  name?: string;
  url?: string;
  width?: number;
  height?: number;
  mime?: string;
  size?: number;
}

/**
 * Build full URL for a Strapi media object
 * Handles both relative paths and absolute URLs
 */
export function getMediaUrl(media: unknown): string {
  if (!media || typeof media !== "object") return "";

  const mediaObj = media as Record<string, unknown>;
  let url = mediaObj.url;

  if (typeof url !== "string") return "";

  // If relative path, prepend Strapi base URL
  if (url.startsWith("/")) {
    return `${STRAPI_BASE_URL}${url}`;
  }

  // If already absolute, return as-is
  if (url.startsWith("http")) {
    return url;
  }

  return "";
}

/**
 * Extract media URLs from single or array of media
 */
export function getMediaUrls(media: unknown | unknown[]): string[] {
  if (Array.isArray(media)) {
    return media.map(getMediaUrl).filter(Boolean);
  }
  const url = getMediaUrl(media);
  return url ? [url] : [];
}

/**
 * Get first media URL (useful for single media fields)
 */
export function getFirstMediaUrl(media: unknown | unknown[]): string {
  const urls = getMediaUrls(media);
  return urls[0] || "";
}
