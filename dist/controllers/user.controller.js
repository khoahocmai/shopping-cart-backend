"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const responseStatus_1 = __importDefault(require("../constants/responseStatus"));
const user_service_1 = __importDefault(require("../services/user.service"));
async function getUsers(req, res) {
    try {
        const users = await user_service_1.default.getAllUsers(req);
        res.json(responseStatus_1.default.DataResponse('Get users list successfully!', users));
    }
    catch (error) {
        console.log(error);
        res.json(responseStatus_1.default.InternalErrorResponse());
    }
} // Get all users
async function getCurrentUser(req, res) {
    try {
        const user = await user_service_1.default.getCurrentUser(req);
        res.json(responseStatus_1.default.DataResponse('Get user by username successfully!', user));
    }
    catch (error) {
        console.log(error);
        res.json(responseStatus_1.default.InternalErrorResponse());
    }
} // Get user by username
exports.default = {
    getUsers,
    getCurrentUser
};
