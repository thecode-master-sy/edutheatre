import cors from "cors";


const origins: string[] = [
    // "http://localhost:5500",
    "*"
];

const corsConfig =cors({
    origin: origins,
    credentials: true
});

export default corsConfig;