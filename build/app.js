"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var test_routes_1 = __importDefault(require("./routes/test.routes"));
var app = express_1.default();
//route for test controller and route
app.use(test_routes_1.default);
/**
 * Start Express server.
 */
var PORT = 8200;
var server = app.listen(PORT, function () {
    console.log("  App is running at http://localhost:%d in %s mode", PORT, app.get("env"));
    console.log("  Press CTRL-C to stop\n");
});
exports.default = server;
