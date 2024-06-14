import { Request, Response } from "express";
import sharp from "sharp";
import * as fs from "fs";
import { ProfilePic ,User as UserModel} from "../models";

class User {

    public static async profilePic(req: Request, res: Response) {

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

                const profilePic = new ProfilePic();

                const profilePictureExists = (await profilePic.getUserWithID(userID)).data?.rows[0];

                if (!profilePictureExists) {
                    const insertedProfilePic = (await profilePic.insert([userID, base64Data]));

                    if (insertedProfilePic.error) {
                        return res.status(500).json({
                            statusCode: 500,
                            jsonData: {
                                error: true,
                                message: "something went wrong"
                            }
                        });
                    }
                    return res.status(200).json({
                        statusCode: 200,
                        jsonData: {
                            error: false,
                            data: base64Data
                        }
                    });
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

    public static async getProfile(req: Request, res: Response){
        const userID = res.locals.data.id;

        const userProfile = await (new UserModel()).getUserWithID(userID);

        if(userProfile.error){
            return res.status(500).json({
                statusCode: 500,
                jsonData: {
                    message: "something went wrong",
                    error: true
                }
            });
        }

        const userProfileData = userProfile.data?.rows[0];
        delete userProfileData.password;
        return res.status(200).json({
            statusCode: 200,
            jsonData: {
                data: userProfileData,
                error: false
            }
        });
    }
}

export default User;