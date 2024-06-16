"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const order_model_1 = require("../models/order.model");
const orderDetail_model_1 = require("../models/orderDetail.model");
const product_model_1 = require("../models/product.model");
const user_model_1 = require("../models/user.model");
// Assuming you have services for Order and Product
const order_service_1 = __importDefault(require("./order.service"));
const product_service_1 = __importDefault(require("./product.service"));
async function getAllOrderDetails() {
    const orderDetails = await orderDetail_model_1.OrderDetail.findAll({
        include: [
            { model: order_model_1.Order, as: 'order' },
            { model: user_model_1.User, as: 'waiter' },
            { model: product_model_1.Product, as: 'product' }
        ]
    });
    return orderDetails;
} // Get all order details
async function getOrderDetailById(orderDetailId) {
    const orderDetail = await orderDetail_model_1.OrderDetail.findByPk(orderDetailId, {
        include: [
            { model: order_model_1.Order, as: 'order' },
            { model: user_model_1.User, as: 'waiter' },
            { model: product_model_1.Product, as: 'product' }
        ]
    });
    return orderDetail;
} // Get order detail by Id
async function getOrderDetailsByOrderId(orderId) {
    const orderDetail = await orderDetail_model_1.OrderDetail.findAll({
        where: { orderId },
        include: [
            { model: order_model_1.Order, as: 'order' },
            { model: user_model_1.User, as: 'waiter' },
            { model: product_model_1.Product, as: 'product' }
        ]
    });
    return orderDetail;
} // Get order detail by Order Id
async function createOrderDetail(orderId, orderDetail) {
    const order = await order_service_1.default.getOrderById(orderId);
    if (!order) {
        throw new Error('Not found order');
    }
    const product = await product_service_1.default.getProductById(orderDetail.productId);
    if (!product) {
        throw new Error('Not found product');
    }
    const result = await orderDetail_model_1.OrderDetail.create({
        id: (0, uuid_1.v4)(),
        orderId: orderId,
        productId: orderDetail.productId,
        quantity: orderDetail.quantity,
        price: orderDetail.price,
        orderTime: new Date(),
        deleted: false
    });
    return result;
} // Create order detail
async function updateOrderDetail(orderDetail) {
    const updatedOrderDetail = await orderDetail_model_1.OrderDetail.update(orderDetail, {
        where: { id: orderDetail.id }
    });
    return updatedOrderDetail;
} // Update order detail
async function deleteOrderDetail(orderDetailId) {
    const result = await orderDetail_model_1.OrderDetail.update({ deleted: true }, { where: { id: orderDetailId } });
    return result;
} // Delete order detail
exports.default = {
    getAllOrderDetails,
    getOrderDetailById,
    getOrderDetailsByOrderId,
    createOrderDetail,
    updateOrderDetail,
    deleteOrderDetail
};
