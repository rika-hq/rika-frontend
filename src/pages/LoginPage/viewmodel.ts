import { LoginForm } from "@/models/forms/loginForm.interface";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

export function useViewModel() {
	const [isLogging, setIsLogging] = useState<boolean>(false);

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
		await new Promise((res) => setTimeout(res, 3000));
		await setIsLogging(false);
		// TODO: Logged. Redirect to the home page. 
	});

	return {
		formMethods,
		onSubmit,
		isLogging
	};
}
