import TestController from "./controllers/test.controller";
import {ExampleController} from "./controllers/example.controller";
import {useExpressServer} from "routing-controllers";

class Router {

    private controllers: any[] = [
        TestController,
        ExampleController,
    ];

    public register = (server: any) => {
        // route for test controller and route
        useExpressServer(server, {
            validation: true,
            controllers: this.controllers,
        });
    }
}

export default new Router();
