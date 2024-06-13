import { Router } from "express";
import { Auth } from "../controllers";
import { getBasicAuthHeader } from "../middlewares";
import { OAuth2Client } from "google-auth-library";
import { env } from "../config";
import { getUserGoogleData } from "./../modules";
import { oAuth2Client } from "../strategies";

const auth: Router = Router();

auth.post("/sign-up", Auth.signUp);
auth.get("/login", getBasicAuthHeader, Auth.login);
auth.get("/google", Auth.oauthRedirect);

// auth.get("/google/callback",async (req,res) => {
//     return await Auth.oauthCallback(req,res);
// });

auth.get("/google/callback", async (req, res) => {
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
        console.log("logging");
        console.log("more logging");
        console.log("some test");
        console.log("just tesing");
        console.log("adding test");
        console.log("adding testing");  
        console.log("just testing");
        console.log("wonder testing");
        console.log("John Wick");
        console.log("We move again tomorrow");
        
        
        
        
        
        
        
        
        
        




        return res.json("Bingo")

    } catch (err) {
        console.log('Error logging in with OAuth2 user', err);
        return res.json("error")
    }


});

auth.get("/google/callback", async (req, res) => {
    const code = req.query.code;

    console.log(code);
    try {
        const redirectURL = "http://localhost:3000/api/auth/google/callback";

        const oAuth2Client = new OAuth2Client(
            env("clientID"),
            env("clientSecret"),
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




        return res.json("Bingo")

    } catch (err) {
        console.log('Error logging in with OAuth2 user', err);
        return res.json("error")
    }


});

export default auth;