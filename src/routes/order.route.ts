import express from 'express'

import OrderController from '~/controllers/order.controller'
import OrderDetailController from '~/controllers/orderDetail.controller'

const router = express.Router()

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
 *         date:
 *           type: string
 *           format: date-time
 *           description: The order date and time
 *           default: current date and time
 *         totalAmount:
 *           type: number
 *           description: The total amount of the order
 *           required: true
 *         status:
 *           type: string
 *           description: The order status
 *           enum: [Pending, Completed]
 *           default: Pending
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
 *         productId:
 *           type: string
 *           description: The ID of the product in the order detail
 *           required: true
 *         quantity:
 *           type: integer
 *           description: The quantity of the product ordered
 *           default: 1
 *         orderTime:
 *           type: string
 *           format: date-time
 *           description: The time the order detail was created
 *           default: current date and time
 *         sizes:
 *           type: string
 *           description: The size of the product
 *           enum: [M, L, XL, XXL, XXXL]
 *           default: M
 *         design:
 *           type: string
 *           description: The design of the product
 *           required: true
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
router.get('/', OrderController.getOrders)

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
 *             type: object
 *             properties:
 *               order:
 *                 type: object
 *                 properties:
 *                   totalAmount:
 *                     type: number
 *                     description: The total amount of the order
 *                   name:
 *                     type: string
 *                     description: The name of the customer
 *                   address:
 *                     type: string
 *                     description: The address of the customer
 *                   phone:
 *                     type: string
 *                     description: The phone number of the customer
 *               orderDetails:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: The ID of the product
 *                     quantity:
 *                       type: number
 *                       description: The quantity of the product
 *                     sizes:
 *                       type: string
 *                       enum: ['M', 'L', 'XL', 'XXL', 'XXXL']
 *                       description: The size of the product
 *                     design:
 *                       type: string
 *                       description: The design of the product
 *     responses:
 *       200:
 *         description: Returns the created order
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 customerId:
 *                   type: string
 *                 date:
 *                   type: string
 *                   format: date-time
 *                 totalAmount:
 *                   type: number
 *                 status:
 *                   type: string
 *                 deleted:
 *                   type: boolean
 */
router.post('/', OrderController.createOrder)

/**
 * @swagger
 * /api/orders/total-amount:
 *   get:
 *     tags:
 *       - order
 *     summary: Get the total amount of all completed orders
 *     responses:
 *       200:
 *         description: Returns the total amount of all completed orders
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalAmount:
 *                   type: number
 */
router.get('/total-amount', OrderController.calculateTotalCompletedOrders)

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
router.get('/:id', OrderController.getOrder)

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
 *             type: object
 *             properties:
 *               order:
 *                 type: object
 *                 properties:
 *                   totalAmount:
 *                     type: number
 *                     description: The total amount of the order
 *                   name:
 *                     type: string
 *                     description: The name of the customer
 *                   address:
 *                     type: string
 *                     description: The address of the customer
 *                   phone:
 *                     type: string
 *                     description: The phone number of the customer
 *     responses:
 *       200:
 *         description: Returns the updated order
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Order'
 */
router.put('/:id', OrderController.updateOrder)

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
router.delete('/:id', OrderController.deleteOrder)

// Phần order detail route
/**
 * @swagger
 * /api/orders/{order_id}/order-detail:
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
router.get('/:orderId/order-detail/', OrderDetailController.getOrderDetailsByOrderId)

/**
 * @swagger
 * /api/orders/{order_id}/order-detail:
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
router.post('/:orderId/order-detail/', OrderDetailController.createOrderDetail)

/**
 * @swagger
 * /api/orders/{order_id}/order-detail/{id}:
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
router.get('/:orderId/order-detail/:id', OrderDetailController.getOrderDetail)

/**
 * @swagger
 * /api/orders/{order_id}/order-detail/{id}:
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
router.put('/:orderId/order-detail/:id', OrderDetailController.updateOrderDetail)

/**
 * @swagger
 * /api/orders/{order_id}/order-detail/{id}:
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
router.delete('/:orderId/order-detail/:id', OrderDetailController.deleteOrderDetail)

export default router
