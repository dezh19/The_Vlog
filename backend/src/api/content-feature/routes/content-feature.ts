import { factories } from "@strapi/strapi";
export default factories.createCoreRouter("api::content-feature.content-feature", {
	config: {
		find: { auth: false },
		findOne: { auth: false },
	},
});
