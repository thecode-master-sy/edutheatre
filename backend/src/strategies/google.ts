import { OAuth2Client } from "google-auth-library";
import { env } from "../config";

const GOOGLE_CLIENT_ID: string = env("clientID")!;
const GOOGLE_CLIENT_SECRET: string = env("clientSecret")!;
const REDIRECT_URL: string = env("callbackUrl")!;

const oAuth2Client = new OAuth2Client(
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    REDIRECT_URL
);

export default oAuth2Client;    