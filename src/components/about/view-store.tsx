// Alpine store for the About/CV switcher, saved in localStorage.
// Must be in the page head so it is registered before Alpine starts.
const script = `document.addEventListener("alpine:init",()=>{let m="about";try{m=localStorage.getItem("view")==="cv"?"cv":"about"}catch(e){}Alpine.store("view",{mode:m,init(){Alpine.effect(()=>{try{localStorage.setItem("view",this.mode)}catch(e){}})}})})`;

export const ViewStore = () => (
	<script dangerouslySetInnerHTML={{ __html: script }} />
);
