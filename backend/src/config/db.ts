import { Pool } from 'pg';
import {env} from './index';

const pool = new Pool({
    connectionString: env('databaseURL')
});

export default pool;
