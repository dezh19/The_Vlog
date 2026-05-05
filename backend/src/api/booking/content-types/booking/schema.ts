const schema = {
  kind: "singleType",
  collectionName: "bookings",
  info: {
    singularName: "booking",
    pluralName: "bookings",
    displayName: "Booking",
    description: "Booking section content",
  },
  options: {
    draftAndPublish: true,
  },
  pluginOptions: {},
  attributes: {
    types: {
      type: "json",
    },
    highlights: {
      type: "json",
    },
    scriptureText: {
      type: "text",
    },
    scriptureReference: {
      type: "string",
    },
    image: {
      type: "string",
    },
    imageAlt: {
      type: "string",
    },
    imageCaption: {
      type: "string",
    },
  },
};

export default schema;
