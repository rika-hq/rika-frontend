import { FormTextFieldProps } from "./viewmodel";
import { Controller, useFormContext } from "react-hook-form";

export function FormTextField(props: FormTextFieldProps) {
	const { control } = useFormContext();

	return (
		<Controller
			name={props.fieldName}
			control={control}
			render={({ field, fieldState: { error } }) => (
				<div className="flex flex-col gap-2">
					{props.label && (
						<label
							className="text-xl"
							htmlFor={`input${props.fieldName}`}
						>
							{props.label}
						</label>
					)}
					<input {...field} type={props.type ?? "text"} />
					{error && (
						<span className="h-[10px] text-red-300">
							{error?.message}
						</span>
					)}
				</div>
			)}
		/>
	);
}
