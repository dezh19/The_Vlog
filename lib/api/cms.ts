import type { SiteData } from "@/lib/data/site-data";

async function parseJsonResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Request failed (${response.status}): ${text || response.statusText}`);
  }

  return (await response.json()) as T;
}

export async function fetchSiteData(): Promise<SiteData> {
  const response = await fetch("/api/cms/site", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  return parseJsonResponse<SiteData>(response);
}

export async function saveSiteData(data: SiteData): Promise<SiteData> {
  const response = await fetch("/api/cms/site", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return parseJsonResponse<SiteData>(response);
}
