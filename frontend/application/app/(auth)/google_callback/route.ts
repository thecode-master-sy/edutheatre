import { setCookie } from "@/features/feature-authentication/utils";
import { redirect } from "next/navigation";

export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);
	const token = searchParams.get("token");

	if (token) {
		setCookie("token", token);
		redirect("/tutors");
	} else {
		redirect("/login");
	}
}
