import { Pool } from "pg";
import { pool } from "../config";

class Model {

    protected pool: Pool;
    protected createQuery: string | undefined;
    protected tblName: string | undefined;
    protected selectSql: string;


    public constructor() {
        this.pool = pool;
        this.selectSql = `SELECT * FROM ${this.tblName}`;
    }

    // protected async query(sql: string) {
    //     try {
    //         const [results] = await this.pool.query(sql);
    //         return Model.queryResults(false, results);
    //     } catch (error) {
    //         console.error(error);
    //         return Model.queryResults(true, []);

    //     }
    // }

    public async create() {
        try {
            await this.pool.query(this.createQuery!);
            return true;
        } catch (error) {
            console.error(error);
            return false
        }
    }

    public async query(sql: string) {
        try {
            const data = await this.pool.query(sql);
            return {
                error: false,
                data: data
            };
        } catch (err) {
            console.error(err);
            return {
                error: false,
                data: null
            };
        }
    }

    public async queryWithParams(sql: string, values: any[]) {
        try {
            const data = await this.pool.query(sql, values);
            return {
                error: false,
                data: data
            };
        } catch (err) {
            console.error(err);
            return {
                error: false,
                data: null
            };
        }
    }
}

export default Model;