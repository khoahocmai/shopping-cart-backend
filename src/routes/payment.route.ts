import express from 'express'

import PaymentController from '~/controllers/payment.controller'

const router = express.Router()

/**
 * @swagger
 * components:
 *   schemas:
 *     Payment:
 *       type: object
 *       properties:
 *         orderId:
 *           type: string
 *         cashierId:
 *           type: string
 *         amount:
 *           type: number
 *         paymentMethod:
 *           type: string
 *     Callback:
 *       type: object
 *       properties:
 *         paymentId:
 *           type: string
 *         orderId:
 *           type: string
 *         cashierId:
 *           type: string
 *         amount:
 *           type: number
 *         paymentMethod:
 *           type: string
 *         paymentStatus:
 *           type: string
 *         paymentTime:
 *           type: string
 *         deleted:
 *           type: boolean
 *     CheckStatus:
 *       type: object
 *       properties:
 *         paymentId:
 *           type: string
 */

/**
 * @swagger
 * /api/payments:
 *   post:
 *     tags:
 *       - payment
 *     summary: Create a payment
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               orderId:
 *                 type: string
 *                 description: The order id
 *               customerId:
 *                 type: string
 *                 description: The customer id
 *               amount:
 *                 type: number
 *                 description: The amount to be paid
 *               bankCode:
 *                 type: string
 *                 description: The bank code (default is 'NCB')
 *               language:
 *                 type: string
 *                 description: The language (default is 'vn')
 *     responses:
 *       200:
 *         description: Returns the payment URL
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 */
router.post('/', PaymentController.payment)

/**
 * @swagger
 * /api/payments/return:
 *   get:
 *     tags:
 *       - payment
 *     summary: Handle VNPay return
 *     responses:
 *       200:
 *         description: Returns a URL depending on the verification of the secure hash
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 */
router.get('/vnpay-return', PaymentController.vnpayReturn)

export default router
