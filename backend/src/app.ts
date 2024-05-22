import express, { Application, NextFunction, Request, Response } from "express";
import morgan from "morgan";
<<<<<<< HEAD
import { corsConfig } from "./config";
=======
import { redisConfig, corsConfig, sessionConfig } from "./config";
import Redis from 'ioredis';
>>>>>>> 7fa6a9aa1fad00011e0be70956242ef26d8541c6
import { auth } from "./routes";
import { User } from "./models";


function createApp() {
    const app: Application = express();
<<<<<<< HEAD
=======
    const redisEnv = redisConfig('dev');
    // const redisClient = new Redis(redisEnv!);

>>>>>>> 7fa6a9aa1fad00011e0be70956242ef26d8541c6
    app.use(express.urlencoded({ extended: true }));
    app.use(corsConfig);
    app.use(sessionConfig);

    app.use(express.json());
    app.use(morgan("combined"));
    // app.use((req: Request, res: Response, next: NextFunction) => { res.locals['redisClient'] = redisClient;next() });

    app.use("/api/auth", auth);

    app.get("/test", async (req: Request, res: Response) => {
        try {
            // await redisClient.set("user", "wonder");
            return res.status(200).json({
                'error': false,
                'message': await (new User()).create()
            });
        } catch (err) {
            console.error('Error creating item:', err);
        }

    });

<<<<<<< HEAD
   
=======
    // app.get("/test1", async (req: Request, res: Response) => {
    //     try {
    //         const value = await redisClient.get("user");
    //         return res.status(200).json({
    //             'error': false,
    //             'message': value
    //         });
    //     } catch (err) {
    //         console.error('Error creating item:', err);
    //     }
    // });

>>>>>>> 7fa6a9aa1fad00011e0be70956242ef26d8541c6
    app.get("/", (req: Request, res: Response) => {
        res.status(200).json({
            'error': false,
            'message': process.pid
        });
    });

    return app;
}


export default createApp;
