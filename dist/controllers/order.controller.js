"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const responseStatus_1 = __importDefault(require("../constants/responseStatus"));
const order_service_1 = __importDefault(require("../services/order.service"));
async function getOrders(req, res) {
    try {
        const orders = await order_service_1.default.getAllOrders(req);
        res.json(responseStatus_1.default.DataResponse('Get order list successfully!', orders));
    }
    catch (error) {
        console.log(error);
        res.json(responseStatus_1.default.InternalErrorResponse(error.message));
    }
} // Controller Get all orders
async function getOrder(req, res) {
    try {
        const orderId = req.params.id;
        const order = await order_service_1.default.getOrderById(orderId);
        if (!order) {
            res.json(responseStatus_1.default.NotFoundResponse('Not found any Order'));
        }
        res.json(responseStatus_1.default.DataResponse('Get order successfully!', order));
    }
    catch (error) {
        console.log(error);
        res.json(responseStatus_1.default.InternalErrorResponse(error.message));
    }
} // Controller Get order by Id
async function createOrder(req, res) {
    try {
        const order = await order_service_1.default.createOrder(req);
        if (!order) {
            res.json(responseStatus_1.default.MessageResponse('Error in create Order'));
        }
        res.json(responseStatus_1.default.CreateSuccessResponse('', order));
    }
    catch (error) {
        console.log(error);
        // Handle specific errors like not found customer or table
        if (error.message === 'Not found table' || error.message === 'Not found customer') {
            res.json(responseStatus_1.default.MessageResponse(error.message));
        }
        else {
            res.json(responseStatus_1.default.InternalErrorResponse(error.message));
        }
    }
} // Controller Create order
async function updateOrder(req, res) {
    try {
        const updateData = req.body;
        const order = await order_service_1.default.updateOrder(updateData);
        if (!order) {
            res.json(responseStatus_1.default.MessageResponse('Error in update Order'));
        }
        res.json(responseStatus_1.default.MessageResponse('Update Order success'));
    }
    catch (error) {
        console.log(error);
        res.json(responseStatus_1.default.InternalErrorResponse(error.message));
    }
} // Controller Update order
async function deleteOrder(req, res) {
    try {
        const orderId = req.params.id;
        const order = await order_service_1.default.deleteOrder(orderId);
        if (!order) {
            res.json(responseStatus_1.default.MessageResponse('Error in delete Order'));
        }
        res.json(responseStatus_1.default.MessageResponse('Delete Order success'));
    }
    catch (error) {
        console.log(error);
        res.json(responseStatus_1.default.InternalErrorResponse(error.message));
    }
} // Controller Delete order
exports.default = {
    getOrders,
    getOrder,
    createOrder,
    updateOrder,
    deleteOrder
};
