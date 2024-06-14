import { DB as DBService } from "../services";
import { Response,Request } from "express";


class DB {

    public static async create(req: Request, res: Response){
        const serviceResult = await DBService.create();
        return res.status(serviceResult.statusCode).json(serviceResult.jsonData);
    }

    public static async drop(req: Request, res: Response){
        const serviceResult = await DBService.drop();
        return res.status(serviceResult.statusCode).json(serviceResult.jsonData);
    }
}

export default DB;