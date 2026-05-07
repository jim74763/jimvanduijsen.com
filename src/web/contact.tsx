import { Footer } from "../components/footer";
import { Header } from "../components/header";
import { renderPage } from "./document";

const Contact = () => {
  return (
    <main>
      <Header />
      <section className="absolute inset-x-0 top-[60px] h-[773px] overflow-hidden">
        <div className="absolute left-[66px] right-[72px] top-11 h-[650px]">
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
    children: <Contact />,
  });
};
