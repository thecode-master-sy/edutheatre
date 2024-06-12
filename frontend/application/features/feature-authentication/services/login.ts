import { AuthUserResponse, UserDetails } from "../types";
import { BASE_URL } from "../utils";

export async function LoginNewUser(
	userDetails: UserDetails
): Promise<AuthUserResponse> {
	const URL = `${BASE_URL}/login`;

	try {
		const response = await fetch(URL, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Basic ${btoa(
					`${userDetails.email}:${userDetails.password}`
				)}`,
			},
			credentials: "include",
		});
		return await response.json();
	} catch (error) {
		console.log(error);
		return { error: true, message: "something went wrong" };
	}
}
