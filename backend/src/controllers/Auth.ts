import { Request, Response } from "express";
import { User as Authentication, Token } from "./../services";
import { emailValidator } from "../modules";
import { UserRepo } from "../repos";
import bcrypt from "bcrypt";
import { OAuth2Client } from "google-auth-library";
import { env } from "../config";
import { getUserGoogleData } from "./../modules";

class Auth {

    public static async signUp(req: Request, res: Response) {
        const { name, email, password, } = req.body;
        if (password.length < 5) {
            return res.status(400).json({
                error: true,
                message: "password length must be greater than 4",
            });
        }

        if (!emailValidator(email)) {
            return res.status(400).json({
                error: false,
                message: "invalid email"
            });
        }

        const emailExists = await UserRepo.getUserWithEmail(email);

        if (!emailExists) {
            const serviceResult = await Authentication.signUp([name, email, password]);
            return res.status(serviceResult.statusCode).json(serviceResult.json);
        }

        return res.status(400).json({
            error: false,
            message: "email already exists"
        });
    }

    public static async login(req: Request, res: Response) {
        const [email, password] = [res.locals.email, res.locals.password];
        const user = await UserRepo.getUserWithEmail(email);
        if (user) {
            const validPassword = await bcrypt.compare(password, user.password as string);
            if (validPassword) {
                const accessToken = Token.createToken(user);

                return res.status(200).json({
                    error: false,
                    message: "login was successful",
                    data: {
                        user: user,
                        token: accessToken
                    }
                });
            }
            return res.status(400).json({
                error: true,
                message: "invalid password"
            });
        }

        return res.status(404).json({
            error: true,
            message: "email does not exit",
        });
    }

    public static async oauthRedirect(req: Request, res: Response) {
        res.header("Access-Control-Allow-Origin", 'http://localhost:5173');//TODO: use a loop here
        res.header("Access-Control-Allow-Credentials", 'true');
        res.header("Referrer-Policy", "no-referrer-when-downgrade");

        const serviceResult = Authentication.oauthRedirect();
        return res.status(200).json({
            'error': false,
            'data': serviceResult
        });
    }

    // public static async oauthCallback(req: Request, res: Response){
    //     const code = req.query.code as string;
    //     const serviceResult = await Authentication.oauthCallback(code);
    //     // return res.status(301).json("hello");
    //     return await getUserGoogleData(serviceResult);
    // }

    public static async oauthCallback(req: Request, res: Response) {
        const code = req.query.code;

        console.log(code);
        try {
            const redirectURL = "http://localhost:3000/api/auth/google/callback";

            const oAuth2Client = new OAuth2Client(
                process.env.CLIENT_ID,
                process.env.CLIENT_SECRET,
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
            // console.log(user.access_token);
            await getUserGoogleData(accessToken);
            console.log("BINGO");
            


            return res.json("Bingo")

        } catch (err) {
            console.log('Error logging in with OAuth2 user', err);
            return res.json("error")
        }
    }

}

export default Auth;