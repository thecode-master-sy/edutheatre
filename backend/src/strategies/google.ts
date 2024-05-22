import { Strategy as GoogleStrategy } from "passport-google-oauth2";
import passport from "passport";
import { env } from "../config";

const GOOGLE_CLIENT_ID: string = env("clientID")!;
const GOOGLE_CLIENT_SECRET: string = env("clientSecret")!;
const CALLBACK_URL: string = env("CALLBACK_URL")!;


passport.serializeUser((user, done) => {
    return done(null, user);
});

passport.use(
    new GoogleStrategy({
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: CALLBACK_URL + "/api/auth/google/redirect",
        scope: ["profile", "email"]
    },
        (accessToken, refreshToken, profile, done) => {
            return done(null, profile);
        })
);
export { passport as googlePassport };