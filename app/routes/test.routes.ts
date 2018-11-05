import express from "express";
const testRouter = express.Router();
import testCtrl from "../controllers/test.controller";
import {NextFunction, Response, Request} from "express";

testRouter.get("/api/test", (req: Request, res: Response, next: NextFunction) => {
    testCtrl.test_function(req, res, next);
});

export default testRouter;
