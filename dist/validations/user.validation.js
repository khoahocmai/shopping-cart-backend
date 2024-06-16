"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerValidation = exports.loginValidation = void 0;
const express_validator_1 = require("express-validator");
const validation_middleware_1 = __importDefault(require("../middlewares/validation.middleware"));
exports.loginValidation = [(0, express_validator_1.body)('username').isString().trim(), (0, express_validator_1.body)('password').isString().trim()];
exports.registerValidation = [
    (0, express_validator_1.body)('username').isString().trim().isLength({ min: 6, max: 30 }),
    (0, express_validator_1.body)('email').isString().trim().isEmail(),
    (0, express_validator_1.body)('password').isString().trim().isLength({ min: 8, max: 100 }),
    validation_middleware_1.default
];
