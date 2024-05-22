import { NewUserDetails } from "../types";
import { BASE_URL } from "../utils";

export async function CreateNewUser(newUserDetails: NewUserDetails) {
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
    return { error: true, message: "something went wrong" };
  }

}
