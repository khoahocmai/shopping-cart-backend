import express from 'express'

import DesignController from '~/controllers/design.controller'

const router = express.Router()

/**
 * @swagger
 * /api/designs:
 *   get:
 *     tags:
 *       - design
 *     summary: Get all designs
 *     responses:
 *       200:
 *         description: Returns a list of designs
 */
router.get('/', DesignController.getDesigns)

/**
 * @swagger
 * /api/designs/{id}:
 *   get:
 *     tags:
 *       - design
 *     summary: Get a design by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The design ID
 *     responses:
 *       200:
 *         description: Returns the design with the specified ID
 */
router.get('/:id', DesignController.getDesign)

/**
 * @swagger
 * /api/designs:
 *   post:
 *     tags:
 *       - design
 *     summary: Create a new design
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *     responses:
 *       200:
 *         description: Returns the created design
 */
router.post('/', DesignController.createDesign)

/**
 * @swagger
 * /api/designs/{id}:
 *   put:
 *     tags:
 *       - design
 *     summary: Update a design
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The design ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *     responses:
 *       200:
 *         description: Returns the updated design
 */
router.put('/:id', DesignController.updateDesign)

/**
 * @swagger
 * /api/designs/{id}:
 *   delete:
 *     tags:
 *       - design
 *     summary: Delete a design
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The design ID
 *     responses:
 *       200:
 *         description: Design deleted successfully
 */
router.delete('/:id', DesignController.deleteDesign)

export default router
