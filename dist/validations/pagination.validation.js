"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paginationValidation = void 0;
const express_validator_1 = require("express-validator");
const validation_middleware_1 = __importDefault(require("../middlewares/validation.middleware"));
exports.paginationValidation = [
    (0, express_validator_1.query)('page').default(1).isInt({ min: 1 }).toInt().withMessage('page must be a positive integer'),
    (0, express_validator_1.query)('limit').default(10).isInt({ min: 1, max: 100 }).toInt().withMessage('limit must be a positive integer'),
    validation_middleware_1.default
];
