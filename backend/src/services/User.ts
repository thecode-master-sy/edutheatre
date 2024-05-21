import { User as UserModel } from "../models";
import { Token } from ".";
import bcrypt from "bcrypt";

class User {

    public static async signUp(signUpData: string[]) {
        const user: UserModel = new UserModel();
        
        const passwordHash = await bcrypt.hash(signUpData[2], 10);
        signUpData[2] = passwordHash;

        const result = await user.insert(signUpData);
        let statusCode = result.error ? 500 : 200;
        const userData = result.data?.rows[0];
        return {
            statusCode: statusCode,
            json: {
                error: result.error ?? false,
                message: result.error ? "something went wrong" : "user has been created successfully",
                data: {
                    user: userData,
                    token: userData ? Token.createToken(userData) : null
                }
            }
        };
    }

    public static async login(email: string){

    }
}

export default User;