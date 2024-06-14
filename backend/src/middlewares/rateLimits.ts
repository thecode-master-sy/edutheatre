import { rateLimit } from "express-rate-limit";
import { Response,Request } from "express";

function rateLimitHandler(message: string = "Too many requests, please try again later") {
    return (req: Request, res: Response) => {
        return res.status(429).json({
            error: true,
            message: message,
        });
    }
}

export const profilePicRateLimit = rateLimit({
    windowMs: 3 * 1000,
    max: 1,
    standardHeaders: true,
    legacyHeaders: false,
    skipFailedRequests: true,
    statusCode: 429,
    handler: rateLimitHandler() 
});

