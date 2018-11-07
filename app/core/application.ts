import "reflect-metadata";
import * as bodyParser from "body-parser";
import testRouter from "../routes/test.routes";
import express from "express";
import {createConnection} from "typeorm";
import dbConfig from "../config/db.config";
import pathResolve = require("path");
import * as swagger from "swagger-express-ts";
import {SwaggerDefinitionConstant} from "swagger-express-ts";

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
        this.expressServer.use("/api-docs/swagger", express.static("docs/swagger"));
        this.expressServer.use("/api-docs/swagger/assets", express.static("node_modules/swagger-ui-dist"));
        this.expressServer.use(swagger.express(
            {
                definition : {
                    info : {
                        title : "My api" ,
                        version : "1.0",
                    } ,
                    externalDocs : {
                        url : "My url",
                    },
                    // Models can be defined here
                },
            },
        ));
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
