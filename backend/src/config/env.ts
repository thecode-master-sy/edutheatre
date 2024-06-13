import { config } from "dotenv";

config();

export default function env(key: string) {
    return {
        'port': process.env.PORT!,
        'secretKey': process.env.SECRET_KEY!,
        'envType': process.env.ENV_TYPE ?? "prod",
        'databaseURL': process.env.DATABASE_URL!,
        'accessTokenSecret': process.env.ACCESS_TOKEN_SECRET!,
        'redisURL': process.env.REDIS_URL!,
        'clientID': process.env.CLIENT_ID!,
        'clientSecret': process.env.CLIENT_SECRET!,
        'callbackUrl': process.env.CALLBACK_URL
    }[key];
}

