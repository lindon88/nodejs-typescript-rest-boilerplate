"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TestController = /** @class */ (function () {
    function TestController() {
    }
    TestController.prototype.test_function = function (req, res, next) {
        console.log("API TEST");
        var message = { message: "api test successful" };
        res.json(message);
    };
    return TestController;
}());
exports.default = new TestController();
