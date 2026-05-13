export const homeSchema = JSON.stringify({
	"@context": "https://schema.org",
	"@graph": [
		{
			"@type": "Person",
			"@id": "https://www.jimvanduijsen.com/#person",
			name: "Jim van Duijsen",
			url: "https://www.jimvanduijsen.com",
			jobTitle: "AI Agent Developer & Freelance Web Developer",
			description:
				"Jim van Duijsen builds custom AI agents and automation workflows for businesses. Founder of TJB AI and Jimvd Web Agency.",
			sameAs: [
				"https://www.linkedin.com/in/jim-van-duijsen",
				"https://twitter.com/p35555481",
				"https://www.instagram.com/jim_p5456",
				"https://jimvd.xyz",
			],
		},
		{
			"@type": "WebSite",
			"@id": "https://www.jimvanduijsen.com/#website",
			url: "https://www.jimvanduijsen.com",
			name: "Jim van Duijsen",
			publisher: { "@id": "https://www.jimvanduijsen.com/#person" },
		},
	],
});
