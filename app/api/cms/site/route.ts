import { NextResponse } from "next/server";
import { defaultSiteData, SiteData, ContentFeature, Event, Testimony } from "@/lib/data/site-data";
import { normalizeEntity, strapiRequest, StrapiData } from "@/lib/server/strapi";

type MaybeEntity = Record<string, unknown> & { id: number };

type StrapiListResponse = StrapiData<Array<Record<string, unknown>>>;
type StrapiSingleResponse = StrapiData<Record<string, unknown> | null>;

const CONTENT_FEATURES_PATH = "/api/content-features?pagination[pageSize]=100&sort=sortOrder:asc";
const TESTIMONIES_PATH = "/api/testimonies?pagination[pageSize]=100&sort=sortOrder:asc";
const EVENTS_PATH = "/api/events?pagination[pageSize]=100&sort=sortOrder:asc";

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

function toHeroPayload(hero: SiteData["hero"]) {
  return {
    badge: hero.badge,
    headline1: hero.headline1,
    headlineAccent: hero.headlineAccent,
    headline2: hero.headline2,
    subheadline: hero.subheadline,
    ctaPrimary: hero.ctaPrimary,
    ctaSecondary: hero.ctaSecondary,
    scriptureText: hero.scripture.text,
    scriptureReference: hero.scripture.reference,
    stats: hero.stats,
    mainImageSrc: hero.mainImage.src,
    mainImageAlt: hero.mainImage.alt,
    smallImages: hero.smallImages,
    liveLabel: hero.liveLabel,
  };
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
      src: asString(entity.mainImageSrc, defaultSiteData.hero.mainImage.src),
      alt: asString(entity.mainImageAlt, defaultSiteData.hero.mainImage.alt),
    },
    smallImages: asObjectArray<SiteData["hero"]["smallImages"][number]>(entity.smallImages),
    liveLabel: asString(entity.liveLabel, defaultSiteData.hero.liveLabel),
  };
}

function toAboutPayload(about: SiteData["about"]) {
  return {
    missionText: about.missionText,
    missionScriptureText: about.missionScripture.text,
    missionScriptureReference: about.missionScripture.reference,
    bodyText: about.bodyText,
    image: about.image,
    imageAlt: about.imageAlt,
    floatStatValue: about.floatStatValue,
    floatStatLabel: about.floatStatLabel,
    floatStatSub: about.floatStatSub,
    floatSmallValue: about.floatSmallValue,
    floatSmallLabel: about.floatSmallLabel,
    pillars: about.pillars,
    stats: about.stats,
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
    image: asString(entity.image, defaultSiteData.about.image),
    imageAlt: asString(entity.imageAlt, defaultSiteData.about.imageAlt),
    floatStatValue: asString(entity.floatStatValue, defaultSiteData.about.floatStatValue),
    floatStatLabel: asString(entity.floatStatLabel, defaultSiteData.about.floatStatLabel),
    floatStatSub: asString(entity.floatStatSub, defaultSiteData.about.floatStatSub),
    floatSmallValue: asString(entity.floatSmallValue, defaultSiteData.about.floatSmallValue),
    floatSmallLabel: asString(entity.floatSmallLabel, defaultSiteData.about.floatSmallLabel),
    pillars: asObjectArray<SiteData["about"]["pillars"][number]>(entity.pillars),
    stats: asObjectArray<SiteData["about"]["stats"][number]>(entity.stats),
  };
}

function toFooterPayload(footer: SiteData["footer"]) {
  return {
    scriptureOfWeekText: footer.scriptureOfWeek.text,
    scriptureOfWeekReference: footer.scriptureOfWeek.reference,
    tagline: footer.tagline,
    taglineVerse: footer.taglineVerse,
    description: footer.description,
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

function toBookingPayload(bookings: SiteData["bookings"]) {
  return {
    types: bookings.types,
    highlights: bookings.highlights,
    scriptureText: bookings.scripture.text,
    scriptureReference: bookings.scripture.reference,
    image: bookings.image,
    imageAlt: bookings.imageAlt,
    imageCaption: bookings.imageCaption,
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
    image: asString(entity.image, defaultSiteData.bookings.image),
    imageAlt: asString(entity.imageAlt, defaultSiteData.bookings.imageAlt),
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
    image: asString(item.image),
    imageAlt: asString(item.imageAlt),
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
    image: asString(item.image),
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
    image: asString(item.image),
    imageAlt: asString(item.imageAlt),
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
    .map((entity) => normalizeEntity(entity as Record<string, unknown>))
    .filter((entity): entity is MaybeEntity => entity !== null);

  return normalized;
}

async function saveSingle(path: string, payload: Record<string, unknown>) {
  await strapiRequest(path, {
    method: "PUT",
    body: JSON.stringify({ data: payload }),
  });
}

async function upsertCollectionByKey(
  collectionPath: string,
  incoming: Array<Record<string, unknown>>,
  getStableKey: (entry: Record<string, unknown>) => string
) {
  const existing = await getList(`${collectionPath}?pagination[pageSize]=100`);
  const existingByKey = new Map(existing.map((entry) => [getStableKey(entry), entry]));
  const incomingKeys = new Set<string>();

  for (let index = 0; index < incoming.length; index += 1) {
    const entry = incoming[index];
    const key = getStableKey(entry);
    incomingKeys.add(key);

    const current = existingByKey.get(key);

    if (current) {
      await strapiRequest(`${collectionPath}/${current.id}`, {
        method: "PUT",
        body: JSON.stringify({ data: entry }),
      });
    } else {
      await strapiRequest(collectionPath, {
        method: "POST",
        body: JSON.stringify({ data: entry }),
      });
    }
  }

  for (const oldEntry of existing) {
    const key = getStableKey(oldEntry);
    if (!incomingKeys.has(key)) {
      await strapiRequest(`${collectionPath}/${oldEntry.id}`, {
        method: "DELETE",
      });
    }
  }
}

async function fetchNormalizedSiteData(): Promise<SiteData> {
  const [heroEntity, aboutEntity, footerEntity, bookingEntity, contentFeatureList, testimonyList, eventList] =
    await Promise.all([
      getSingle("/api/hero"),
      getSingle("/api/about"),
      getSingle("/api/footer"),
      getSingle("/api/booking"),
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
    console.error("Failed to fetch CMS site data:", error);
    return NextResponse.json({ message: "Failed to fetch site data" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const payload = (await request.json()) as SiteData;

    await saveSingle("/api/hero", toHeroPayload(payload.hero));
    await saveSingle("/api/about", toAboutPayload(payload.about));
    await saveSingle("/api/footer", toFooterPayload(payload.footer));
    await saveSingle("/api/booking", toBookingPayload(payload.bookings));

    await upsertCollectionByKey(
      "/api/content-features",
      payload.contentFeatures.map((item, index) => ({
        featureId: item.id,
        label: item.label,
        headline: item.headline,
        description: item.description,
        detail: item.detail,
        image: item.image,
        imageAlt: item.imageAlt,
        tag: item.tag,
        highlight: item.highlight,
        sortOrder: index,
      })),
      (entry) => asString(entry.featureId)
    );

    await upsertCollectionByKey(
      "/api/testimonies",
      payload.testimonies.map((item, index) => ({
        clientId: item.id,
        name: item.name,
        role: item.role,
        quote: item.quote,
        image: item.image,
        verse: item.verse,
        sortOrder: index,
      })),
      (entry) => asString(entry.clientId)
    );

    await upsertCollectionByKey(
      "/api/events",
      payload.events.map((item, index) => ({
        clientId: item.id,
        title: item.title,
        date: item.date,
        time: item.time,
        location: item.location,
        description: item.description,
        image: item.image,
        imageAlt: item.imageAlt,
        badge: item.badge,
        badgeColor: item.badgeColor,
        spots: item.spots,
        sortOrder: index,
      })),
      (entry) => asString(entry.clientId)
    );

    const nextData = await fetchNormalizedSiteData();
    return NextResponse.json(nextData, { status: 200 });
  } catch (error) {
    console.error("Failed to update CMS site data:", error);
    return NextResponse.json({ message: "Failed to update site data" }, { status: 500 });
  }
}
