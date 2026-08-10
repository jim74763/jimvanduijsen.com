import {
	havonyxOrgEntity,
	jimvdOrgEntity,
	personEntity,
	websiteEntity,
} from "./entities.js";

export const homeSchema = JSON.stringify({
	"@context": "https://schema.org",
	"@graph": [personEntity, havonyxOrgEntity, jimvdOrgEntity, websiteEntity],
});
