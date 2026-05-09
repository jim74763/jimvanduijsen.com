# Repository Guidelines

## Project Structure & Module Organization

This is a small Cloudflare Workers site built with Hono and Hono JSX. The worker entry point is `src/index.ts`, where routes are registered. Page renderers live in `src/web/pages/`, shared layout lives in `src/web/document.tsx`, and reusable UI pieces live in `src/web/components/`. Tailwind input is `src/styles.css`; the compiled stylesheet is `public/assets/app.css`. Static assets, favicons, manifests, and social icons belong under `public/`.

## Build, Test, and Development Commands

Use `pnpm`; the repository includes `pnpm-lock.yaml`.

- `pnpm install`: install dependencies.
- `pnpm dev`: run Tailwind in watch mode and start `wrangler dev`.
- `pnpm build:css`: compile and minify `src/styles.css` into `public/assets/app.css`.
- `pnpm deploy`: build CSS and deploy the Worker with Wrangler.
- `pnpm cf-typegen`: generate Cloudflare binding types after changing `wrangler.jsonc`.

## Coding Style & Naming Conventions

Use TypeScript with strict mode. Match the existing style: 2-space indentation, double quotes, semicolons, named exports, and JSX via `hono/jsx`. Components should use `PascalCase` filenames or exports when they render reusable UI, such as `Header`. Page factory functions should use lower camel case, such as `homePage`, and should live in `src/web/pages/`. Keep route registration centralized in `src/index.ts`.

Prefer Tailwind utility classes for styling. When changing classes or `src/styles.css`, regenerate `public/assets/app.css` with `pnpm build:css`.

## Testing Guidelines

No automated test framework is currently configured. For now, validate changes by running `pnpm build:css` and `pnpm dev`, then manually check `/`, `/about`, and `/contact`. If tests are added later, prefer focused TypeScript tests named `*.test.ts` or `*.test.tsx` near the code they cover, or place broader integration tests under `tests/`.

## Commit & Pull Request Guidelines

The current history only contains the initial commit, so there is no established convention beyond concise messages. Use short, imperative commit subjects, for example `Add contact page metadata` or `Update header navigation`.

Pull requests should include a brief summary, validation steps run, and screenshots for visible UI changes. Mention any route, asset, or Cloudflare configuration changes explicitly, especially edits to `wrangler.jsonc`.

## Security & Configuration Tips

Do not commit Cloudflare credentials or secret values. Manage runtime configuration through Wrangler secrets or environment-specific bindings, and regenerate binding types after configuration changes.

## notes
-- a dev server is already running on port 8787
