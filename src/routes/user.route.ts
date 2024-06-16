import express from 'express'

import UserController from '~/controllers/user.controller'

const router = express.Router()

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The user ID
 *         name:
 *           type: string
 *           description: The user's name
 *         phone:
 *           type: string
 *           description: The user's phone number
 *         email:
 *           type: string
 *           description: The user's email address
 *         username:
 *           type: string
 *           description: The user's username
 *         password:
 *           type: string
 *           description: The user's password
 *         avatarUrl:
 *           type: string
 *           description: The user's avatar URL
 *         role:
 *           type: string
 *           description: The user's role
 *           enum: [admin, cashier, chef, waiters]
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date and time when the user was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The date and time when the user was last updated
 *       required:
 *         - id
 *         - name
 *         - phone
 *         - username
 *         - password
 *         - role
 *     File:
 *       type: object
 *       required:
 *         - file
 *       properties:
 *         file:
 *           type: string
 *           description: The file to upload
 *       example:
 *         file: file
 */

/**
 * @swagger
 * /api/users:
 *   get:
 *     tags:
 *       - user
 *     summary: Get all users
 *     parameters:
 *       - in: query
 *         name: keyword
 *         schema:
 *           type: string
 *         description: Keyword to search in user names or emails
 *       - in: query
 *         name: page_index
 *         schema:
 *           type: integer
 *         description: Page number
 *       - in: query
 *         name: page_size
 *         schema:
 *           type: integer
 *         description: Number of items per page
 *     responses:
 *       200:
 *         description: Returns a list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
router.get('/', UserController.getUsers)

/**
 * @swagger
 * /api/users/current:
 *   get:
 *     tags:
 *       - user
 *     summary: Get a user by username
 *     responses:
 *       200:
 *         description: Returns the user data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     username:
 *                       type: string
 *                     email:
 *                       type: string
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 */
router.get('/current', UserController.getCurrentUser)

export default router
