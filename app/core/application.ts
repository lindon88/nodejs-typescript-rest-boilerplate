import "reflect-metadata";
import * as bodyParser from "body-parser";
import testRouter from "../routes/test.routes";
import express from "express";
import {createConnection} from "typeorm";
import dbConfig from "../config/db.config";
import pathResolve = require("path");

import SwaggerConfig from "../config/swagger.config";

class Application {
    private expressServer: any;
    private dbOptions: any;
    constructor() {
        this.expressServer = express();
        this.dbOptions = dbConfig.connection();
    }

    public bootstrap = () => {
        this.databaseConnect().then( () => {
            this.serverStart();
        }).catch((error: any) => console.log("TypeORM connection error: ", error));
    }

    private serverStart = () => {
        this.expressServer.use(bodyParser.json());

        // route for test controller and route
        testRouter.register(this.expressServer);
        SwaggerConfig.register(this.expressServer);
        /**
         * Start Express server.
         */
        const PORT = 8200;
        const server = this.expressServer.listen(PORT, () => {
            console.log(
                "  App is running at http://localhost:%d in %s mode",
                PORT,
                this.expressServer.get("env"),
            );
            console.log("  Press CTRL-C to stop\n");
        });
    }

    private databaseConnect = async () => {
        const options = this.dbOptions;
        return await createConnection(
            options,
        );
    }
}

export default new Application();
