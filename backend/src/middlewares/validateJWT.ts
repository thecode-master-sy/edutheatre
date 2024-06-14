import { Request, Response, NextFunction } from 'express';
import { Token } from '../services';

const validateJWT = (tokenDetails: string[], neededData: string[] = ['data']) => (req: Request, res: Response, next: NextFunction) => {
    if (!req.headers.authorization || req.headers.authorization.indexOf('Bearer ') === -1) {
        return res.status(401).json({ message: 'Missing Bearer Authorization Header' });
    }

    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
        return res.status(401).json({
            error: true,
            message: "Access Token missing"
        });
    }
    const tokenValidationResult: any = Token.validateToken(token, tokenDetails[0], tokenDetails[1]);

    if (tokenValidationResult.error === true) {
        if (tokenValidationResult.decodingError) {
            return res.status(400).json({
                error: true,
                message: tokenValidationResult.decodingError,
            });
        }

        if (tokenValidationResult.typeError) {
            return res.status(400).json({
                error: true,
                message: tokenValidationResult.typeError,
            });
        }
    }
    for (let item of neededData) {
        res.locals[item] = tokenValidationResult.decoded[item];
    }
    next();
}

export default validateJWT;