import { factories } from "@strapi/strapi";
export default factories.createCoreRouter("api::about.about", {
	config: {
		find: { auth: false },
	},
});
