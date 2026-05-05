const schema = {
  kind: "singleType",
  collectionName: "abouts",
  info: {
    singularName: "about",
    pluralName: "abouts",
    displayName: "About",
    description: "About section content",
  },
  options: {
    draftAndPublish: true,
  },
  pluginOptions: {},
  attributes: {
    missionText: {
      type: "text",
    },
    missionScriptureText: {
      type: "text",
    },
    missionScriptureReference: {
      type: "string",
    },
    bodyText: {
      type: "text",
    },
    image: {
      type: "string",
    },
    imageAlt: {
      type: "string",
    },
    floatStatValue: {
      type: "string",
    },
    floatStatLabel: {
      type: "string",
    },
    floatStatSub: {
      type: "string",
    },
    floatSmallValue: {
      type: "string",
    },
    floatSmallLabel: {
      type: "string",
    },
    pillars: {
      type: "json",
    },
    stats: {
      type: "json",
    },
  },
};

export default schema;