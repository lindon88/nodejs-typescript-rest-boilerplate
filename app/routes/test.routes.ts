import express from "express";
const testRouter = express.Router();
import {NextFunction, Response, Request} from "express";
import testCtrl from "../controllers/test.controller";
import {User} from '../models/User';
import {createConnection, getConnection} from "typeorm";

testRouter.get("/api/test", (req: Request, res: Response, next: NextFunction) => {
    testCtrl.test_function(req, res, next);
});
testRouter.get('/api/users', async(req: Request, res: Response, next: NextFunction) => {
    return getConnection('default').getRepository(User).find();
});

export default testRouter;
