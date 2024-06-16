"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const responseStatus_1 = __importDefault(require("../constants/responseStatus"));
const payment_service_1 = __importDefault(require("../services/payment.service"));
async function payment(req, res) {
    try {
        const vnpUrl = await payment_service_1.default.payment(req);
        res.status(200).redirect(vnpUrl || '');
    }
    catch (error) {
        console.log(error);
        res.json(responseStatus_1.default.InternalErrorResponse(error.message));
    }
} // Controller payment
async function vnpayReturn(req, res) {
    try {
        const redirectUrl = await payment_service_1.default.vnpayReturn(req);
        res.status(200).redirect(redirectUrl);
    }
    catch (error) {
        console.log(error);
        res.json(responseStatus_1.default.InternalErrorResponse(error.message));
    }
} // Controller return
exports.default = {
    payment,
    vnpayReturn
};
