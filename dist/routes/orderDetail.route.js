"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
// /**
//  * @swagger
//  * components:
//  *   schemas:
//  *     OrderDetail:
//  *       type: object
//  *       properties:
//  *         id:
//  *           type: string
//  *           description: The order detail ID
//  *         orderId:
//  *           type: string
//  *           description: The ID of the associated order
//  *           required: true
//  *         waiterId:
//  *           type: string
//  *           description: The ID of the waiter who took the order (optional)
//  *         productId:
//  *           type: string
//  *           description: The ID of the product in the order detail
//  *           required: true
//  *         quantity:
//  *           type: integer
//  *           description: The quantity of the product ordered
//  *           default: 1
//  *         price:
//  *           type: number
//  *           description: The price of the product
//  *           required: true
//  *         orderTime:
//  *           type: string
//  *           format: date-time
//  *           description: The time the order detail was created
//  *           default: current date and time
//  *         status:
//  *           type: string
//  *           description: The status of the order detail
//  *           enum: [Cooking, Served, Check, Finish]
//  *           default: Cooking
//  *         deleted:
//  *           type: boolean
//  *           description: The order detail deletion status
//  *           default: false
//  */
// /**
//  * @swagger
//  * /api/order-details:
//  *   get:
//  *     tags:
//  *       - order-detail
//  *     summary: Get all order details
//  *     responses:
//  *       200:
//  *         description: Returns a list of order details
//  *         content:
//  *           application/json:
//  *             schema:
//  *               type: array
//  *               items:
//  *                 $ref: '#/components/schemas/OrderDetail'
//  */
// router.get('/', OrderDetailController.getOrderDetails)
// /**
//  * @swagger
//  * /api/order-details/{id}:
//  *   get:
//  *     tags:
//  *       - order-detail
//  *     summary: Get an order detail by ID
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         schema:
//  *           type: string
//  *         description: The order detail ID
//  *     responses:
//  *       200:
//  *         description: Returns the order detail with the specified ID
//  *         content:
//  *           application/json:
//  *             schema:
//  *               $ref: '#/components/schemas/OrderDetail'
//  */
// router.get('/:id', OrderDetailController.getOrderDetail)
// /**
//  * @swagger
//  * /api/order-details:
//  *   post:
//  *     tags:
//  *       - order-detail
//  *     summary: Create a new order detail
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             $ref: '#/components/schemas/OrderDetail'
//  *     responses:
//  *       200:
//  *         description: Returns the created order detail
//  *         content:
//  *           application/json:
//  *             schema:
//  *               $ref: '#/components/schemas/OrderDetail'
//  */
// router.post('/', orderDetailMiddleware.validateOrderDetail, OrderDetailController.createOrderDetail)
// /**
//  * @swagger
//  * /api/order-details/{id}:
//  *   put:
//  *     tags:
//  *       - order-detail
//  *     summary: Update an order detail
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         schema:
//  *           type: string
//  *         description: The order detail ID
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         application/json:
//  *           schema:
//  *             $ref: '#/components/schemas/OrderDetail'
//  *     responses:
//  *       200:
//  *         description: Returns the updated order detail
//  *         content:
//  *           application/json:
//  *             schema:
//  *               $ref: '#/components/schemas/OrderDetail'
//  */
// router.put('/:id', orderDetailMiddleware.validateOrderDetail, OrderDetailController.updateOrderDetail)
// /**
//  * @swagger
//  * /api/order-details/{id}:
//  *   delete:
//  *     tags:
//  *       - order-detail
//  *     summary: Delete an order detail (soft delete)
//  *     parameters:
//  *       - in: path
//  *         name: id
//  *         required: true
//  *         schema:
//  *           type: string
//  *         description: The order detail ID
//  *     responses:
//  *       200:
//  *         description: Order detail deleted successfully
//  */
// router.delete('/:id', OrderDetailController.deleteOrderDetail)
exports.default = router;
