import type { AboutItem } from "../../content/about.js";

export const ItemList = ({ items }: { items: AboutItem[] }) => (
	<ul className="w-full">
		{items.map((item) => (
			<li key={item.title} className="border-b border-border py-5">
				<div className="flex items-baseline justify-between gap-4">
					<h3 className="text-xl font-semibold tracking-tight">{item.title}</h3>
					{item.period ? (
						<span className="shrink-0 text-base font-medium text-muted-foreground">
							{item.period}
						</span>
					) : null}
				</div>
				{item.subtitle ? (
					<p className="text-base font-medium text-muted-foreground">
						{item.subtitle}
					</p>
				) : null}
				{item.body || item.bullets ? (
					<div className="mt-2 max-w-xl text-base font-medium leading-relaxed text-muted-foreground">
						{item.body ? <p>{item.body}</p> : null}
						{item.bullets ? (
							<ul className="mt-3 list-disc space-y-2 pl-5">
								{item.bullets.map((bullet) => (
									<li key={bullet}>{bullet}</li>
								))}
							</ul>
						) : null}
					</div>
				) : null}
				{item.link || item.extraLink ? (
					<div className="mt-3 flex flex-wrap gap-x-6 gap-y-1 text-base font-semibold tracking-tight">
						{item.link ? (
							<a
								href={item.link}
								className="text-foreground transition hover:opacity-60"
							>
								{item.linkLabel ?? "Visit"}
							</a>
						) : null}
						{item.extraLink ? (
							<a
								href={item.extraLink.href}
								className="text-foreground transition hover:opacity-60"
							>
								{item.extraLink.label}
							</a>
						) : null}
					</div>
				) : null}
			</li>
		))}
	</ul>
);
