import {NextFunction, Request, Response, Router} from "express";
import {User} from "../../models/User";

import {createConnection, getConnection, Repository} from "typeorm";
import testRouter from "../../routes/test.routes";

createConnection("mysql").then((connection) => {
    testRouter.get("/api/users", async (req: Request, res: Response, next: NextFunction) => {
        if (repository === undefined) {
            initialize();
        }
        const users = await repository.find();

        res.json(users);
    });
});


class testHelper {

    constructor(repository: Repository<User>) {
        this.initialize(repository);
    }

    initialize = (repository: Repository<User>) => {
        const connection = getConnection("mysql");
        repository = connection.getRepository(User);
    };

    public getAllUsers(req: Request, res: Response, next: NextFunction) {
        if (repository === undefined) {
            initialize();
        }
        const users = await repository.find();

        res.json(users);
    }
}