import Navbar from "@/lib/ui/navbar";
import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/lib/ui/toaster";

export const metadata: Metadata = {
	title: "Edutheater",
	description: "Educational Application",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body>
				<Navbar />
				<main className="relative overflow-hidden">{children}</main>

				<Toaster />
			</body>
		</html>
	);
}
