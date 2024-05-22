import { Router } from "express";
import { Auth } from "../controllers";
import { getBasicAuthHeader } from "../middlewares";
import { googlePassport } from "../strategies/google";

const auth: Router = Router();

auth.post("/sign-up",Auth.signUp);
auth.get("/login", getBasicAuthHeader,Auth.login);

auth.get("/google",googlePassport.authenticate('google'),);
auth.get("/google/redirect", googlePassport.authenticate('google'), Auth.oauthLogin);


export default auth;