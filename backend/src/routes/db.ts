import { Router } from "express";
import { DB } from "../controllers";

const db: Router = Router();

db.get("/create", DB.create);
db.get("/drop", DB.drop);


export default db;