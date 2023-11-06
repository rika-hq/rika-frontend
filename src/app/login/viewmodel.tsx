import { LoginForm } from "@/models/forms/LoginForm.interface";
import { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";

export function useViewModel() {
	const [isLogging, setIsLogging] = useState<boolean>(false);
	const [passwordVisible, setPasswordVisible] = useState<boolean>(false);

	const formSchema = yup.object().shape({
		email: yup
			.string()
			.email("E-mail is not a valid e-mail")
			.required("Please enter an e-mail address"),
		password: yup.string().required("Please enter your password"),
	});
	const formDefaultValues: LoginForm = {
		email: "",
		password: "",
	};
	const formMethods = useForm<LoginForm>({
		resolver: yupResolver(formSchema),
		defaultValues: formDefaultValues,
	});
	const onSubmit = formMethods.handleSubmit(async () => {
		await setIsLogging(true);

		// Simulate login process.
		await new Promise((res) => setTimeout(res, 3000));
		await setIsLogging(false);
		console.log("Logged!");
	});

	return {
		isLogging,
		formMethods,
		passwordVisible,
		onSubmit,
		setPasswordVisible,
	};
}
