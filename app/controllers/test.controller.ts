import {NextFunction, Request, Response, Router} from "express";
import TestHelper from "./helpers/test.helper";
import {User} from "../models/User";
import {getRepository} from "typeorm";
import {Get, Route} from "tsoa";

@Route("Api")
export class TestController {
    private testHelper: TestHelper;
    constructor() {
        this.testHelper = new TestHelper(getRepository(User));
    }

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

    @Get("ApiUsers")
    public user_helper_function = async (req: Request, res: Response, next: NextFunction) => {
        const results = await this.testHelper.getAllUsers();
        res.json(results);
    }

}

export default TestController;
