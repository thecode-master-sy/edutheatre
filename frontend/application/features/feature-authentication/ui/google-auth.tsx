"use client";
import { Button } from "@/lib/ui/button";
import { FcGoogle } from "react-icons/fc";

export const GoogleAuthComponent = () => {
	return (
		<div>
			<Button asChild>
				<a
					href="https://prod-r1iy.onrender.com/api/auth/google"
					className="gap-2 w-full"
				>
					<FcGoogle />
					<span>Continue with google</span>
				</a>
			</Button>
		</div>
	);
};
