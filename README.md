# jimvanduijsen.com

Source for my personal site: **[jimvanduijsen.com](https://www.jimvanduijsen.com)**

Built with TypeScript, [Hono](https://hono.dev) + Hono JSX, and Tailwind CSS, deployed on Cloudflare Workers.

## Contact form

`POST /contact` sends an email over SMTP (`worker-mailer`). Set these as Wrangler secrets (or in `.dev.vars` locally): `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `CONTACT_TO_EMAIL`, and optionally `CONTACT_FROM_EMAIL`.
