import { GoogleAuthComponent } from "@/features/feature-authentication/ui/google-auth";
import { Separator } from "@/lib/ui/separator";

export default function AuthRootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className="flex min-h-screen">
			<div className="w-full max-w-[400px] m-auto">{children}</div>
		</div>
	);
}
