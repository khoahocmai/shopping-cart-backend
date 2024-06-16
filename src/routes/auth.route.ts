import express from 'express'

import AuthController from '~/controllers/auth.controller'

const router = express.Router()

/**
 * @swagger
 * tags:
 *   name: auth
 *   description: Authentication related endpoints
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     tags:
 *       - auth
 *     summary: Register a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               name:
 *                 type: string
 *               phone:
 *                 type: string
 *               role:
 *                 type: string
 *                 enum: ["admin","cashier", "chef", "waiter"]
 *     responses:
 *       200:
 *         description: A user object
 *       400:
 *         description: Bad request
 */
router.post('/register', AuthController.register)

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     tags:
 *       - auth
 *     summary: Login
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: A user object
 *       400:
 *         description: Bad request
 */
router.post('/login', AuthController.login)

/**
 * @swagger
 * /api/auth/refresh-token:
 *   post:
 *     tags:
 *       - auth
 *     summary: Refresh the token
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               refreshToken:
 *                 type: string
 *     responses:
 *       200:
 *         description: A new access token
 *       400:
 *         description: Bad request
 */
router.post('/refresh-token', AuthController.getRefreshToken)

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     tags:
 *       - auth
 *     summary: Logout
 *     responses:
 *       200:
 *         description: Successfully logged out
 *       400:
 *         description: Bad request
 */
router.post('/logout', AuthController.logout)

export default router
