import { NewUserDetails } from "../types";
import { BASE_URL } from "../utils";

type UserResponse = {
	id: number;
	email: string;
	role: string;
	password: string;
	created_at: string;
	updated_at: string | null;
};

type DataResponse = {
	user: UserResponse;
	token: string;
};

type ErrorResponse = {
	error: true;
	message: string;
};

type SuccessResponse = {
	error: false;
	message: string;
	data: DataResponse;
};

export type CreateUserResponse = ErrorResponse | SuccessResponse;

export async function CreateNewUser(
	newUserDetails: NewUserDetails
): Promise<CreateUserResponse> {
	const URL = `${BASE_URL}/sign-up`;

	try {
		const response = await fetch(URL, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(newUserDetails),
			
		});

		return await response.json();
	} catch (error) {
		console.log(error);
		return { error: true, message: "something went wrong" };
	}
}
