const schema = {
  kind: "singleType",
  collectionName: "footers",
  info: {
    singularName: "footer",
    pluralName: "footers",
    displayName: "Footer",
    description: "Footer section content",
  },
  options: {
    draftAndPublish: true,
  },
  pluginOptions: {},
  attributes: {
    scriptureOfWeekText: {
      type: "text",
    },
    scriptureOfWeekReference: {
      type: "string",
    },
    tagline: {
      type: "string",
    },
    taglineVerse: {
      type: "string",
    },
    description: {
      type: "text",
    },
  },
};

export default schema;
