import type { SoftwareCategory } from "../../content/software.js";

const SITE_URL = "https://www.jimvanduijsen.com";

export const softwareSchema = (categories: SoftwareCategory[]) =>
	JSON.stringify({
		"@context": "https://schema.org",
		"@graph": [
			{
				"@type": "CollectionPage",
				"@id": `${SITE_URL}/software#webpage`,
				url: `${SITE_URL}/software`,
				name: "Software Jim van Duijsen recommends",
			},
			{
				"@type": "ItemList",
				"@id": `${SITE_URL}/software#items`,
				name: "Recommended software",
				itemListElement: categories
					.flatMap((category) => category.items)
					.map((item, index) => ({
						"@type": "ListItem",
						position: index + 1,
						item: {
							"@type": "SoftwareApplication",
							name: item.name,
							url: item.href,
							description: item.description,
						},
					})),
			},
		],
	});
