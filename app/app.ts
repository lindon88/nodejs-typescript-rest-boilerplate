import "reflect-metadata";
import * as bodyParser from "body-parser";
import express from "express";
import testRouter from "./routes/test.routes";
import {createConnection} from "typeorm";

createConnection().then(async (connection) => {
    const app = express();

    app.use(bodyParser.json());
// route for test controller and route
    app.use(testRouter);

    /**
     * Start Express server.
     */
    const PORT = 8200;
    const server = app.listen(PORT, () => {
        console.log(
            "  App is running at http://localhost:%d in %s mode",
            PORT,
            app.get("env"),
        );
        console.log("  Press CTRL-C to stop\n");
    });
}).catch((error) => console.log("TypeORM connection error: ", error));
