import cluster from "cluster";
import * as os from "os";
import createApp from "./app";
import {env} from "./config";

const app = createApp();
let environmentType = env('envType');
const PORT = env('port');

function startServer() {
    const numCpu = os.cpus().length;

    if (cluster.isPrimary) {
        for (let i = 0; i < numCpu; i++) {
            cluster.fork();
        }

        cluster.on('exit', (worker, code, signal) => {
            console.log(`worker ${worker.process.pid} died`);
            cluster.fork();
        });
    } else {
        app.listen(PORT, () => {
            console.log(`pid - ${process.pid}`);

            console.log(`server running on port - ${PORT}\n`)
        });
    }
}

if (environmentType == "dev") {
    app.listen(PORT, () => console.log(`server running on port - ${PORT}`));
} else {
    startServer();
}