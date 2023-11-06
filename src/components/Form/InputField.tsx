import {
	InputField as UIInputField,
	InputFieldProps as UIInputFieldProps,
} from "@/components/UI";
import { Controller, useFormContext } from "react-hook-form";

export interface InputFieldProps extends UIInputFieldProps {
	name: string;
}

export function InputField(props: InputFieldProps) {
	const { control } = useFormContext();
	const { name, ...restProps } = props;

	return (
		<Controller
			name={name}
			control={control}
			render={({ field, fieldState: { error } }) => (
				<UIInputField
					{...restProps}
					{...field}
					error={error?.message}
				/>
			)}
		/>
	);
}
