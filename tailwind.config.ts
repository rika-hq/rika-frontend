import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				space: {
					DEFAULT: "#2C3333",
					50: "#839494",
					100: "#788A8A",
					200: "#657575",
					300: "#525F5F",
					400: "#3F4949",
					500: "#2C3333",
					600: "#121515",
					700: "#000000",
					800: "#000000",
					900: "#000000",
					950: "#000000",
				},
				spectra: {
					DEFAULT: "#2E4F4F",
					50: "#80B5B5",
					100: "#73ADAD",
					200: "#5B9C9C",
					300: "#4C8383",
					400: "#3D6969",
					500: "#2E4F4F",
					600: "#192C2C",
					700: "#050808",
					800: "#000000",
					900: "#000000",
					950: "#000000",
				},
				chill: {
					DEFAULT: "#0E8388",
					50: "#5FE9EF",
					100: "#4DE6ED",
					200: "#28E1E9",
					300: "#16CAD2",
					400: "#12A7AD",
					500: "#0E8388",
					600: "#095255",
					700: "#042122",
					800: "#000000",
					900: "#000000",
					950: "#000000",
				},
			},
		},
	},
	plugins: [],
};
export default config;
