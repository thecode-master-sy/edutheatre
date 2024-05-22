import { Router } from "express";
import { Auth } from "../controllers";
import { getBasicAuthHeader } from "../middlewares";

const auth: Router = Router();

auth.post("/sign-up",Auth.signUp);
auth.get("/login", getBasicAuthHeader,Auth.login);


export default auth;