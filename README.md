# jimvanduijsen.com

Source for my personal site: **[jimvanduijsen.com](https://www.jimvanduijsen.com)**

Built with TypeScript, [Hono](https://hono.dev) + Hono JSX, and Tailwind CSS, deployed on Cloudflare Workers.

## Contact form

`POST /contact` sends an email over SMTP (`worker-mailer`). Set these as Wrangler secrets (or in `.dev.vars` locally): `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` (the sender address, separate from `SMTP_USER` because Resend's SMTP username is not an email), and optionally `SMTP_PORT` (default 587). All env vars are read and validated in `src/config.ts`.
