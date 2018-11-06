import {NextFunction, Request, Response, Router} from "express";

class TestController {
    public test_function(req: Request, res: Response, next: NextFunction) {
        console.log("API TEST");
        const message = {message: "api test successful"};
        res.json(message);
    }

}

export default new TestController();
