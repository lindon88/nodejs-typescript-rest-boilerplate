import {NextFunction, Request, Response, Router} from "express";
import TestHelper from "./helpers/test.helper";
import {User} from "../models/User";
import {getRepository} from "typeorm";
import {ApiOperationGet, ApiPath, SwaggerDefinitionConstant} from "swagger-express-ts";

@ApiPath({
    path: "/test",
    name: "Test",
})
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
    @ApiOperationGet({
        description: "Show message if api works",
        summary: "Get message for api status",
        responses: {
            200: {
                description: "Success", type: SwaggerDefinitionConstant.Response.Type.ARRAY,
            },
        },
    })
    public test_function(req: Request, res: Response, next: NextFunction) {
        console.log("API TEST");
        const message = {message: "api test successful"};
        res.json(message);
    }

    // @ts-ignore
    @ApiOperationGet({
        description: "Get all users from database",
        summary: "Get all users from database using typeORM",
        responses: {
            200: {
                description: "Success", type: SwaggerDefinitionConstant.Response.Type.ARRAY, model: "User",
            },
        },
    })
    public user_helper_function = async (req: Request, res: Response, next: NextFunction) => {
        const results = await this.testHelper.getAllUsers();
        res.json(results);
    }

}

export default TestController;
