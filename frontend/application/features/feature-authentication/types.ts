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



