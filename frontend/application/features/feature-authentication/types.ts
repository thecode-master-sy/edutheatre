export type UserDetails = {
  email: FormDataEntryValue | null;
  password: FormDataEntryValue | null;
};

export interface NewUserDetails extends UserDetails {
  name: FormDataEntryValue | null;
}

export type FormErrors = {
  email: string;
  password: string;
  name?: string;
}


