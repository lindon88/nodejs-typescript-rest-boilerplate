import express from "express";
import TestController from "../controllers/test.controller";
import swaggerUi = require("swagger-ui-express");

class TestRouter {
    public register = (app: any) => {
        const routes = express.Router();
        const testCtrl = new TestController();
        routes.get("/api/test", testCtrl.test_function);
        routes.get("/api/users", testCtrl.user_helper_function);
        const swaggerDoc = require("../../swagger.json");
        const options = {
            explorer: true,
        };
        app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDoc, options));
        app.use(routes);
    }
}

export default new TestRouter();
