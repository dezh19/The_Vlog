// ─────────────────────────────────────────────
//  Site Data — Default content for all sections
// ─────────────────────────────────────────────

export interface HeroStat {
  value: string
  label: string
}

export interface HeroData {
  badge: string
  headline1: string
  headlineAccent: string
  headline2: string
  subheadline: string
  ctaPrimary: string
  ctaSecondary: string
  scripture: { text: string; reference: string }
  stats: HeroStat[]
  mainImage: { src: string; alt: string }
  smallImages: { src: string; alt: string; tag: string }[]
  liveLabel: string
}

export interface ContentFeature {
  id: string
  label: string
  headline: string
  description: string
  detail: string
  image: string
  imageAlt: string
  tag: string
  highlight: string
}

export interface Testimony {
  id: string
  name: string
  role: string
  quote: string
  image: string
  verse: string
}

export interface Event {
  id: string
  title: string
  date: string
  time: string
  location: string
  description: string
  image: string
  imageAlt: string
  badge: string
  badgeColor: "cyan" | "white"
  spots: string
}

export interface BookingType {
  id: string
  title: string
  description: string
}

export interface AboutPillar {
  id: string
  title: string
  description: string
}

export interface AboutStat {
  value: string
  label: string
}

export interface SiteData {
  hero: HeroData
  contentFeatures: ContentFeature[]
  testimonies: Testimony[]
  events: Event[]
  bookings: {
    types: BookingType[]
    highlights: string[]
    scripture: { text: string; reference: string }
    image: string
    imageAlt: string
    imageCaption: string
  }
  about: {
    pillars: AboutPillar[]
    stats: AboutStat[]
    missionText: string
    missionScripture: { text: string; reference: string }
    bodyText: string
    image: string
    imageAlt: string
    floatStatValue: string
    floatStatLabel: string
    floatStatSub: string
    floatSmallValue: string
    floatSmallLabel: string
  }
  footer: {
    scriptureOfWeek: { text: string; reference: string }
    tagline: string
    taglineVerse: string
    description: string
  }
}

// ─────────────────────────────────────────────
//  Default Data
// ─────────────────────────────────────────────

export const defaultSiteData: SiteData = {
  hero: {
    badge: "Now Streaming Weekly Christian Content",
    headline1: "Faith.",
    headlineAccent: "Truth.",
    headline2: "Community.",
    subheadline:
      "The Vlog is a platform for Christian content including videos, blogs, scriptures, podcasts, and faith-based news — updated weekly.",
    ctaPrimary: "Explore Content",
    ctaSecondary: "Watch Latest Episode",
    scripture: {
      text: "For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.",
      reference: "John 3:16",
    },
    stats: [
      { value: "200+", label: "Episodes" },
      { value: "50K+", label: "Community" },
      { value: "Weekly", label: "New Content" },
    ],
    mainImage: {
      src: "https://images.unsplash.com/photo-1609101401874-72a3a7a1c08a?w=900&q=85&auto=format&fit=crop",
      alt: "Worship service congregation raising hands in praise during a church gathering",
    },
    smallImages: [
      {
        src: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=500&q=80&auto=format&fit=crop",
        alt: "Open Bible with highlighted scripture passages resting on a wooden table",
        tag: "Scriptures",
      },
      {
        src: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=500&q=80&auto=format&fit=crop",
        alt: "Professional podcast microphone in a home studio recording setup with warm lighting",
        tag: "Podcast",
      },
    ],
    liveLabel: "Live Every Sunday",
  },

  contentFeatures: [
    {
      id: "videos",
      label: "Videos",
      headline: "Weekly Faith-Based Teachings",
      description:
        "Sermons, devotionals, and Christian discussions crafted to deepen your faith and inspire your walk with God. New episodes every Sunday.",
      detail: "50+ series available",
      image:
        "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=700&q=85&auto=format&fit=crop",
      imageAlt:
        "Content creator filming a faith-based video in a well-lit studio with professional camera equipment",
      tag: "New Episode Weekly",
      highlight: "Featured: The Gospel of John — Full Teaching Series",
    },
    {
      id: "blogs",
      label: "Blogs",
      headline: "Thoughtful Christian Insights",
      description:
        "Deep-dive articles, Bible breakdowns, and personal testimonies written to challenge, encourage, and equip believers in everyday life.",
      detail: "120+ articles published",
      image:
        "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=700&q=85&auto=format&fit=crop",
      imageAlt:
        "Person writing in a journal next to an open Bible and a warm cup of coffee at a wooden desk",
      tag: "New Posts Weekly",
      highlight: "Latest: Walking Through Anxiety with Faith",
    },
    {
      id: "scriptures",
      label: "Scriptures",
      headline: "Daily Scripture Highlights",
      description:
        "Verse breakdowns, encouragement messages, and contextual scripture study to keep you grounded in the Word every single day.",
      detail: "365 daily devotionals",
      image:
        "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=700&q=85&auto=format&fit=crop",
      imageAlt:
        "Open Bible with highlighted scripture verses and golden warm light shining across the pages",
      tag: "Daily Verse",
      highlight: "Today: Philippians 4:13 — I can do all things through Christ",
    },
    {
      id: "podcast",
      label: "Podcast",
      headline: "Faith Conversations & Interviews",
      description:
        "Long-form conversations with pastors, Christian leaders, and everyday believers sharing their journeys, testimonies, and biblical insights.",
      detail: "80+ episodes recorded",
      image:
        "https://images.unsplash.com/photo-1590602847861-f357a9332bbc?w=700&q=85&auto=format&fit=crop",
      imageAlt:
        "Professional podcast condenser microphone in a recording studio with warm ambient lighting",
      tag: "New Episode Fridays",
      highlight: "Latest: Leadership in the Kingdom w/ Pastor James",
    },
    {
      id: "news",
      label: "News",
      headline: "Christian Community Updates",
      description:
        "Faith-based global news, church events, and stories of impact from the Christian community — curated to keep you informed and inspired.",
      detail: "Updated every week",
      image:
        "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=700&q=85&auto=format&fit=crop",
      imageAlt:
        "Large church congregation gathered at an outdoor community faith event with raised banners",
      tag: "Weekly Updates",
      highlight: "Breaking: Revival Movement Spreading Across 30 Nations",
    },
  ],

  testimonies: [
    {
      id: "t1",
      name: "Marcus Adeyemi",
      role: "Youth Pastor, Lagos",
      quote:
        "The Vlog transformed how I prepare sermons. The scripture breakdowns gave me fresh perspective on passages I thought I knew inside out.",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80&auto=format&fit=crop&facepad=3&faces=1",
      verse: "Proverbs 27:17",
    },
    {
      id: "t2",
      name: "Amara Wilson",
      role: "College Student, Atlanta",
      quote:
        "As a believer navigating university life, The Vlog became my anchor. The podcast episodes on faith and identity spoke directly to everything I was wrestling with.",
      image:
        "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=200&q=80&auto=format&fit=crop&facepad=3",
      verse: "Isaiah 41:10",
    },
    {
      id: "t3",
      name: "Daniel Okonkwo",
      role: "Church Elder, Abuja",
      quote:
        "We use The Vlog in our midweek Bible study. The depth of teaching combined with the modern format keeps our congregation engaged and hungry for more.",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80&auto=format&fit=crop&facepad=3",
      verse: "2 Timothy 3:16",
    },
    {
      id: "t4",
      name: "Grace Mensah",
      role: "Worship Leader, London",
      quote:
        "I found The Vlog during a difficult season. The consistent, authentic content kept my faith alive when I could barely get out of bed. Truly life-changing.",
      image:
        "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=200&q=80&auto=format&fit=crop&facepad=3",
      verse: "Romans 8:28",
    },
    {
      id: "t5",
      name: "Caleb Thompson",
      role: "Business Owner, Houston",
      quote:
        "The faith-based news section keeps me connected to what God is doing globally. Every week I share articles with my team for morning devotion.",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80&auto=format&fit=crop&facepad=3",
      verse: "Jeremiah 29:11",
    },
    {
      id: "t6",
      name: "Nadia Baptiste",
      role: "Evangelist, Paris",
      quote:
        "The quality of content is unmatched. It feels like a digital church where every believer is welcome. I share it with every new believer I disciple.",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80&auto=format&fit=crop&facepad=3",
      verse: "Matthew 28:19",
    },
  ],

  events: [
    {
      id: "e1",
      title: "Faith Forward Conference 2025",
      date: "March 15–17, 2025",
      time: "9:00 AM – 6:00 PM",
      location: "Atlanta, Georgia",
      description:
        "A three-day gathering for believers hungry for revival. Featuring worship, teaching, and powerful testimonies from across the nation.",
      image:
        "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=700&q=85&auto=format&fit=crop",
      imageAlt:
        "Large conference audience gathered with stage lights at a Christian faith forward event",
      badge: "Featured",
      badgeColor: "cyan",
      spots: "Limited Seats",
    },
    {
      id: "e2",
      title: "The Vlog Live — Youth Night",
      date: "April 5, 2025",
      time: "6:00 PM – 10:00 PM",
      location: "Houston, Texas",
      description:
        "An electric night of worship, spoken word, and the Gospel presented in a fresh, culture-forward way for the next generation.",
      image:
        "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=700&q=85&auto=format&fit=crop",
      imageAlt:
        "Youth worship event with vibrant colorful stage lights and energetic crowd of young people",
      badge: "Youth",
      badgeColor: "white",
      spots: "200 Spots Left",
    },
    {
      id: "e3",
      title: "Women of Purpose Summit",
      date: "May 22–23, 2025",
      time: "10:00 AM – 5:00 PM",
      location: "London, UK",
      description:
        "Empowering women of faith through bold teaching, honest conversation, and a community built on sisterhood and Scripture.",
      image:
        "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=700&q=85&auto=format&fit=crop",
      imageAlt:
        "Women gathered at an elegant conference venue celebrating a faith summit with joyful expressions",
      badge: "Women",
      badgeColor: "white",
      spots: "Selling Fast",
    },
    {
      id: "e4",
      title: "Kingdom Business Leaders Forum",
      date: "June 14, 2025",
      time: "8:00 AM – 4:00 PM",
      location: "Lagos, Nigeria",
      description:
        "Where faith meets the marketplace. A forum for Christian entrepreneurs, executives, and leaders to integrate faith into their professional lives.",
      image:
        "https://images.unsplash.com/photo-1556761175-4b46a572b786?w=700&q=85&auto=format&fit=crop",
      imageAlt:
        "Business professionals networking at a modern leadership forum in a conference venue",
      badge: "Leadership",
      badgeColor: "white",
      spots: "Open Registration",
    },
  ],

  bookings: {
    types: [
      {
        id: "b1",
        title: "Speaking Engagements",
        description:
          "Invite The Vlog team to speak at your conference, seminar, or special service with a message tailored to your audience.",
      },
      {
        id: "b2",
        title: "Church Events",
        description:
          "Partner with us for Sunday services, special ministry nights, anniversary celebrations, or revival meetings.",
      },
      {
        id: "b3",
        title: "Youth Gatherings",
        description:
          "We specialize in reaching the next generation. Book The Vlog for youth camps, retreats, and school outreach programs.",
      },
      {
        id: "b4",
        title: "Conferences",
        description:
          "Our team brings energy, depth, and clarity to large multi-day gatherings and major ministry conferences.",
      },
    ],
    highlights: [
      "Available for local and international bookings",
      "Customized messages for your specific theme",
      "Media team included for livestream support",
      "Experience with congregations of all sizes",
      "Bilingual availability upon request",
    ],
    scripture: {
      text: "Preach the word; be ready in season and out of season...",
      reference: "2 Timothy 4:2",
    },
    image:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=85&auto=format&fit=crop",
    imageAlt:
      "Christian speaker addressing a large attentive congregation from a stage with professional lighting",
    imageCaption: "Trusted by churches and ministries across 30+ nations",
  },

  about: {
    pillars: [
      {
        id: "p1",
        title: "Gospel-Centered",
        description:
          "Every piece of content is anchored in the truth of Scripture and the person of Jesus Christ.",
      },
      {
        id: "p2",
        title: "Globally Accessible",
        description:
          "Free, digital-first content that reaches believers and seekers in every nation and timezone.",
      },
      {
        id: "p3",
        title: "Culturally Relevant",
        description:
          "Modern formats — video, podcast, blog — that meet the next generation where they actually are.",
      },
      {
        id: "p4",
        title: "Community Driven",
        description:
          "Built around a growing family of believers who share, engage, and encourage one another daily.",
      },
    ],
    stats: [
      { value: "7+", label: "Years of Ministry" },
      { value: "50K+", label: "Lives Impacted" },
      { value: "30+", label: "Nations Reached" },
    ],
    missionText:
      "The Vlog exists to spread the Gospel through digital media, weekly teachings, and authentic Christian storytelling.",
    missionScripture: { text: "Our Mission", reference: "Our Mission" },
    bodyText:
      "Founded in 2017, The Vlog began as a simple camera and a conviction to share truth online. Today it is a full-scale Christian media platform trusted by believers across six continents, producing weekly content that teaches, encourages, and challenges the global church.",
    image:
      "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?w=800&q=85&auto=format&fit=crop",
    imageAlt:
      "Person holding an open Bible with warm sunlight streaming through a stained glass church window",
    floatStatValue: "7+ Years",
    floatStatLabel: "of Digital Ministry",
    floatStatSub: "",
    floatSmallValue: "50,000+",
    floatSmallLabel: "Lives Impacted",
  },

  footer: {
    scriptureOfWeek: {
      text: "Trust in the Lord with all your heart and lean not on your own understanding; in all your ways submit to him, and he will make your paths straight.",
      reference: "Proverbs 3:5–6",
    },
    tagline: "Spreading the Gospel",
    taglineVerse: "John 3:16",
    description:
      "A Christian media platform spreading the Gospel through digital content — weekly videos, podcasts, blogs, and more.",
  },
}
