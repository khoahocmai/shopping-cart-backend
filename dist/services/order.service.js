"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const uuid_1 = require("uuid");
const order_model_1 = require("../models/order.model");
const orderDetail_service_1 = __importDefault(require("./orderDetail.service"));
async function getAllOrders(req) {
    const { page_index = 1, page_size = 10, status } = req.query;
    const mapStatus = (statusNum) => {
        const statusValue = parseInt(statusNum);
        if (statusValue === 1)
            return 'Pending';
        if (statusValue === 0)
            return 'Completed';
        return undefined;
    };
    const statusArray = status ? status.split(',').map(mapStatus) : undefined;
    const orders = await order_model_1.Order.findAll({
        where: {
            ...(statusArray && { status: { [sequelize_1.Op.in]: statusArray } })
        },
        limit: Number(page_size),
        offset: (Number(page_index) - 1) * Number(page_size)
    });
    const orderDetailsWithStt = orders.map((order, index) => {
        const plainOrderDetail = order.get({ plain: true });
        return { ...plainOrderDetail, stt: index + 1 };
    });
    return orderDetailsWithStt;
} // Get all orders
async function getOrderById(orderId) {
    const order = await order_model_1.Order.findOne({ where: { id: orderId } });
    return order;
} // Get order by Id
async function createOrder(req) {
    const { order, orderDetails } = req.body;
    const totalAmountNumber = parseFloat(order.totalAmount);
    const result = await order_model_1.Order.create({
        id: (0, uuid_1.v4)(),
        date: new Date(),
        totalAmount: totalAmountNumber,
        status: 'Pending',
        name: order.name,
        address: order.address,
        phone: order.phone,
        deleted: false
    });
    const orderDetailsPromises = orderDetails.map((detail) => {
        return orderDetail_service_1.default.createOrderDetail(result.id, detail);
    });
    await Promise.all(orderDetailsPromises);
    return result;
} // Create order
async function updateOrder(order) {
    const currentOrder = await order_model_1.Order.findOne({
        where: { id: order.id }
    });
    if (!currentOrder) {
        throw new Error('Order not found');
    }
    if (currentOrder.status === 'Completed') {
        throw new Error('Cannot update an order that is already Completed');
    }
    const updatedOrder = await order_model_1.Order.update({
        date: new Date(),
        totalAmount: order.totalAmount,
        name: order.name,
        address: order.address,
        phone: order.phone,
        status: order.status
    }, {
        where: { id: order.id }
    });
    return updatedOrder;
} // Update order
async function deleteOrder(orderId) {
    const result = await order_model_1.Order.update({ deleted: true }, { where: { id: orderId } });
    return result;
} // Delete order
async function calculateTotalCompletedOrders() {
    const completedOrders = await order_model_1.Order.findAll({ where: { status: 'Completed' } });
    let totalAmount = 0;
    completedOrders.forEach((order) => {
        totalAmount += order.totalAmount;
    });
    return totalAmount;
} // Calculate total completed orders
exports.default = {
    getAllOrders,
    getOrderById,
    createOrder,
    updateOrder,
    deleteOrder,
    calculateTotalCompletedOrders
};
