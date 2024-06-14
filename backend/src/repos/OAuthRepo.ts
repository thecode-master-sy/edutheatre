import { OAuthUser } from "../models";

const user = new OAuthUser();

export default class OAuthRepo {

    public static async getUserWithEmail(email: string) {
        const userData = await user.getUserWithEmail(email);
        return userData.error ? false : userData.data?.rows[0];
    }
}