import express from "express";
const testRouter = express.Router();
import {NextFunction, Response, Request} from "express";
import testCtrl from "../controllers/test.controller";
import {createConnection} from "typeorm";

// todo-nemanja testirati nesto slicno ovome

testRouter.get("/api/test", testCtrl.test_function);
testRouter.get("/api/users", testCtrl.user_helper_function);

export default testRouter;
