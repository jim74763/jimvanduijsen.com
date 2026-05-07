const footerLinks = [
  {
    label: "Privacy and legal",
    href: "https://umami.app.jimvd.xyz/q/4ptT22vvv",
  },
  {
    label: "hello@jimvanduijsen.nl",
    href: "mailto:hello@jimvanduijsen.nl",
  },
];

export const Footer = () => {
  return (
    <footer className="absolute bottom-0 left-px right-[-1px] flex flex-wrap items-center justify-between gap-y-2.5 border-t border-black/10 p-16">
      <a
        href="/"
        className="w-[148px] whitespace-nowrap text-center text-xl font-semibold leading-[1.45] tracking-[-0.1px]"
      >
        Jim Van Duijsen
      </a>

      <nav className="flex h-[29px] items-center justify-center gap-8">
        {footerLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="whitespace-nowrap text-center text-base font-medium leading-[1.45] tracking-[-0.08px] transition hover:opacity-60"
          >
            {link.label}
          </a>
        ))}

        <span className="whitespace-nowrap text-center text-base font-medium leading-[1.45] tracking-[-0.08px]">
          KVK: 42038746
        </span>

        <span className="whitespace-nowrap text-center text-base font-medium leading-[1.45] tracking-[-0.08px]">
          BTW: NL005447716B55
        </span>
      </nav>
    </footer>
  );
};
