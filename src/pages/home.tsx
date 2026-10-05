import { JsonLd } from "../components/json-ld.js";
import { footerLinks, footerMetaItems } from "../content/footer.js";
import {
	contactEmail,
	deskItems,
	links,
	profileImage,
	socials,
} from "../content/home.js";
import { renderPage } from "../utils/document.js";
import { homeSchema } from "../utils/schema.org/home.js";

const chips = [
	{ view: "desk", label: "Projects" },
	{ view: "shelf", label: "Experience" },
	{ view: "west", label: "Experiments" },
	{ view: "east", label: "About" },
	{ view: "south", label: "Contact" },
];

// Runs in <head> so the right view shows from the first paint: phones start on plain HTML, desktops on the 3D desk.
const modeScript = `(function(){var m;try{m=localStorage.getItem("homeMode")}catch(e){}if(m!=="simple"&&m!=="3d")m=matchMedia("(max-width:700px),(pointer:coarse) and (max-width:1024px)").matches?"simple":"3d";document.documentElement.setAttribute("data-mode",m)})()`;

const siteNav = [
	{ label: "About", href: "/about" },
	{ label: "Software", href: "/software" },
	{ label: "Contact", href: "/contact" },
];

// Keep "<" out of the inline JSON so the content can never close the script tag.
const deskContentJson = JSON.stringify({ items: deskItems }).replace(
	/</g,
	"\\u003c",
);

export default function DeskHomePage() {
	return (
		<main>
			<JsonLd schema={homeSchema} />

			<canvas
				id="c"
				tabIndex={0}
				aria-label="Interactive 3D desk. Drag to look around, tap an object to pick it up."
			/>

			<header className="hud">
				<h1>Jim van Duijsen</h1>
				<p>AI agents · Websites · Freelance</p>
			</header>

			<div className="topbar">
				<nav className="topnav" aria-label="Pages">
					{siteNav.map((link) => (
						<a key={link.href} href={link.href}>
							{link.label}
						</a>
					))}
				</nav>
				<button type="button" className="modeswitch" id="modeSwitch">
					<span className="to-simple">Simple view</span>
					<span className="to-3d">3D view</span>
				</button>
			</div>

			<div className="hint" id="hint">
				Drag to look around. Tap an object to pick it up.
			</div>

			<div className="dock" id="chips">
				<nav className="chiprow" aria-label="Jump to a part of the room">
					{chips.map((chip) => (
						<button
							key={chip.view}
							type="button"
							className="chip"
							data-view={chip.view}
						>
							{chip.label}
						</button>
					))}
				</nav>
				<p className="legal">
					{footerLinks
						.filter((link) => !link.href.startsWith("mailto:"))
						.map((link) => (
							<a key={link.label} href={link.href}>
								{link.label}
							</a>
						))}
					{footerMetaItems.map((item) => (
						<span key={item.label}>{item.label}</span>
					))}
				</p>
			</div>

			<div className="tip" id="tip" hidden />

			<aside className="panel" id="panel" hidden aria-live="polite">
				<div className="tag" id="pTag" />
				<h2 id="pTitle">Item</h2>
				<p id="pText" />
				<div className="extra" id="pExtra" />
				<div className="row">
					<button type="button" className="btn primary" id="back">
						Put back
					</button>
					<small>Drag to turn it around</small>
				</div>
			</aside>

			<section className="fallback" id="fallback">
				<img src={profileImage} alt="Jim van Duijsen" />
				<h1>Jim van Duijsen</h1>
				<p>
					I build custom AI agents and modern websites for businesses. Available
					for freelance projects.
				</p>
				<nav aria-label="Links">
					{links.map((link) => (
						<a
							key={link.href}
							href={link.href}
							target={link.isExternal ? "_blank" : undefined}
							rel={link.isExternal ? "noreferrer" : undefined}
						>
							{link.label}
						</a>
					))}
					{socials.map((social) => (
						<a
							key={social.href}
							href={social.href}
							target="_blank"
							rel="noreferrer"
						>
							{social.label}
						</a>
					))}
				</nav>
				<p>{contactEmail}</p>
				<p className="legal">
					{footerLinks
						.filter((link) => !link.href.startsWith("mailto:"))
						.map((link) => (
							<a key={link.label} href={link.href}>
								{link.label}
							</a>
						))}
					{footerMetaItems.map((item) => (
						<span key={item.label}>{item.label}</span>
					))}
				</p>
			</section>

			<script
				type="application/json"
				id="desk-content"
				dangerouslySetInnerHTML={{ __html: deskContentJson }}
			/>
			<script defer src="/assets/desk/desk.js" />
		</main>
	);
}

export const homePage = () => {
	return renderPage({
		title: "Jim van Duijsen | AI Agent Developer & Freelance Web Developer",
		description:
			"Jim van Duijsen builds custom AI agents and modern websites for businesses. Founder of Havonyx and Jimvd Web Agency. Available for freelance projects.",
		canonicalPath: "/",
		bgDark: true,
		metadata: (
			<>
				<script dangerouslySetInnerHTML={{ __html: modeScript }} />
				<link rel="stylesheet" href="/assets/desk/desk.css" />
				<noscript>
					<link rel="stylesheet" href="/assets/desk/noscript.css" />
				</noscript>
			</>
		),
		children: <DeskHomePage />,
	});
};
