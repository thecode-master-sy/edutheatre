"use server";

export async function Authenticate() {
  return {
    error: false,
    message: "this is the response with no errors",
  };
}

export async function CreateAccount() {
  return {
    error: false,
    message: "the account has been successfully created"
  }
}
