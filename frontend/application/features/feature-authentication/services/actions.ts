"use server";
import { FormState } from "../types";
import { patterns, setCookie, verify } from "../utils";
import { CreateNewUser } from "./signup";
import { LoginNewUser } from "./login";
import { redirect } from "next/navigation";

export async function Authenticate(
	formState: FormState,
	formData: FormData
): Promise<FormState> {
    //get user value
	const email = (formData.get("email") as string) ?? "";
	const password = (formData.get("password") as string) ?? "";

    //make login request
	
	const UserDetails = {

		email,
		password,
	};
	const response = await LoginNewUser(UserDetails);

	if (response.error) {
		return { ...response, errorType: "response" };
	}
	//set cookie if response was ok
	if (response.data.token) {
		setCookie("token", response.data.token);
	}

	//redirect after setting the cookie.
	redirect("/tutors");

}
 
	

export async function CreateAccountAction(
	formState: FormState,
	formData: FormData
): Promise<FormState> {
	//getting the value from the form and setting the default value to a string if it doesn't exist or was provided.
	const name = (formData.get("name") as string) ?? "";
	const email = (formData.get("email") as string) ?? "";
	const password = (formData.get("password") as string) ?? "";

	//validate the inputs
	if (!verify(name, patterns.name)) {
		return {
			error: true,
			errorType: "name",
			message: "invalid name",
		};
	}

	if (!verify(email, patterns.email)) {
		return {
			error: true,
			errorType: "email",
			message: "invalid email address",
		};
	}

	if (!verify(password, patterns.password)) {
		return {
			error: true,
			errorType: "password",
			message: "invalid password",
		};
	}

	//send the response back to the client.
	const newUserDetails = {
		name,
		email,
		password,
	};
	const response = await CreateNewUser(newUserDetails);

	if (response.error) {
		return { ...response, errorType: "response" };
	}
	//set cookie if response was ok
	if (response.data.token) {
		setCookie("token", response.data.token);
	}

	//redirect after setting the cookie.
	redirect("/tutors");

	return {
		...formState,
		message: "account created successfully",
	};
}
