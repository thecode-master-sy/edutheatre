import { OAuthUser, User as UserModel } from "../models";
import { Token } from ".";
import bcrypt from "bcrypt";
import { OAuth2Client } from "google-auth-library";
import { env } from "../config";
import { getUserGoogleData } from "./../modules";
import { oAuth2Client } from "../strategies";

class Authentication {

    private static GOOGLE_CLIENT_ID: string = env("clientID")!;
    private static GOOGLE_CLIENT_SECRET: string = env("clientSecret")!;
    private static REDIRECT_URL: string = env("callbackUrl")!;
    private static SCOPE: string = 'https://www.googleapis.com/auth/userinfo.profile  openid email';


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

    public static oauthRedirect() {
        const authorizeUrl = oAuth2Client.generateAuthUrl({
            access_type: 'offline',
            scope: Authentication.SCOPE,
            prompt: 'consent'   
        });

        return authorizeUrl;
    }

    public static async oauthCallback(code: string) {
        try {
            const redirectURL = "http://localhost:3000/api/auth/google/callback";

            const oAuth2Client = new OAuth2Client(
                Authentication.GOOGLE_CLIENT_ID,
                Authentication.GOOGLE_CLIENT_SECRET,
                redirectURL
            );
            const r = await oAuth2Client.getToken(code as string);
            // Make sure to set the credentials on the OAuth2 client.
            await oAuth2Client.setCredentials(r.tokens);
            console.info('Tokens acquired.');
            const user = oAuth2Client.credentials;
            console.log('credentials', user);
            const accessToken = user.access_token;
            // await getUserData(oAuth2Client.credentials.access_token);
            console.log("access token" ,accessToken);

            // const userData = await getUserGoogleData(accessToken);
            // console.log(userData);
            
            return accessToken;
        } catch (err) {
            console.log('Error logging in with OAuth2 user', err);
            return {
                statusCode: 500,
                jsonData: {
                    error: true,
                    message: "something went wrong"
                }
            };
        }
    }

    public static async login(email: string) {

    }

    // public static async 

    public static async oauthLogin(oauthID: string, name: string, email: string) {
        const oauthUser: OAuthUser = new OAuthUser();
        const user: UserModel = new UserModel();

        const userExists = await oauthUser.getUserWithEmail(email);

        if (!userExists) {
            const result = await oauthUser.insert([oauthID, email]);
            if (result.error) {
                return {
                    statusCode: 500,
                    json: {
                        error: true,
                        message: "something went wrong"
                    }
                };
            }

            const userResult = await user.insert([name, email, "oauth"]);
            const userData = userResult.data?.rows[0];
            const token = Token.createToken(userData);

            if (result.error) {
                return {
                    statusCode: 500,
                    json: {
                        error: true,
                        message: "something went wrong",
                    }
                }
            } else {
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
    }
}

export default Authentication;