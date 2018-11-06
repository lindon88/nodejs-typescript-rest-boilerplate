import express from "express";
const testRouter = express.Router();
import {NextFunction, Response, Request} from "express";
import testCtrl from "../controllers/test.controller";
import {User} from '../models/User';
import {createConnection, getConnection, Repository} from "typeorm";

let repository: Repository<User>;

const initialize = () => {
    const connection = getConnection('mysql');
    repository = connection.getRepository(User);
};
testRouter.get("/api/test", (req: Request, res: Response, next: NextFunction) => {
    testCtrl.test_function(req, res, next);
});

createConnection('mysql').then(connection => {
    testRouter.get('/api/users', async function(req: Request, res: Response, next: NextFunction) {
        if(repository === undefined) {
            initialize();
        }
        const users = await repository.find();

        res.json(users);
    });
});


export default testRouter;
