import { Request, Response } from "express";
import sharp from "sharp";
import * as fs from "fs";

class User {

    public static async profilePic(req: Request,res: Response){

        const image = req.file!;
        const extensionName = image.mimetype.split("/")[1];
        const filePath = image.path;
        const outputPath = `compressed/${image.filename}`;
        const filename = image.filename;
        const userID = res.locals.data.id;
        console.log(filePath);
        


        sharp(filePath).toFile(outputPath, async (err, info) => {
            if (err) {
                return res.status(500).send("Error compressing image.");
            }
            const fileData = fs.readFileSync(outputPath);
            const base64Data = `data:image/${extensionName};base64,` + fileData.toString("base64");

            if (fs.existsSync(filePath) && fs.existsSync(outputPath)) {
                fs.unlinkSync(outputPath);
                fs.unlinkSync(filePath);
                // const profilePictureExists = await ProfilePicture.findOne({ userID: userID });
                const profilePictureExists = false;

                if (!profilePictureExists) {
                    return res.status(200).send(base64Data);
                } else {
                    return res.status(400).json({
                        error: true,
                        message: "profile picture already exists"
                    });
                }
            } else {
                return res.status(404).send(`File ${filename} not found.`);
            }
        });
    }
}

export default User;