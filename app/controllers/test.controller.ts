import {NextFunction, Request, Response, Router} from "express";
import testCtrl from "./helpers/test.helper";

class TestController {

    /**
     * todo-nemanja u controller ide validacija input parameters i input body i takodje formatiranje responsa
     * @param req
     * @param res
     * @param next
     */
    public test_function(req: Request, res: Response, next: NextFunction) {
        console.log("API TEST");
        const message = {message: "api test successful"};
        res.json(message);
    }

    public async user_helper_function(req: Request, res: Response, next: NextFunction) {
        const results = await testCtrl.getAllUsers();
        res.json(results);
    }

}

export default new TestController();
