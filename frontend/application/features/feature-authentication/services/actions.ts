"use server";

import { FormErrors, NewUserDetails } from "../types";
import { CreateNewUser } from "./signup";

export async function Authenticate() {
  return {
    error: false,
    message: "this is the response with no errors",
  };
}

export async function CreateAccountAction(_currentState: any, formData: FormData) {
  const fields: NewUserDetails = {
    name: formData.get("name"),
    password: formData.get("password") ?? "",
    email: formData.get("email")
  }

  const errorObj: FormErrors | {} = {}

  if(Object.keys(errorObj).length !== 0) {
    return {
      ..._currentState,
      error: true,
      formErrors: errorObj,
      message: "some fields might be missing"
    }
  }

  const response = await CreateNewUser(fields)

  if(!response) {
    return {
      ..._currentState,
      error: true,
      message: "oops something went wrong"
    }
  }

  if(response.error) {
    return {
      error: true,
      responseError: response.error,
      message: "something is wrong with the credientials"
    } 
  }


  return {
    error: false,
    message: "the account has been successfully created"
  }
}
