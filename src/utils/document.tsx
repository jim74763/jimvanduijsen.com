import type { Child } from "hono/jsx";

const SITE_URL = "https://www.jimvanduijsen.com";
const OG_IMAGE = `${SITE_URL}/assets/og-image.png`;

type PageOptions = {
	title: string;
	description?: string;
	canonicalPath?: string;
	metadata?: Child;
	children: Child;
};

export const renderPage = ({
	title,
	description,
	canonicalPath = "/",
	metadata,
	children,
}: PageOptions) => {
	const canonicalUrl = `${SITE_URL}${canonicalPath}`;

	return (
		<html lang="en">
			<head>
				<meta charset="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<link
					rel="icon"
					type="image/png"
					href="/favicon-96x96.png"
					sizes="96x96"
				/>
				<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
				<link rel="shortcut icon" href="/favicon.ico" />
				<link
					rel="apple-touch-icon"
					sizes="180x180"
					href="/apple-touch-icon.png"
				/>
				<meta name="apple-mobile-web-app-title" content="jimvanduijsen.com" />
				<link rel="manifest" href="/site.webmanifest" />
				<title>{title}</title>
				<meta name="title" content={title} />
				{description ? <meta name="description" content={description} /> : null}
				<meta name="author" content="Jim van Duijsen" />
				<meta name="robots" content="index,follow" />
				<link rel="canonical" href={canonicalUrl} />
				<meta property="og:site_name" content="Jim van Duijsen" />
				<meta property="og:type" content="website" />
				<meta property="og:url" content={canonicalUrl} />
				<meta property="og:title" content={title} />
				{description ? (
					<meta property="og:description" content={description} />
				) : null}
				<meta property="og:image" content={OG_IMAGE} />
				<meta property="og:image:alt" content="Jim van Duijsen" />
				<meta name="twitter:card" content="summary_large_image" />
				<meta name="twitter:url" content={canonicalUrl} />
				<meta name="twitter:title" content={title} />
				{description ? (
					<meta name="twitter:description" content={description} />
				) : null}
				<meta name="twitter:image" content={OG_IMAGE} />
				<meta name="twitter:image:alt" content="Jim van Duijsen" />
				{metadata}
				<link rel="stylesheet" href="/assets/app.css" />
				<script
					defer
					src="/u/script.js"
					data-website-id="eda141ce-7cde-4d99-b20b-6558e5e5b43c"
					data-host-url="/u"
				/>
			</head>
			<body>{children}</body>
		</html>
	);
};
