import Link from "next/link";
import { Separator } from "@/lib/ui/separator";
import { GoogleAuthComponent } from "./google-auth";
import { LoginForm } from "./login-form";
import { EmailFormContainer } from "./email-form-trigger";

export default function LoginComponent() {
	return (
		<main className="grid gap-7">
			<div className="grid gap-4">
				<h1 className="font-bold text-2xl">Login</h1>
				<p>Imagine having control of what you want to learn🤯</p>
			</div>
			<GoogleAuthComponent />

			<div className="grid grid-cols-3 place-items-center  gap-4">
				<Separator />
				<span>or</span>
				<Separator />
			</div>

			<EmailFormContainer>
				<LoginForm />
			</EmailFormContainer>

			<p className="text-center">
				Don't have an account?{" "}
				<Link href={"/signup"} className="underline">
					Sign Up
				</Link>
			</p>
		</main>
	);
}
