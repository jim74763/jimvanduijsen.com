import type { AboutItem } from "../../content/about.js";
import { personEntity } from "./entities.js";

const SITE_URL = "https://www.jimvanduijsen.com";

export const aboutSchema = (projects: AboutItem[]) =>
	JSON.stringify({
		"@context": "https://schema.org",
		"@graph": [
			{
				"@type": "ProfilePage",
				"@id": `${SITE_URL}/about#webpage`,
				url: `${SITE_URL}/about`,
				name: "About Jim van Duijsen",
				mainEntity: { "@id": personEntity["@id"] },
			},
			personEntity,
			{
				"@type": "ItemList",
				"@id": `${SITE_URL}/about#projects`,
				name: "Featured projects by Jim van Duijsen",
				itemListElement: projects.map((project, index) => ({
					"@type": "ListItem",
					position: index + 1,
					item: {
						"@type": "CreativeWork",
						name: project.title,
						...(project.link ? { url: project.link } : {}),
					},
				})),
			},
		],
	});
