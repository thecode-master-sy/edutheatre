import { BASE_URL } from "../utils";

export async function Signup() {
  const URL = `${BASE_URL}/sign-up`;

  return {
    error: false,
    message: "user has sucessfully signed up",
  };
}
