import Model from "./Model";

class OAuthUser extends Model {

    public constructor() {
        super();
        this.tblName = 'oauth_users';
        this.createQuery = `CREATE TABLE IF NOT EXISTS ${this.tblName} (
            id SERIAL PRIMARY KEY,
            oauth_id TEXT NOT NULL UNIQUE,
            email TEXT UNIQUE NOT NULL,
            user_id INTEGER,
            CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP
        )`;
    }

    public async insert(values: any[]) {
        return await this.queryWithParams(`INSERT INTO ${this.tblName} (oauth_id, email,user_id) VALUES ($1, $2, $3) RETURNING *`, values);
    }

    public async getUserWithEmail(email: string) {
        return await this.queryWithParams(`SELECT * FROM ${this.tblName} WHERE email = $1`, [email]);
    }


}

export default OAuthUser;