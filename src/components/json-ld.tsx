type Props = {
	schema: string;
};

export const JsonLd = ({ schema }: Props) => (
	<script
		type="application/ld+json"
		dangerouslySetInnerHTML={{ __html: schema }}
	/>
);
