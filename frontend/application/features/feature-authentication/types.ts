import { patterns } from "./utils";

export type UserDetails = {
  email: FormDataEntryValue | null;
  password: FormDataEntryValue | null;
};

export interface NewUserDetails extends UserDetails {
  name: FormDataEntryValue | null;
}

type PatternsKeys = keyof typeof patterns;

export type FormState = {
  error: boolean,
  message: string;
  errorType: PatternsKeys | "response" | null;
}


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

export type AuthUserResponse = ErrorResponse | SuccessResponse;




