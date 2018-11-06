import express from "express";
import TestController from "../controllers/test.controller";

class TestRouter {
    public register = (app: any) => {
        const routes = express.Router();
        const testCtrl = new TestController();
        routes.get("/api/test", testCtrl.test_function);
        routes.get("/api/users", testCtrl.user_helper_function);

        app.use(routes);
    }
}

export default new TestRouter();
