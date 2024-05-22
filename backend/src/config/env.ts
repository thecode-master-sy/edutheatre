import { config } from "dotenv";

config();

export default function env(key: string){
    return {
        'port': process.env.PORT!,
        'secretKey': process.env.SECRET_KEY!,
        'envType': process.env.ENV_TYPE ?? "prod",
        'databaseURL': process.env.DATABASE_URL!,
        'accessTokenSecret': process.env.ACCESS_TOKEN_SECRET!
    }[key];
}

