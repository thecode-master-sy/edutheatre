import { Router } from "express";
import { Auth } from "../controllers";
import { getBasicAuthHeader } from "../middlewares";

const auth: Router = Router();

auth.post("/sign-up", Auth.signUp);
auth.get("/login", getBasicAuthHeader, Auth.login);
auth.get("/google", Auth.oauthRedirect);
auth.get("/google/callback",Auth.oauthCallback);

export default auth;