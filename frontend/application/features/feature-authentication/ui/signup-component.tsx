import Link from "next/link";
import { Separator } from "@/lib/ui/separator";
import { GoogleAuthComponent } from "./google-auth";
import { SignUpForm } from "./sign-up-form";
import { EmailFormContainer } from "./email-form-trigger";

export default function SignupComponent() {
	return (
		<main className="grid gap-7">
			<div className="grid gap-4">
				<h1 className="font-bold text-2xl">Create an account</h1>
				<p>Imagine having control of what you want to learn🤯</p>
			</div>
			<GoogleAuthComponent />

			<div className="grid grid-cols-3 place-items-center  gap-4">
				<Separator />
				<span>or</span>
				<Separator />
			</div>

			<EmailFormContainer>
				<SignUpForm />
			</EmailFormContainer>

			<p className="text-center">
				Already have an account?{" "}
				<Link href={"/login"} className="underline">
					Login
				</Link>
			</p>
		</main>
	);
}
