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
