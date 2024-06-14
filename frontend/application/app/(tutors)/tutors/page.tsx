import { getCookie } from "@/features/feature-authentication/utils";
import { redirect } from "next/navigation";

export default async function Page() {
	const isAuthenticated = getCookie("token");

	if (!isAuthenticated) {
		redirect("/login");
	}

	console.log(isAuthenticated);

	return <div>this is the tutors page</div>;
}
