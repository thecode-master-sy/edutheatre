"use client";

import { Input } from "@/lib/ui/input";
import { FormGroup, Form } from "@/lib/ui/form";
import { Label } from "@/lib/ui/label";
import { CreateAccountAction } from "../services/actions";
import { SubmitButton } from "./submit-button";
import { useFormState } from "react-dom";
import { FormState } from "../types";
import { ErrorComponent } from "./error-component";

const initialFormState: FormState = {
	error: false,
	message: "",
	errorType: null,
};

export const SignUpForm = () => {
	const [state, formAction] = useFormState(
		CreateAccountAction,
		initialFormState
	);

	return (
		<Form action={formAction}>
			<FormGroup>
				<Label htmlFor="name">Name</Label>
				<Input name="name" id="name" placeholder="Name" type="text" />
				{state.errorType == "name" && (
					<ErrorComponent>{state.message}</ErrorComponent>
				)}
			</FormGroup>
			<FormGroup>
				<Label htmlFor="email">Email</Label>
				<Input
					name="email"
					id="email"
					placeholder="Enter you email address"
					type="email"
				/>
				{state.errorType == "email" && (
					<ErrorComponent>{state.message}</ErrorComponent>
				)}
			</FormGroup>
			<FormGroup>
				<Label htmlFor="password">Password</Label>
				<Input
					name="password"
					id="password"
					placeholder="Enter your password"
					type="password"
				/>
				{state.errorType == "password" && (
					<ErrorComponent>{state.message}</ErrorComponent>
				)}
			</FormGroup>
			<SubmitButton />
		</Form>
	);
};
