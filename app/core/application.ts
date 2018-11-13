import "reflect-metadata";
import * as bodyParser from "body-parser";
import express, {NextFunction} from "express";
import {createConnection} from "typeorm";
import dbConfig from "../config/db.config";
import SwaggerConfig from "../config/swagger.config";
import TsdocConfig from "../config/tsdoc.config";
import Router from "../routes";

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
    public bootstrap() {
        this.databaseConnect().then( () => {
            this.serverStart();
        }).catch((error: any) => console.log("TypeORM connection error: ", error));
    }

    /**
     * Get server
     */
    public getServer() {
        return this.expressServer;
    }

    /**
     * Start server
     */
    private serverStart() {
        // Enable CORS
        this.enableCORS("http://localhost:8080");
        this.expressServer.use(bodyParser.json());

        // register controllers and routes
        Router.register(this.expressServer);

        // register swagger config and docs config
        SwaggerConfig.register(this.expressServer);
        TsdocConfig.register(this.expressServer);

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
    }

    /**
     * Connect to database
     */
    private async databaseConnect() {
        const options = this.dbOptions;
        return await createConnection(
            options,
        );
    }

    /**
     * Enable CORS for defined url
     * @param url
     */
    private enableCORS(url: any) {
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
