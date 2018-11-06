import {NextFunction, Request, Response, Router} from "express";
import {User} from "../../models/User";

import {Connection, createConnection, getConnection, getRepository, Repository} from "typeorm";

let repository: Repository<User>;
const initialize = () => {
    repository = getRepository(User);
};
class TestHelper {
    public async getAllUsers() {
        if (repository === undefined) {
            initialize();
        }
        return await repository.find();
    }
}

export default new TestHelper();
