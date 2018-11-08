import "reflect-metadata";
import * as bodyParser from "body-parser";
import express from "express";
import {createConnection} from "typeorm";
import dbConfig from "../config/db.config";
import {useExpressServer} from "routing-controllers";
import SwaggerConfig from "../config/swagger.config";
import LoggerConfig from "../config/logger.config";
import TestController from "../controllers/test.controller";

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

    public getServer = () => {
        return this.expressServer;
    }

    private serverStart = () => {
        this.expressServer.use(bodyParser.json());

        // route for test controller and route
        useExpressServer(this.expressServer, {
            controllers: [TestController],
        })
        SwaggerConfig.register(this.expressServer);
        // start logger
        LoggerConfig.register().debug("Poruka!");
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
