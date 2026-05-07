import type { Child } from "hono/jsx";

type PageOptions = {
  title: string;
  description?: string;
  metadata?: Child;
  children: Child;
};

export const renderPage = ({
  title,
  description,
  metadata,
  children,
}: PageOptions) => {
  return (
    <html lang="en">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{title}</title>
        {description ? <meta name="description" content={description} /> : null}
        {metadata}
        <link rel="stylesheet" href="/assets/app.css" />
      </head>
      <body>{children}</body>
    </html>
  );
};
