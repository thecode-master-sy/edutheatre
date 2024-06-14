import { Router } from "express";
import { User } from "../controllers";
import { uploads } from "../middlewares";
import { profilePicRateLimit } from "../middlewares/rateLimits";

const user: Router = Router();

user.post("/uploads/profile-pic", profilePicRateLimit,uploads.single("image"),User.profilePic);

user.get("/profile",User.getProfile);


export default user;    