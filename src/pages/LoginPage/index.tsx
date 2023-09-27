import { FormProvider } from "react-hook-form";
import { useViewModel } from "./viewmodel";
import { FormTextField } from "@/components/HookForm/FormTextField";
import { Icon } from "@iconify/react";

export function LoginPage() {
	const viewModel = useViewModel();

	function renderButtonContent() {
		if (viewModel.isLogging) {
			return <Icon icon="line-md:loading-twotone-loop" fontSize={29} />;
		}

		return "Login";
	}

	return (
		<div className="h-screen w-screen flex items-center justify-center">
			<FormProvider {...viewModel.formMethods}>
				<form onSubmit={viewModel.onSubmit}>
					<div className="flex flex-col w-[400px] rounded-xl bg-space-200 shadow-xl px-10 py-5">
						<div className="my-3 text-[35px] font-bold">Log in</div>
						<div className="flex flex-col gap-5">
							<FormTextField fieldName="email" label="E-Mail" />
							<FormTextField
								fieldName="password"
								type="password"
								label="Password"
							/>
						</div>
						<div className="h-[30px]" />
						<button
							disabled={viewModel.isLogging}
							type="submit"
							className="self-center w-full flex items-center justify-center"
						>
							{renderButtonContent()}
						</button>
					</div>
				</form>
			</FormProvider>
		</div>
	);
}
