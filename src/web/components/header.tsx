const navLinks = [
  {
    label: "Templates",
    href: "https://umami.app.jimvd.xyz/q/0lfWDwcxL",
  },
  {
    label: "Contact",
    href: "/contact",
  },
  {
    label: "About",
    href: "/about",
  },
];

export const Header = () => {
  return (
    <header className="absolute inset-x-0 top-0 z-10 flex h-[60px] items-center justify-between border-b border-[#858585]/20 bg-white/90 px-16 py-6">
      <a
        href="/"
        className="whitespace-nowrap text-center text-xl font-semibold leading-[1.45] tracking-[-0.1px]"
      >
        Jim van Duijsen
      </a>

      <nav className="flex items-center gap-8">
        {navLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="whitespace-nowrap text-center text-base font-medium leading-[1.45] tracking-[-0.08px] transition hover:opacity-60"
          >
            {link.label}
          </a>
        ))}
      </nav>
    </header>
  );
};
