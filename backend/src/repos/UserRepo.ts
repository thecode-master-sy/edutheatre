import { User } from "../models";

const user = new User();

export default class UserRepo {

    public static async getUserWithEmail(email: string) {
        const userData = await user.getUserWithEmail(email);
        return userData.error ? false : userData.data?.rows[0];
    }
}