"use client";
import { Button } from "@/lib/ui/button";
import { FcGoogle } from "react-icons/fc";

export const GoogleAuthComponent = () => {
	return (
		<div>
			<Button className="gap-2 w-full">
				<FcGoogle />
				<span>Continue with google</span>
			</Button>
		</div>
	);
};
