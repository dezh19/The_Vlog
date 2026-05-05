const schema = {
  kind: "singleType",
  collectionName: "heros",
  info: {
    singularName: "hero",
    pluralName: "heros",
    displayName: "Hero",
    description: "Hero section content",
  },
  options: {
    draftAndPublish: true,
  },
  pluginOptions: {},
  attributes: {
    badge: {
      type: "string",
    },
    headline1: {
      type: "string",
    },
    headlineAccent: {
      type: "string",
    },
    headline2: {
      type: "string",
    },
    subheadline: {
      type: "text",
    },
    ctaPrimary: {
      type: "string",
    },
    ctaSecondary: {
      type: "string",
    },
    scriptureText: {
      type: "text",
    },
    scriptureReference: {
      type: "string",
    },
    stats: {
      type: "json",
    },
    mainImageSrc: {
      type: "string",
    },
    mainImageAlt: {
      type: "string",
    },
    smallImages: {
      type: "json",
    },
    liveLabel: {
      type: "string",
    },
  },
};

export default schema;
