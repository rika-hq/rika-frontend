import type { Metadata } from "next";
import { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
	title: "Rika",
	description: "A project management software",
};

interface RootLayoutProps {
	children?: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
	return (
		<html>
			<body>{children}</body>
		</html>
	);
}
