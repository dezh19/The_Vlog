import { NextResponse } from "next/server";
export const dynamic = "force-static";
export const revalidate = 300;
import { defaultSiteData, SiteData, ContentFeature, Event, Testimony } from "@/lib/data/site-data";
import { normalizeEntity, strapiRequest, StrapiData, getMediaUrls, getFirstMediaUrl } from "@/lib/server/strapi";

type MaybeEntity = Record<string, unknown> & { id: number };

type StrapiEntity = { id: number; attributes?: Record<string, unknown> } & Record<string, unknown>;
type StrapiListResponse = StrapiData<StrapiEntity[]>;
type StrapiSingleResponse = StrapiData<StrapiEntity | null>;
type NamedEntity = Record<string, unknown> & { name?: string };

const HERO_PATH = "/api/hero?populate=*";
const ABOUT_PATH = "/api/about?populate=*";
const FOOTER_PATH = "/api/footer?populate=*";
const BOOKING_PATH = "/api/booking?populate=*";
const CONTENT_FEATURES_PATH = "/api/content-features?pagination[pageSize]=100&sort=sortOrder:asc&populate=*";
const TESTIMONIES_PATH = "/api/testimonies?pagination[pageSize]=100&sort=sortOrder:asc&populate=*";
const EVENTS_PATH = "/api/events?pagination[pageSize]=100&sort=sortOrder:asc&populate=*";

function asString(value: unknown, fallback = ""): string {
  return typeof value === "string" ? value : fallback;
}

function asStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.filter((item): item is string => typeof item === "string");
}

function asObjectArray<T extends Record<string, unknown>>(value: unknown): T[] {
  if (!Array.isArray(value)) return [];
  return value.filter((item): item is T => typeof item === "object" && item !== null);
}

function slugifyLabel(value: string, fallback: string): string {
  const slug = value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return slug || fallback;
}

function fromHeroEntity(entity: MaybeEntity | null): SiteData["hero"] {
  if (!entity) return defaultSiteData.hero;

  return {
    badge: asString(entity.badge, defaultSiteData.hero.badge),
    headline1: asString(entity.headline1, defaultSiteData.hero.headline1),
    headlineAccent: asString(entity.headlineAccent, defaultSiteData.hero.headlineAccent),
    headline2: asString(entity.headline2, defaultSiteData.hero.headline2),
    subheadline: asString(entity.subheadline, defaultSiteData.hero.subheadline),
    ctaPrimary: asString(entity.ctaPrimary, defaultSiteData.hero.ctaPrimary),
    ctaSecondary: asString(entity.ctaSecondary, defaultSiteData.hero.ctaSecondary),
    scripture: {
      text: asString(entity.scriptureText, defaultSiteData.hero.scripture.text),
      reference: asString(entity.scriptureReference, defaultSiteData.hero.scripture.reference),
    },
    stats: asObjectArray<SiteData["hero"]["stats"][number]>(entity.stats),
    mainImage: {
      src: getFirstMediaUrl(entity.mainImage) || defaultSiteData.hero.mainImage.src,
      alt: asString((entity.mainImage as NamedEntity | null)?.name || "", defaultSiteData.hero.mainImage.alt),
    },
    smallImages: getMediaUrls(entity.smallImages).map(src => ({ src, alt: "", tag: "" })),
    liveLabel: asString(entity.liveLabel, defaultSiteData.hero.liveLabel),
  };
}

function fromAboutEntity(entity: MaybeEntity | null): SiteData["about"] {
  if (!entity) return defaultSiteData.about;

  return {
    missionText: asString(entity.missionText, defaultSiteData.about.missionText),
    missionScripture: {
      text: asString(entity.missionScriptureText, defaultSiteData.about.missionScripture.text),
      reference: asString(entity.missionScriptureReference, defaultSiteData.about.missionScripture.reference),
    },
    bodyText: asString(entity.bodyText, defaultSiteData.about.bodyText),
    image: getFirstMediaUrl(entity.image) || defaultSiteData.about.image,
    imageAlt: asString((entity.image as NamedEntity | null)?.name || "", defaultSiteData.about.imageAlt),
    floatStatValue: asString(entity.floatStatValue, defaultSiteData.about.floatStatValue),
    floatStatLabel: asString(entity.floatStatLabel, defaultSiteData.about.floatStatLabel),
    floatStatSub: asString(entity.floatStatSub, defaultSiteData.about.floatStatSub),
    floatSmallValue: asString(entity.floatSmallValue, defaultSiteData.about.floatSmallValue),
    floatSmallLabel: asString(entity.floatSmallLabel, defaultSiteData.about.floatSmallLabel),
    pillars: asObjectArray<SiteData["about"]["pillars"][number]>(entity.pillars),
    stats: asObjectArray<SiteData["about"]["stats"][number]>(entity.stats),
  };
}

function fromFooterEntity(entity: MaybeEntity | null): SiteData["footer"] {
  if (!entity) return defaultSiteData.footer;

  return {
    scriptureOfWeek: {
      text: asString(entity.scriptureOfWeekText, defaultSiteData.footer.scriptureOfWeek.text),
      reference: asString(entity.scriptureOfWeekReference, defaultSiteData.footer.scriptureOfWeek.reference),
    },
    tagline: asString(entity.tagline, defaultSiteData.footer.tagline),
    taglineVerse: asString(entity.taglineVerse, defaultSiteData.footer.taglineVerse),
    description: asString(entity.description, defaultSiteData.footer.description),
  };
}

function fromBookingEntity(entity: MaybeEntity | null): SiteData["bookings"] {
  if (!entity) return defaultSiteData.bookings;

  return {
    types: asObjectArray<SiteData["bookings"]["types"][number]>(entity.types),
    highlights: asStringArray(entity.highlights),
    scripture: {
      text: asString(entity.scriptureText, defaultSiteData.bookings.scripture.text),
      reference: asString(entity.scriptureReference, defaultSiteData.bookings.scripture.reference),
    },
    image: getFirstMediaUrl(entity.image) || defaultSiteData.bookings.image,
    imageAlt: asString((entity.image as NamedEntity | null)?.name || "", defaultSiteData.bookings.imageAlt),
    imageCaption: asString(entity.imageCaption, defaultSiteData.bookings.imageCaption),
  };
}

function fromContentFeatures(list: MaybeEntity[]): ContentFeature[] {
  if (list.length === 0) return defaultSiteData.contentFeatures;

  return list.map((item, index) => ({
    id: asString(item.featureId, slugifyLabel(asString(item.label), `feature-${index + 1}`)),
    label: asString(item.label),
    headline: asString(item.headline),
    description: asString(item.description),
    detail: asString(item.detail),
    video: getFirstMediaUrl(item.video) || "",
    image: getFirstMediaUrl(item.image) || "",
    imageAlt: asString((item.image as NamedEntity | null)?.name || "", ""),
    tag: asString(item.tag),
    highlight: asString(item.highlight),
  }));
}

function fromTestimonies(list: MaybeEntity[]): Testimony[] {
  if (list.length === 0) return defaultSiteData.testimonies;

  return list.map((item) => ({
    id: asString(item.clientId, String(item.id)),
    name: asString(item.name),
    role: asString(item.role),
    quote: asString(item.quote),
    image: getFirstMediaUrl(item.image) || "",
    verse: asString(item.verse),
  }));
}

function fromEvents(list: MaybeEntity[]): Event[] {
  if (list.length === 0) return defaultSiteData.events;

  return list.map((item) => ({
    id: asString(item.clientId, String(item.id)),
    title: asString(item.title),
    date: asString(item.date),
    time: asString(item.time),
    location: asString(item.location),
    description: asString(item.description),
    image: getFirstMediaUrl(item.image) || "",
    imageAlt: asString((item.image as NamedEntity | null)?.name || "", ""),
    badge: asString(item.badge),
    badgeColor: asString(item.badgeColor, "white") === "cyan" ? "cyan" : "white",
    spots: asString(item.spots),
  }));
}

async function getSingle(path: string): Promise<MaybeEntity | null> {
  try {
    const response = await strapiRequest<StrapiSingleResponse>(path);
    return normalizeEntity(response.data);
  } catch (error) {
    // Strapi returns 404 for single types that have not been created yet.
    if (error instanceof Error && /Strapi request failed \(404\)/.test(error.message)) {
      return null;
    }

    throw error;
  }
}

async function getList(path: string): Promise<MaybeEntity[]> {
  const response = await strapiRequest<StrapiListResponse>(path);
  const normalized = response.data
    .map((entity) => normalizeEntity(entity))
    .filter((entity): entity is MaybeEntity => entity !== null);

  return normalized;
}

async function fetchNormalizedSiteData(): Promise<SiteData> {
  const [heroEntity, aboutEntity, footerEntity, bookingEntity, contentFeatureList, testimonyList, eventList] =
    await Promise.all([
      getSingle(HERO_PATH),
      getSingle(ABOUT_PATH),
      getSingle(FOOTER_PATH),
      getSingle(BOOKING_PATH),
      getList(CONTENT_FEATURES_PATH),
      getList(TESTIMONIES_PATH),
      getList(EVENTS_PATH),
    ]);

  return {
    ...defaultSiteData,
    hero: fromHeroEntity(heroEntity),
    about: fromAboutEntity(aboutEntity),
    footer: fromFooterEntity(footerEntity),
    bookings: fromBookingEntity(bookingEntity),
    contentFeatures: fromContentFeatures(contentFeatureList),
    testimonies: fromTestimonies(testimonyList),
    events: fromEvents(eventList),
  };
}

export async function GET() {
  try {
    const data = await fetchNormalizedSiteData();
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch CMS site data, falling back to defaults:", error);
    return NextResponse.json(defaultSiteData, { status: 200 });
  }
}
