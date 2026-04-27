import type { SiteData } from "@/lib/data/site-data";

const deployTarget = process.env.NEXT_PUBLIC_DEPLOY_TARGET;
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
const cmsBridgeBaseUrl = (process.env.NEXT_PUBLIC_CMS_BRIDGE_URL || "").replace(/\/$/, "");

function getCmsSiteEndpoint(): string {
  return cmsBridgeBaseUrl ? `${cmsBridgeBaseUrl}/api/cms/site` : withBasePath("/api/cms/site");
}

function withBasePath(path: string): string {
  return `${basePath}${path}`;
}

async function fetchCmsJsonFile(): Promise<SiteData> {
  const response = await fetch(withBasePath("/cms-data.json"), {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  });

  return parseJsonResponse<SiteData>(response);
}

async function parseJsonResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Request failed (${response.status}): ${text || response.statusText}`);
  }

  return (await response.json()) as T;
}

export async function fetchSiteData(): Promise<SiteData> {
  if (deployTarget === "github") {
    if (cmsBridgeBaseUrl) {
      try {
        const response = await fetch(getCmsSiteEndpoint(), {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          cache: "no-store",
        });

        return parseJsonResponse<SiteData>(response);
      } catch {
        return fetchCmsJsonFile();
      }
    }

    return fetchCmsJsonFile();
  }

  try {
    const response = await fetch(getCmsSiteEndpoint(), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    return parseJsonResponse<SiteData>(response);
  } catch {
    return fetchCmsJsonFile();
  }
}

export async function saveSiteData(data: SiteData): Promise<SiteData> {
  if (deployTarget === "github") {
    if (!cmsBridgeBaseUrl) {
      throw new Error(
        "CMS editing on GitHub Pages requires NEXT_PUBLIC_CMS_BRIDGE_URL to point to your live CMS API bridge."
      );
    }
  }

  const response = await fetch(getCmsSiteEndpoint(), {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return parseJsonResponse<SiteData>(response);
}
