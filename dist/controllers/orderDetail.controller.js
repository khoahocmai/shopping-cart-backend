"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const responseStatus_1 = __importDefault(require("../constants/responseStatus"));
const orderDetail_service_1 = __importDefault(require("../services/orderDetail.service"));
async function getOrderDetails(req, res) {
    try {
        const orderDetails = await orderDetail_service_1.default.getAllOrderDetails();
        res.json(responseStatus_1.default.DataResponse('', orderDetails));
    }
    catch (error) {
        console.log(error);
        res.json(responseStatus_1.default.InternalErrorResponse(error.message));
    }
} // Controller Get all order details
async function getOrderDetail(req, res) {
    try {
        const orderDetailId = req.params.id;
        const orderDetail = await orderDetail_service_1.default.getOrderDetailById(orderDetailId);
        if (!orderDetail) {
            res.json(responseStatus_1.default.NotFoundResponse('Not found any Order Detail'));
        }
        res.json(responseStatus_1.default.DataResponse('', orderDetail));
    }
    catch (error) {
        console.log(error);
        res.json(responseStatus_1.default.InternalErrorResponse(error.message));
    }
} // Controller Get order detail by Id
async function getOrderDetailsByOrderId(req, res) {
    try {
        const orderId = req.params.orderId;
        const orderDetail = await orderDetail_service_1.default.getOrderDetailsByOrderId(orderId);
        if (!orderDetail) {
            res.json(responseStatus_1.default.NotFoundResponse('Not found any Order Detail'));
        }
        res.json(responseStatus_1.default.DataResponse('', orderDetail));
    }
    catch (error) {
        console.log(error);
        res.json(responseStatus_1.default.InternalErrorResponse(error.message));
    }
} // Controller Get order detail by Order Id
async function createOrderDetail(req, res) {
    try {
        const orderId = req.params.orderId;
        const orderDetailData = req.body;
        const orderDetail = await orderDetail_service_1.default.createOrderDetail(orderId, orderDetailData);
        if (!orderDetail) {
            res.json(responseStatus_1.default.MessageResponse('Error in create Order Detail'));
        }
        res.json(responseStatus_1.default.CreateSuccessResponse('', orderDetail));
    }
    catch (error) {
        console.log(error);
        // Handle specific errors like not found order or product
        if (error.message === 'Not found order' || error.message === 'Not found product') {
            res.json(responseStatus_1.default.MessageResponse(error.message));
        }
        else {
            res.json(responseStatus_1.default.InternalErrorResponse(error.message));
        }
    }
} // Controller Create order detail
async function updateOrderDetail(req, res) {
    try {
        const updateData = req.body;
        const orderDetail = await orderDetail_service_1.default.updateOrderDetail(updateData);
        if (!orderDetail) {
            res.json(responseStatus_1.default.MessageResponse('Error in update Order Detail'));
        }
        res.json(responseStatus_1.default.MessageResponse('Update Order Detail success'));
    }
    catch (error) {
        console.log(error);
        res.json(responseStatus_1.default.InternalErrorResponse(error.message));
    }
} // Controller Update order detail
async function deleteOrderDetail(req, res) {
    try {
        const orderDetailId = req.params.id;
        const orderDetail = await orderDetail_service_1.default.deleteOrderDetail(orderDetailId);
        if (!orderDetail) {
            res.json(responseStatus_1.default.MessageResponse('Error in delete Order Detail'));
        }
        res.json(responseStatus_1.default.MessageResponse('Delete Order Detail success'));
    }
    catch (error) {
        console.log(error);
        res.json(responseStatus_1.default.InternalErrorResponse(error.message));
    }
} // Controller Delete order detail
exports.default = {
    getOrderDetails,
    getOrderDetail,
    getOrderDetailsByOrderId,
    createOrderDetail,
    updateOrderDetail,
    deleteOrderDetail
};
