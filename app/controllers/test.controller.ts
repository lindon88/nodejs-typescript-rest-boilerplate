import {NextFunction, Request, Response} from "express";
import TestHelper from "./helpers/test.helper";
import {User} from "../models/User";
import {getRepository} from "typeorm";
import {ApiOperationGet, ApiPath, SwaggerDefinitionConstant} from "swagger-express-ts";
import loggerConfig from "../config/logger.config";
import {Body, Get, JsonController, Param, Post} from "routing-controllers";
import {BaseController} from "./base.controller";

/**
 * Test controllers
 * Used for testing new API
 * Decorated for swagger and routing-controller
 */
@ApiPath({
    path: "/api",
    name: "Test",
})

@JsonController()
export class TestController extends BaseController {
    private testHelper: TestHelper;

    constructor() {
        super();
        this.testHelper = new TestHelper(getRepository(User));
    }

    /**
     * Function returns message if api works
     * @param req
     * @param res
     * @param next
     */
    @ApiOperationGet({
        path: "/test",
        description: "Show message if api works",
        summary: "Get message for api status",
        responses: {
            200: {
                description: "Success", type: SwaggerDefinitionConstant.Response.Type.ARRAY,
            },
        },
    })
    @Get("/api/test")
    public getApiStatus() {
        const message = {message: "api test successful"};
        loggerConfig.register().debug("Message returned successfully");
        return message;
    }

    /**
     * Returns all users from the database
     * @param req
     * @param res
     * @param next
     */
    // @ts-ignore
    @ApiOperationGet({
        path: "/users",
        description: "Get all users from database",
        summary: "Get all users from database using typeORM",
        responses: {
            200: {
                description: "Success", type: SwaggerDefinitionConstant.Response.Type.ARRAY, model: "User",
            },
        },
    })
    @Get("/api/users")
    public getAllUsers(req: Request, res: Response, next: NextFunction) {
        const results = this.testHelper.getAllUsers();
        loggerConfig.register().debug("Users returned successfully");
        return results;
    }

    @ApiOperationGet({
        path: "/user/{id}",
        description: "Get specific user from database",
        summary: "Get specific user from database using typeORM",
        parameters:
            {
                path: {
                    id: {
                        type: SwaggerDefinitionConstant.Parameter.Type.STRING,
                        required: true,
                    },
                },
            },
        responses: {
            200: {
                description: "Success", type: SwaggerDefinitionConstant.Response.Type.ARRAY, model: "User",
            },
        },
    })
    @Get("/api/user/:id")
    public getUser(@Param("id") id: number) {
        const result = this.testHelper.getUser(id);
        loggerConfig.register().debug("User returned with id: " + id);
        return result;
    }

    @Post("/api/user/create")
    public createUser(@Body({validate: true}) user: User) {
        return this.validateObject(user).then((response) => {
            const res = this.testHelper.postUser(user);
            return {message: "Successfully posted user parameters"};
        }).catch((error) => {
            return {message: error};
        });
    }
}
