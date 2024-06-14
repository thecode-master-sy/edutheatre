import Model from "./Model";

class ProfilePic extends Model {

    public constructor() {
        super();
        this.tblName = 'profile_pic';
        this.createQuery = `CREATE TABLE IF NOT EXISTS ${this.tblName} (
            id SERIAL PRIMARY KEY,
            user_id INTEGER,
            CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
            image_data TEXT NOT NULL,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP
        )`;
    }

    public async insert(values: any[]) {
        return await this.queryWithParams(`INSERT INTO ${this.tblName} (user_id, image_data) VALUES ($1, $2) RETURNING *`, values);
    }

    public async getImageWithUserID(userId: string) {
        return await this.queryWithParams(`SELECT * FROM ${this.tblName} WHERE user_id = $1`, [userId]);
    }

    public async getUserWithID(id: string) {
        return await this.queryWithParams(`SELECT * FROM ${this.tblName} WHERE id = $1`, [id]);
    }




}

export default ProfilePic;