import { footerLinks, footerMetaItems } from "../content/footer.js";

export const Footer = () => {
  return (
    <footer className="flex flex-wrap items-center justify-between gap-y-2.5 border-t border-current/10 p-16">
      <a
        href="/"
        className="w-[148px] whitespace-nowrap text-center text-xl font-semibold leading-[1.45] tracking-[-0.1px]"
      >
        Jim Van Duijsen
      </a>

      <nav className="flex max-w-full flex-wrap items-center justify-center gap-x-8 gap-y-2.5 max-sm:flex-col max-sm:gap-x-0">
        {footerLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="whitespace-nowrap text-center text-base font-medium leading-[1.45] tracking-[-0.08px] transition hover:opacity-60"
          >
            {link.label}
          </a>
        ))}

        {footerMetaItems.map((item) => (
          <span
            key={item.label}
            className="whitespace-nowrap text-center text-base font-medium leading-[1.45] tracking-[-0.08px]"
          >
            {item.label}
          </span>
        ))}
      </nav>
    </footer>
  );
};
