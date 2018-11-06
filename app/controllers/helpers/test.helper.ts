import {NextFunction, Request, Response, Router} from "express";
import {User} from "../../models/User";

import {Connection, createConnection, getConnection, getRepository, Repository} from "typeorm";
//
// let repository: Repository<User>;
// const initialize = () => {
//     repository = getRepository(User);
// };
class TestHelper {
    private userRepository: Repository<User>;
    constructor(user: Repository<User>) {
        this.userRepository = user;
    }

    public init(rep: any) {
        return getRepository(rep);
    }

    public async getAllUsers() {
        // const repository = this.init(User);
        return await this.userRepository.find();
    }
}

export default TestHelper;
