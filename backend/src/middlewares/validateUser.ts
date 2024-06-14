import { NextFunction, Response, Request } from "express";
import { UserRepo } from "../repos";

async function validateUser(req: Request, res: Response, next: NextFunction) {
    const email = res.locals.data.email;
    const user = await UserRepo.getUserWithEmail(email);
    
    if (!user) {
        return res.status(404).json({
            error: true,
            message: "user does not exist"
        });
    }

    next();
}

export default validateUser;