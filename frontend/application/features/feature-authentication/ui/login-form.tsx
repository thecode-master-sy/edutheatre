"use client";

import { Input } from "@/lib/ui/input";
import { FormGroup, Form } from "@/lib/ui/form";
import { Label } from "@/lib/ui/label";
import { LoginUserAction } from "../services/actions";
import { SubmitButton } from "./submit-button";
import { useFormState } from "react-dom";
import { FormState } from "../types";
import { ErrorComponent } from "./error-component";
import { useToast } from "@/lib/ui/use-toast";
import { useEffect } from "react";

const initialFormState: FormState = {
	error: false,
	message: "",
	errorType: null,
};

export const LoginForm = () => {
	const [state, formAction] = useFormState(LoginUserAction, initialFormState);

	const { toast } = useToast();

	useEffect(() => {
		if (state.errorType == "response") {
			toast({
				variant: "destructive",
				description: state.message,
			});
		}
	}, [state]);

	return (
		<Form action={formAction}>
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
