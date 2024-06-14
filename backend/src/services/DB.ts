import { User, OAuthUser, ProfilePic } from "../models";

class DB {

    public static async create() {
        const createdAll = [
            await (new User()).create(),
            await (new OAuthUser()).create(),
            await (new ProfilePic()).create(),
        ];

        return createdAll.includes(false) ?
            {
                statusCode: 500,
                jsonData: {
                    error: true,
                    message: "something went wrong"
                }
            } :

            {
                statusCode: 201,
                jsonData: {
                    error: true,
                    message: "tables has been created successfully"
                }
            };
    }

    public static async drop(){
        const createdAll = [
            await (new OAuthUser()).drop(),
            await (new ProfilePic()).drop(),
            await (new User()).drop(),
        ];

        return createdAll.includes(false) ?
            {
                statusCode: 500,
                jsonData: {
                    error: true,
                    message: "something went wrong"
                }
            } :

            {
                statusCode: 200,
                jsonData: {
                    error: true,
                    message: "tables has been dropped successfully"
                }
            };
    }

}

export default DB;

