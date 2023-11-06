"use client";
import { Agbalumo, Inter } from "next/font/google";
import { Icon } from "@iconify/react";
import { useViewModel } from "./viewmodel";
import { FormProvider } from "react-hook-form";
import { InputField } from "@/components/Form/InputField";

const nameFont = Agbalumo({ subsets: ["latin"], weight: "400" });
const inter = Inter({ subsets: ["latin"] });
export default function Login() {
	const viewModel = useViewModel();

	function renderLoginButtonContent() {
		if (viewModel.isLogging) {
			return <Icon icon="line-md:loading-twotone-loop" fontSize={29} />;
		}

		return "Login";
	}

	return (
		<main className={`w-screen h-screen flex ${inter.className}`}>
			<FormProvider {...viewModel.formMethods}>
				<form
					onSubmit={viewModel.onSubmit}
					className="flex-1 flex flex-col items-center"
				>
					<div className="flex flex-col w-[80%] items-center justify-between h-full">
						<div className="flex items-center">
							<img
								className="w-[100px]"
								src="/images/rika-logo-transparent.png"
							/>
							<div
								className={`text-[30px] ${nameFont.className}`}
							>
								Rika
							</div>
						</div>
						<div className="w-full gap-3 flex flex-col">
							<div className="text-[20px] font-bold">
								Welcome back
							</div>
							<div className="text-gray-400">
								Enter your account details to login Rika.
							</div>
							<div className="flex flex-col gap-3">
								<InputField
									name="email"
									leftIcon="mdi:email-outline"
								/>
								<InputField
									name="password"
									type={
										viewModel.passwordVisible
											? "password"
											: undefined
									}
									leftIcon="mdi:lock-outline"
									rightIcon={
										viewModel.passwordVisible
											? "mdi:eye-outline"
											: "mdi:eye-off-outline"
									}
									rightIconClick={() =>
										viewModel.setPasswordVisible(
											(old) => !old
										)
									}
								/>
							</div>
							<button
								type="submit"
								className="rounded-lg bg-slate-800 text-white p-3 hover:bg-slate-700 transition-all duration-200 flex items-center justify-center h-[50px]"
							>
								{renderLoginButtonContent()}
							</button>
						</div>
						<div className="my-5 font-sans text-gray-500">
							Rika is a project management software that allows
							you to create kanbans, scrum boards, and its own
							schema; Roadmaps.
						</div>
					</div>
				</form>
			</FormProvider>
			<img
				className="w-[50vw] object-cover"
				src="/images/login-page-right-side.jpeg"
			/>
		</main>
	);
}
