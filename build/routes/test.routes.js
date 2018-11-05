"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
var testRouter = express.Router();
var test_controller_1 = __importDefault(require("../controllers/test.controller"));
testRouter.get('/api/test', function (req, res, next) {
    test_controller_1.default.test_function(req, res, next);
});
exports.default = testRouter;
