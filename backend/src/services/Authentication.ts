import { OAuthUser, User as UserModel } from "../models";
import { OAuthRepo, UserRepo } from "../repos";
import { Token } from ".";
import bcrypt from "bcrypt";
import { getUserGoogleData } from "./../modules";
import { oAuth2Client } from "../strategies";

class Authentication {

    private static SCOPE: string = 'https://www.googleapis.com/auth/userinfo.profile  openid email';

    public static async signUp(signUpData: string[]) {
        const user: UserModel = new UserModel();

        const passwordHash = await bcrypt.hash(signUpData[2], 10);
        signUpData[2] = passwordHash;

        const result = await user.insert(signUpData);
        let statusCode = result.error ? 500 : 200;
        const userData = result.data?.rows[0];
        delete userData.password;

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

    public static oauthRedirect() {
        const authorizeUrl = oAuth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: Authentication.SCOPE,
            prompt: 'consent'
        });

        return authorizeUrl;
    }

    public static async oauthCallback(code: string) {
        const oauthResponse = await oAuth2Client.getToken(code as string);
        await oAuth2Client.setCredentials(oauthResponse.tokens);
        const user = oAuth2Client.credentials;
        const accessToken = user.access_token;

        const googleData = await getUserGoogleData(accessToken);
        return googleData;
    }



    public static async login(email: string) {

    }

    public static async oauthLogin(oauthID: string, name: string, email: string) {
        const oauthUser: OAuthUser = new OAuthUser();
        const user: UserModel = new UserModel();

        const currentUserData = (await oauthUser.getUserWithEmail(email));
        const userExists: boolean = currentUserData.data!.rows[0] ? true : false;

        if (!userExists) {
            const userResult = await user.insert([name, email, "oauth"]);
            if (userResult.error) {
                return {
                    statusCode: 500,
                    json: {
                        error: true,
                        message: "something went wrong"
                    }
                };
            }

            const userData = userResult.data?.rows[0];
            const result = await oauthUser.insert([oauthID, email,userData.id]);

            if (result.error) {
                return {
                    statusCode: 500,
                    json: {
                        error: true,
                        message: "something went wrong",
                    }
                }
            } else {
                delete userData.password;
                const token = Token.createToken(userData);

                return {
                    statusCode: 200,
                    json: {
                        error: false,
                        message: "user has been created successfully",
                        data: {
                            user: userData,
                            token: token
                        }
                    }
                };
            }
        } else {
            const result = await user.getUserWithEmail(email);
            let statusCode = result.error ? 500 : 200;
            const userData = result.data?.rows[0];
            userData ?? delete userData.password;
            return {
                statusCode: statusCode,
                json: {
                    error: result.error ?? false,
                    message: result.error ? "something went wrong" : "login was successful",
                    data: {
                        user: userData,
                        token: userData ? Token.createToken(userData) : null
                    }
                }
            };
        }
    }
}

export default Authentication;