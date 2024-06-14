
import { Response, Request, NextFunction } from "express";
import multer from "multer";

const handleErrors = (err: any, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({
                error: true,
                message: 'File exceeds the allowed limit'
            });
        }
        if (err.code === 'LIMIT_UNEXPECTED_FILE') {
            return res.status(400).json({
                error: true,
                message: 'Unexpected field in the request'
            });
        }
    }
    if (err.message === 'LIMIT_INVALID_FILE_TYPE') {
        return res.status(400).json({
            error: true,
            message: 'invalid file type'
        });
    }
    next();
}

export default handleErrors;
