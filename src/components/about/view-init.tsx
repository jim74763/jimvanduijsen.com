// Runs in <head> before first paint, so a saved CV view renders without
// flashing the About page first. The CSS rules for data-view-pending live in
// styles.css, and Alpine removes the attribute once it takes over.
const script = `
try {
	document.documentElement.dataset.view =
		localStorage.getItem("view") === "cv" ? "cv" : "about";
} catch {
	document.documentElement.dataset.view = "about";
}
document.documentElement.dataset.viewPending = "";
`;

export const ViewInit = () => (
	<>
		<script dangerouslySetInnerHTML={{ __html: script }} />
		<script defer src="/js/view-store.js" />
		<noscript>
			<style>{"[data-cv-only]{display:none}"}</style>
		</noscript>
	</>
);
