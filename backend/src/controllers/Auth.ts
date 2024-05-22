import { Request, Response } from "express";
import { User, Token } from "./../services";
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
            const serviceResult = await User.signUp([name, email, password]);
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
                    data:{
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

    public static async oauthLogin(req: Request, res: Response){
        let name: string;
        let oauthID: string;
        // const { id, displayName } = (req.session as any).passport.user;
        // name = displayName;
        // oauthID = id;

        console.log((req.session as any).passport.user);
        
        return true;



        // const username = "user-" + Date.now();
        // const currentUser = true //await User.findOne({ oauthID: oauthID, type: type });
        // if (currentUser) {
        //     // const { accessToken, expirationDate } = createAccessToken(currentUser.id);

        //     // return res.redirect(envConfigs("OAUTH_LOGIN_REDIRECT_URL")! + "?accessToken=" + encodeURIComponent(accessToken));
        // } else {
        //     const user = new User();

        //     try {
        //         // user.save();
        //         const accessToken = Token.createToken(user);

        //         return res.redirect(env("OAUTH_LOGIN_REDIRECT_URL")! + "?accessToken=" + encodeURIComponent(accessToken));
        //     } catch (error) {
        //         return res.redirect(env("OAUTH_LOGIN_REDIRECT_URL")! + "?error=" + encodeURIComponent("something went wrong"));
        //     }
        // }
    }

}

export default Auth;