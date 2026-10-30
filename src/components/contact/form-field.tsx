const controlClass =
	"w-full rounded-md border border-border bg-background px-3.5 py-2.5 text-base text-foreground outline-none transition focus:border-foreground";

type FormFieldProps = {
	name: string;
	label: string;
	type?: "text" | "email" | "textarea";
	maxLength: number;
	autoComplete?: string;
};

export const FormField = ({
	name,
	label,
	type = "text",
	maxLength,
	autoComplete,
}: FormFieldProps) => (
	<div className="flex flex-col gap-2">
		<label htmlFor={name} className="text-sm font-medium">
			{label} <span className="text-muted-foreground">*</span>
		</label>
		{type === "textarea" ? (
			<textarea
				id={name}
				name={name}
				required
				rows={6}
				maxLength={maxLength}
				className={`${controlClass} resize-y`}
			/>
		) : (
			<input
				id={name}
				name={name}
				type={type}
				required
				maxLength={maxLength}
				autoComplete={autoComplete}
				className={controlClass}
			/>
		)}
	</div>
);
