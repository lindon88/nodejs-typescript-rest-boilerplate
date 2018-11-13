import "reflect-metadata";
import * as bodyParser from "body-parser";
import express, {NextFunction} from "express";
import {createConnection} from "typeorm";
import dbConfig from "../config/db.config";
import {useExpressServer} from "routing-controllers";
import SwaggerConfig from "../config/swagger.config";
import LoggerConfig from "../config/logger.config";
import TsdocConfig from "../config/tsdoc.config";
import TestController from "../controllers/test.controller";
import ExampleController from "../controllers/example.controller";

class Application {
    private expressServer: any;
    private dbOptions: any;
    constructor() {
        this.expressServer = express();
        this.dbOptions = dbConfig.connection();
    }

    /**
     * Application bootstrap
     */
    public bootstrap = () => {
        this.databaseConnect().then( () => {
            this.serverStart();
        }).catch((error: any) => console.log("TypeORM connection error: ", error));
    };

    /**
     * Get server
     */
    public getServer = () => {
        return this.expressServer;
    };

    /**
     * Start server
     */
    private serverStart = () => {
        this.expressServer.use(bodyParser.json());

        // route for test controller and route
        useExpressServer(this.expressServer, {
            validation: true,
            controllers: [TestController, ExampleController],
        });

        // register swagger config and docs config
        SwaggerConfig.register(this.expressServer);
        TsdocConfig.register(this.expressServer);

        // Enable CORS
        this.enableCORS("http://localhost:8080");

        /**
         * Start Express server.
         */
        const PORT = process.env.PORT || 8200;
        const server = this.expressServer.listen(PORT, () => {
            console.log(
                "  App is running at http://localhost:%d in %s mode",
                PORT,
                this.expressServer.get("env"),
            );
            console.log("  Press CTRL-C to stop\n");
        });
    };

    /**
     * Connect to database
     */
    private databaseConnect = async () => {
        const options = this.dbOptions;
        return await createConnection(
            options,
        );
    }

    /**
     * Enable CORS for defined url
     * @param url
     */
    private enableCORS = (url: any) => {
        this.expressServer.use( (req: any, res: any, next: any) => {
            res.set({
                "Access-Control-Allow-Origin": url,
                "Access-Control-Allow-Credentials": true,
                "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT,DELETE",
                "Access-Control-Allow-Headers": "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, " +
                    "Access-Control-Request-Headers, authorization, Pragma, Cache-Control, synergy-login-token, If-Modified-Since, user-id, corporate-id",
            });

            // intercept pre-flight (options method) request
            if ("OPTIONS" === req.method) {
                res.sendStatus(204);
            } else {
                next();
            }
        });
    }
}

export default new Application();
