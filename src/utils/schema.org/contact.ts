import { personEntity } from "./entities.js";

const SITE_URL = "https://www.jimvanduijsen.com";

export const contactSchema = JSON.stringify({
	"@context": "https://schema.org",
	"@graph": [
		{
			"@type": "ContactPage",
			"@id": `${SITE_URL}/contact#webpage`,
			url: `${SITE_URL}/contact`,
			name: "Contact Jim van Duijsen",
			about: { "@id": personEntity["@id"] },
		},
		personEntity,
		{
			"@type": "ContactPoint",
			email: "hello@jimvanduijsen.nl",
			contactType: "business",
			url: `${SITE_URL}/contact`,
		},
	],
});
