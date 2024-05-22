import session from 'express-session';
import env from './env';
import MemoryStore from "memorystore";

const memoryStore = MemoryStore(session);
const sessionConfig = session({
    secret: env('secretKey')!,
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 86400000 },
    store: new memoryStore({
        checkPeriod: 86400000
    }),
});


export default sessionConfig;