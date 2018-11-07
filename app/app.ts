import Application from "./core/application";
import {TestController} from "./controllers/test.controller";
import express from "express";

const app = express();
// bootstrap application
Application.bootstrap();

export default app;
