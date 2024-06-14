import { Request, Response } from "express";
import { Authentication, Token } from "./../services";
import { emailValidator } from "../modules";
import { UserRepo } from "../repos";
import bcrypt from "bcrypt";
import { env } from "../config";

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
                delete user.password;
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
        return res.status(301).redirect(serviceResult);
    }

    public static async oauthCallback(req: Request, res: Response) {
        const code = req.query.code;
        const googleData = await Authentication.oauthCallback(code as string);

        if (googleData.error) {
            return res.status(500).json({
                error: true,
                message: googleData.message,
            });
        }

        const serviceResult = await Authentication.oauthLogin(googleData.data.sub, googleData.data.name, googleData.data.email);


        // return res.status(serviceResult.statusCode).json(serviceResult.json);
        const token = serviceResult.json.data?.token;
        const frontendRedirect = env("frontendRedirect")!;
        return res.status(301).redirect(frontendRedirect+token);
    }

}

export default Auth;