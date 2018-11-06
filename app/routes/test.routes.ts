import express from "express";
const testRouter = express.Router();
import {NextFunction, Response, Request} from "express";
import testCtrl from "../controllers/test.controller";

testRouter.get("/api/test", (req: Request, res: Response, next: NextFunction) => {
    testCtrl.test_function(req, res, next);
});

export default testRouter;
