const schema = {
  kind: "collectionType",
  collectionName: "content_features",
  info: {
    singularName: "content-feature",
    pluralName: "content-features",
    displayName: "Content Feature",
    description: "Content feature items (Videos, Blogs, Scriptures, Podcast, etc.)",
  },
  options: {
    draftAndPublish: true,
  },
  pluginOptions: {},
  attributes: {
    featureId: {
      type: "string",
      unique: true,
    },
    label: {
      type: "string",
      required: true,
    },
    headline: {
      type: "string",
      required: true,
    },
    description: {
      type: "text",
    },
    detail: {
      type: "string",
    },
    image: {
      type: "string",
    },
    imageAlt: {
      type: "string",
    },
    tag: {
      type: "string",
    },
    highlight: {
      type: "string",
    },
    sortOrder: {
      type: "integer",
      default: 0,
    },
  },
};

export default schema;
