import { Footer } from "../components/footer.js";
import { Header } from "../components/header.js";
import { renderPage } from "../document.js";

const Contact = () => {
  return (
    <main className="relative flex min-h-screen flex-col overflow-x-hidden bg-white text-black">
      <Header />
      <section className="flex flex-1 px-6 pb-16 pt-[104px] sm:px-16">
        <div className="h-[650px] w-full overflow-hidden">
          <iframe
            src="https://n8n.app.jimvd.xyz/form/d2f958e2-a7e3-4449-96d6-9921f098f6ef"
            title="contact form"
            allowFullScreen
            className="h-full w-full border-0"
          />
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default Contact;

export const contactPage = () => {
  return renderPage({
    title: "Contact | Jim van Duijsen",
    description: "Get in touch with Jim van Duijsen.",
    canonicalPath: "/contact",
    children: <Contact />,
  });
};
