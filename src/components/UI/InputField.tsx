import { Icon } from "@iconify/react";
import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

export interface InputFieldProps {
	className?: string;
	inputClassName?: string;
	error?: string;
	type?: "password";
	leftIcon?: string;
	rightIcon?: string;
	value?: string;
	disabled?: boolean;
	onChange?: (...event: any[]) => void;
	onBlur?: () => void;
	leftIconClick?: () => void;
	rightIconClick?: () => void;
}

export const InputField = forwardRef(
	(props: InputFieldProps, ref: React.Ref<HTMLInputElement>) => {
		function renderIcon(icon?: string, handler?: () => void) {
			if (icon) {
				return (
					<Icon
						className={twMerge(
							"text-[25px]",
							props.disabled ? "text-gray-300" : "text-gray-500",
							handler && !props.disabled
								? "transition-all duration-200 rounded-full hover:bg-gray-200 hover:cursor-pointer"
								: ""
						)}
						icon={icon}
						onClick={() => !props.disabled && handler?.()} // It won't call handler() unless disabled come false
					/>
				);
			}
		}

		function renderError() {
			if (props.error) {
				return (
					<div className="ml-3 text-red-400 font-sans">
						{props.error}
					</div>
				);
			}
		}

		// To make disabled and error styles differently.
		function getBorderClasses() {
			if (props.error) {
				if (props.disabled) {
					return "border-red-200 focus-within:border-red-200";
				}
				return "border-red-300 focus-within:border-red-400";
			}

			if (props.disabled) {
				return "border-gray-200 focus-within:border-gray-200";
			}
			return "border-gray-300 focus-within:border-gray-500";
		}

		return (
			<div className="flex flex-col">
				<div
					className={twMerge(
						"w-full justify-between transition-all duration-200 rounded-full p-3 border-2 flex items-center",
						getBorderClasses(),
						props.className
					)}
				>
					<div className="flex">
						{renderIcon(props.leftIcon, props.leftIconClick)}
						<div className="border-l-2 mx-3 border-l-gray-200 flex-1" />
					</div>
					<input
						value={props.value}
						onChange={props.onChange}
						onBlur={props.onBlur}
						disabled={props.disabled}
						ref={ref}
						type={props.type}
						className={twMerge(
							"outline-none flex-1 disabled:bg-white",
							props.inputClassName
						)}
					/>
					{renderIcon(props.rightIcon, props.rightIconClick)}
				</div>
				{renderError()}
			</div>
		);
	}
);
