import express from "express";
import * as swagger from "swagger-express-ts";

/**
 * Configuration file for swagger
 */
class SwaggerConfig {
    /**
     * Callable bootstrap function
     * @param app
     */
    public register = (app: any) => {
        this.routes(app);
    };

    /**
     * Basic info about api docs
     */
    private config = () => {
        return {
            definition: {
                info: {
                    title: "NodeJS TypeScript Boilerplate",
                    version: "1.0",
                },
                // Models can be defined here
            },
        };
    };

    /**
     * Registering routes for docs
     * @param app
     */
    private routes = (app: any) => {
        app.use("/api-docs/swagger", express.static("docs/swagger"));
        app.use("/api-docs/swagger/assets", express.static("node_modules/swagger-ui-dist"));
        app.use(swagger.express(this.config()));
    }
}

export default new SwaggerConfig();
