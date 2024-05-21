import express, { Application, NextFunction, Request, Response } from "express";
import morgan from "morgan";
import { redisConfig,corsConfig } from "./config";
import Redis from 'ioredis';
import { auth } from "./routes";

// import { Model,Users } from "./models";

function createApp() {
    const app: Application = express();
    const redisEnv = redisConfig('dev');
    const redisClient = new Redis(redisEnv!);

    app.use(express.urlencoded({ extended: true }));
    app.use(corsConfig);

    app.use(express.json());
    app.use(morgan("combined"));
    app.use((req: Request, res: Response, next: NextFunction) => { res.locals['redisClient'] = redisClient;next() });

    app.use("/api/auth",auth);

    app.get("/test", async (req: Request, res: Response) => {
        try {
            // await redisClient.set("user", "wonder");
            return res.status(200).json({
                'error': false,
                'message': "m.create()"
            });
        } catch (err) {
            console.error('Error creating item:', err);
        }

    });

    app.get("/test1", async (req: Request, res: Response) => {
        try {
            const value = await redisClient.get("user");
            return res.status(200).json({
                'error': false,
                'message': value
            });
        } catch (err) {
            console.error('Error creating item:', err);
        }
    });

    app.get("/", (req: Request, res: Response) => {
        res.status(200).json({
            'error': false,
            'message': process.pid
        });
    });

    return app;
}


export default createApp;