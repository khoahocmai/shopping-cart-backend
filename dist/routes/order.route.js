"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const order_controller_1 = __importDefault(require("../controllers/order.controller"));
const orderDetail_controller_1 = __importDefault(require("../controllers/orderDetail.controller"));
const order_middleware_1 = __importDefault(require("../middlewares/order.middleware"));
const orderDetail_middleware_1 = __importDefault(require("../middlewares/orderDetail.middleware"));
const router = express_1.default.Router();
/**
 * @swagger
 * components:
 *   schemas:
 *     Order:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The order ID
 *         tableId:
 *           type: string
 *           description: The ID of the associated table
 *           required: true
 *         customerId:
 *           type: string
 *           description: The ID of the associated customer
 *           required: true
 *         status:
 *           type: string
 *           description: The order status
 *           enum: [Pending, Completed]
 *           default: Pending
 *         date:
 *           type: string
 *           format: date-time
 *           description: The order date and time
 *           default: current date and time
 *         discountApplied:
 *           type: number
 *           description: The discount applied to the order
 *           default: 0.0
 *         totalAmount:
 *           type: number
 *           description: The total amount of the order
 *           required: true
 *         deleted:
 *           type: boolean
 *           description: The order deletion status
 *           default: false
 *     OrderDetail:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The order detail ID
 *         orderId:
 *           type: string
 *           description: The ID of the associated order
 *           required: true
 *         waiterId:
 *           type: string
 *           description: The ID of the waiter who took the order (optional)
 *         productId:
 *           type: string
 *           description: The ID of the product in the order detail
 *           required: true
 *         quantity:
 *           type: integer
 *           description: The quantity of the product ordered
 *           default: 1
 *         price:
 *           type: number
 *           description: The price of the product
 *           required: true
 *         orderTime:
 *           type: string
 *           format: date-time
 *           description: The time the order detail was created
 *           default: current date and time
 *         status:
 *           type: string
 *           description: The status of the order detail
 *           enum: [Cooking, Served, Check, Finish]
 *           default: Cooking
 *         deleted:
 *           type: boolean
 *           description: The order detail deletion status
 *           default: false
 */
// Phần order route
/**
 * @swagger
 * /api/orders:
 *   get:
 *     summary: Get all orders
 *     tags:
 *       - order
 *     parameters:
 *       - in: query
 *         name: page_index
 *         schema:
 *           type: integer
 *           default: 1
 *         description: The page number for pagination.
 *       - in: query
 *         name: page_size
 *         schema:
 *           type: integer
 *           default: 10
 *         description: The number of items per page.
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *         description: The status of orders, 1 for Pending and 0 for Completed.
 *       - in: query
 *         name: tableName
 *         schema:
 *           type: string
 *         description: The name of the table to filter orders.
 *       - in: query
 *         name: phone
 *         schema:
 *           type: string
 *         description: The phone number of the customer to filter orders.
 *     responses:
 *       200:
 *         description: A list of orders
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: The order ID.
 *                   status:
 *                     type: string
 *                     description: The status of the order.
 *                   tableId:
 *                     type: string
 *                     description: The ID of the table.
 *                   customerId:
 *                     type: string
 *                     description: The ID of the customer.
 */
router.get('/', order_controller_1.default.getOrders);
/**
 * @swagger
 * /api/orders:
 *   post:
 *     tags:
 *       - order
 *     summary: Create a new order
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Order'
 *     responses:
 *       200:
 *         description: Returns the created order
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 */
router.post('/', order_middleware_1.default.validateOrder, order_controller_1.default.createOrder);
/**
 * @swagger
 * /api/orders/{id}:
 *   get:
 *     tags:
 *       - order
 *     summary: Get an order by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The order ID
 *     responses:
 *       200:
 *         description: Returns the order with the specified ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 */
router.get('/:id', order_controller_1.default.getOrder);
/**
 * @swagger
 * /api/orders/{id}:
 *   put:
 *     tags:
 *       - order
 *     summary: Update an order
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The order ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Order'
 *     responses:
 *       200:
 *         description: Returns the updated order
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 */
router.put('/:id', order_middleware_1.default.validateOrder, order_controller_1.default.updateOrder);
/**
 * @swagger
 * /api/orders/{id}:
 *   delete:
 *     tags:
 *       - order
 *     summary: Delete an order (soft delete)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The order ID
 *     responses:
 *       200:
 *         description: Order deleted successfully
 */
router.delete('/:id', order_controller_1.default.deleteOrder);
// Phần order detail route
/**
 * @swagger
 * /api/orders/{order_id}/order-details:
 *   get:
 *     summary: Get all order details for a specific order
 *     tags:
 *       - order
 *     parameters:
 *       - in: path
 *         name: order_id
 *         required: true
 *         schema:
 *           type: string
 *         description: The Id of the order
 *     responses:
 *       200:
 *         description: A list of order details for the specified order
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: The order detail ID.
 *                   orderId:
 *                     type: string
 *                     description: The ID of the order.
 *                   productId:
 *                     type: string
 *                     description: The ID of the product.
 *                   quantity:
 *                     type: number
 *                     description: The quantity of the product.
 *                   price:
 *                     type: number
 *                     description: The price of the product.
 *                   total:
 *                     type: number
 *                     description: The total price for this order detail.
 */
router.get('/:orderId/order-detail/', orderDetail_controller_1.default.getOrderDetailsByOrderId);
/**
 * @swagger
 * /api/orders/{order_id}/order-details:
 *   post:
 *     tags:
 *       - order
 *     summary: Create a new order detail for a specific order
 *     parameters:
 *       - in: path
 *         name: order_id
 *         required: true
 *         schema:
 *           type: string
 *         description: The Id of the order
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/OrderDetail'
 *     responses:
 *       200:
 *         description: Returns the created order detail
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OrderDetail'
 */
router.post('/:orderId/order-detail/', orderDetail_middleware_1.default.validateOrderDetail, orderDetail_controller_1.default.createOrderDetail);
/**
 * @swagger
 * /api/orders/{order_id}/order-details/{id}:
 *   get:
 *     tags:
 *       - order
 *     summary: Get an order detail by ID
 *     parameters:
 *       - in: path
 *         name: order_id
 *         required: true
 *         schema:
 *           type: string
 *         description: The order Id
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The order detail Id
 *     responses:
 *       200:
 *         description: Returns the order detail with the specified ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OrderDetail'
 */
router.get('/:orderId/order-detail/:id', orderDetail_controller_1.default.getOrderDetail);
/**
 * @swagger
 * /api/orders/{order_id}/order-details/{id}:
 *   put:
 *     tags:
 *       - order
 *     summary: Update an order detail
 *     parameters:
 *       - in: path
 *         name: order_id
 *         required: true
 *         schema:
 *           type: string
 *         description: The order Id
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The order detail Id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/OrderDetail'
 *     responses:
 *       200:
 *         description: Returns the updated order detail
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/OrderDetail'
 */
router.put('/:orderId/order-detail/:id', orderDetail_middleware_1.default.validateOrderDetail, orderDetail_controller_1.default.updateOrderDetail);
/**
 * @swagger
 * /api/orders/{order_id}/order-details/{id}:
 *   delete:
 *     tags:
 *       - order
 *     summary: Delete an order detail (soft delete)
 *     parameters:
 *       - in: path
 *         name: order_id
 *         required: true
 *         schema:
 *           type: string
 *         description: The order Id
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The order detail Id
 *     responses:
 *       200:
 *         description: Order detail deleted successfully
 */
router.delete('/:orderId/order-detail/:id', orderDetail_controller_1.default.deleteOrderDetail);
exports.default = router;
