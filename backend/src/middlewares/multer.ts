
import multer, { FileFilterCallback } from "multer";
import * as path from "path"
import { Request, Express } from "express";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
    const allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (!allowedMimeTypes.includes(file.mimetype)) {
        return cb(new Error("LIMIT_INVALID_FILE_TYPE"));
    }
    return cb(null, true);
}
const uploads = multer({
    storage: storage,
    limits: {
        fileSize: 4.5 * 1024 * 1024
    },
    fileFilter: fileFilter
});

export default uploads;
