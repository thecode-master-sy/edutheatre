import express, { Application, NextFunction, Request, Response } from "express";
import morgan from "morgan";
import {  corsConfig, env } from "./config";
import Redis from 'ioredis';
import { auth } from "./routes";
import { OAuthUser, User } from "./models";
import session from "express-session";
// import { googlePassport } from "./strategies/google";
import { OAuth2Client } from "google-auth-library";


function createApp() {
    const app: Application = express();
    // const redisEnv = redisConfig('dev'); 
    // const redisClient = new Redis(redisEnv!);

    app.use(express.urlencoded({ extended: true }));
    app.use(corsConfig);

    app.use(
        session({
            secret: env("secretKey")!, // session secret
            resave: false,
            saveUninitialized: false,
        })
    );

    // app.use(googlePassport.initialize());
    // app.use(googlePassport.session());


    // app.use(sessionConfig);
    // app.use(googlePassport.initialize());
    // app.use(googlePassport.session());


    app.use(express.json());
    app.use(morgan("combined"));
    // app.use((req: Request, res: Response, next: NextFunction) => { res.locals['redisClient'] = redisClient;next() });

    app.use("/api/auth", auth);

    app.get("/test", async (req: Request, res: Response) => {
        try {
            // await redisClient.set("user", "wonder");
            return res.status(200).json({
                'error': false,
                // 'message': await (new User()).create()
            });
        } catch (err) {
            console.error('Error creating item:', err);
        }

    });

    app.get("/admin/migrate", async (req: Request, res: Response) => {
        try {
            const created: boolean[] = [
                await (new User()).create(),
                await (new OAuthUser()).create()
            ];

            return res.status(400).json({
                error: true,
                message: "work on this route",
                data: created
            });
        } catch (err) {
            console.error(err);
            return res.status(500).json({
                error: true,
                message: "something went wrong"
            });
        }
    });

    app.get("/", (req: Request, res: Response) => {
        res.status(200).json({
            'error': false,
            'message': process.pid
        });
    });

    // app.post("/")

    return app;
}


export default createApp;