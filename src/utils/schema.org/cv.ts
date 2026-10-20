import { personEntity } from "./entities.js";

const SITE_URL = "https://www.jimvanduijsen.com";

export const cvSchema = JSON.stringify({
	"@context": "https://schema.org",
	"@graph": [
		{
			"@type": "ProfilePage",
			"@id": `${SITE_URL}/cv#webpage`,
			url: `${SITE_URL}/cv`,
			name: "CV of Jim van Duijsen",
			mainEntity: { "@id": personEntity["@id"] },
		},
		personEntity,
	],
});
