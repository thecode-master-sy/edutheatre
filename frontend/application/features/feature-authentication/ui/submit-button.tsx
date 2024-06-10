"use client";
import { Button } from "@/lib/ui/button";
import { useFormStatus } from "react-dom";
import { Mail } from "lucide-react";
import { Loader2 } from "lucide-react";

export const SubmitButton = () => {
	const { pending } = useFormStatus();

	return (
		<Button
			type="submit"
			variant="secondary"
			className="gap-2"
			disabled={pending}
		>
			{pending ? (
				<>
					<Loader2 className="mr-2 h-4 w-4 animate-spin" />
					Please wait
				</>
			) : (
				<>
					<span>
						<Mail size={16} />
					</span>
					<span>Continue with email</span>
				</>
			)}
		</Button>
	);
};
