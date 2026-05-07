import { renderPage } from "./document";

const profileImage =
  "https://www.jimvanduijsen.com/_assets/v11/033f9851c552fb3057935c1136335c69e64d2e53.png";

const socials = [
  {
    label: "jim's Instagram",
    href: "https://umami.app.jimvd.xyz/q/CBBLbE6Vt",
    text: "jim_p5456",
    icon: "https://www.jimvanduijsen.com/_assets/v11/3a5f95c381125e292f9757a9b970a177692f5833.svg",
  },
  {
    label: "jim's X(Twitter)",
    href: "https://umami.app.jimvd.xyz/q/cIABHJT90",
    text: "@p35555481",
    icon: "https://www.jimvanduijsen.com/_assets/v11/d72b043765e605dcda4eb155b48788592204e4b6.svg",
  },
  {
    label: "jim's Linkedin",
    href: "https://umami.app.jimvd.xyz/q/fbyIKSsDH",
    text: "jim-van-duijsen",
    icon: "https://www.jimvanduijsen.com/_assets/v11/7520d6af7d908b438627e418d0076b67681977a4.svg",
  },
];

const links = [
  "Done for you AI coworker",
  "Website templates",
  "Contact",
  "Web agency",
];

export default function JimLandingPage() {
  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-[linear-gradient(180deg,#666_0%,#4d4d4d_25%,#333_50%,#1a1a1a_75%,#0d0d0d_87.5%,#060606_93.75%,#000_100%)] px-6 py-12 text-white md:px-24">
      <div className="mx-auto flex min-h-[calc(100vh-6rem)] max-w-[1280px] items-center justify-center gap-[30px] max-lg:flex-col">
        <section className="flex w-full max-w-[529px] flex-shrink-0 flex-col items-center gap-[15px] py-px">
          <div className="h-[428px] w-full overflow-hidden rounded-[15px]">
            <img
              src={profileImage}
              alt="Jim van Duijsen"
              className="h-full w-full object-cover"
            />
          </div>

          <h1 className="min-h-[55px] text-center text-4xl font-semibold leading-[1.45]">
            Jim van Duijsen
          </h1>

          <div className="flex w-full items-center justify-center gap-2.5 max-sm:flex-col">
            {socials.map((social) => (
              <a
                key={social.href}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                aria-label={social.label}
                className="flex h-[50px] w-[200px] flex-shrink-0 cursor-pointer items-center gap-2.5 rounded-[30px] bg-[#1c1c1c] px-3.5 py-2.5 transition hover:bg-[#2a2a2a]"
              >
                <span className="relative block h-6 w-6 flex-shrink-0 overflow-hidden">
                  <img
                    src={social.icon}
                    alt=""
                    loading="lazy"
                    className="absolute inset-0 block h-full w-full object-contain"
                  />
                </span>

                <span className="whitespace-nowrap text-left text-xl font-normal leading-normal">
                  {social.text}
                </span>
              </a>
            ))}
          </div>
        </section>

        <section className="flex w-full max-w-[529px] flex-shrink-0 flex-col items-center justify-center gap-5 px-0 md:px-[50px]">
          {links.map((link) => (
            <button
              key={link}
              type="button"
              className="relative h-[76px] w-full max-w-[430px] flex-shrink-0 cursor-pointer rounded-full bg-[#1c1c1c] px-[46px] py-[23px] text-center text-2xl font-semibold text-white transition hover:bg-[#2a2a2a] focus:outline-none focus:ring-2 focus:ring-white/40"
            >
              {link}
            </button>
          ))}
        </section>
      </div>
    </main>
  );
}

export const homePage = () => {
  return renderPage({
    title: "Jim van Duijsen",
    children: <JimLandingPage />,
  });
};
