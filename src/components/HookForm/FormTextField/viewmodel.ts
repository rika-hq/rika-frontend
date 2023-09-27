export interface FormTextFieldProps {
	/**
	 * Field name used by react hook form.
	 */
	fieldName: string;

	/**
	 * Label of the input.
	 */
	label?: string;

	/**
	 * Input type of the text field.
	 */
	type?: "password" | "text" | "textarea";
}
