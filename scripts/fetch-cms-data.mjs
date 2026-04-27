import fs from "node:fs/promises";
import path from "node:path";

const projectRoot = process.cwd();
const outputPath = path.join(projectRoot, "public", "cms-data.json");
const fallbackPath = outputPath;

const sourceUrl =
  process.env.CMS_SITE_DATA_URL ||
  process.env.NEXT_PUBLIC_CMS_SITE_DATA_URL ||
  "http://localhost:3000/api/cms/site";

async function readFallbackJson() {
  try {
    const existing = await fs.readFile(fallbackPath, "utf8");
    return JSON.parse(existing);
  } catch {
    return {};
  }
}

async function fetchSourceJson() {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 15000);

  try {
    const response = await fetch(sourceUrl, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(`Request failed (${response.status})`);
    }

    return await response.json();
  } finally {
    clearTimeout(timeoutId);
  }
}

async function main() {
  let data;

  try {
    console.log(`📡 Fetching CMS snapshot from ${sourceUrl} ...`);
    data = await fetchSourceJson();
    console.log("✅ CMS snapshot fetched.");
  } catch (error) {
    console.warn("⚠️  Could not fetch CMS snapshot, reusing fallback file.");
    if (error instanceof Error) {
      console.warn(`   Reason: ${error.message}`);
    }
    data = await readFallbackJson();
  }

  await fs.mkdir(path.dirname(outputPath), { recursive: true });
  await fs.writeFile(outputPath, `${JSON.stringify(data, null, 2)}\n`, "utf8");
  console.log(`📄 Written: ${outputPath}`);
}

main().catch((error) => {
  console.error("❌ Failed to generate cms-data.json", error);
  process.exit(1);
});
