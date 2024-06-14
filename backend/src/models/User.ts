import Model from "./Model";

class User extends Model {

    public constructor() {
        super();
        this.tblName = 'users';
        this.createQuery =  `CREATE TABLE IF NOT EXISTS ${this.tblName} (
            id SERIAL PRIMARY KEY,
            email VARCHAR(50) UNIQUE NOT NULL,
            name VARCHAR(70) NOT NULL,
            role VARCHAR(20) DEFAULT 'user',
            password TEXT NOT NULL,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP
        )`;
    }

    public async insert(values: any[]){
        return await this.queryWithParams(`INSERT INTO ${this.tblName} (name, email, password) VALUES ($1, $2, $3) RETURNING *`, values);
    }

    public async getUserWithEmail(email: string){
        return await this.queryWithParams(`SELECT * FROM ${this.tblName} WHERE email = $1`,[email]);
    }

    // public async getUserWithID(id: string) {
    //     return await this.queryWithParams(`SELECT * FROM ${this.tblName} WHERE id = $1`, [email]);
    // }


}

export default User;