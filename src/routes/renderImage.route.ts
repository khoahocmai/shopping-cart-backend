import { Router } from 'express'

import RenderImageController from '~/controllers/renderImage.controller'

const router = Router()

/**
 * @swagger
 * /api/renders/image:
 *   post:
 *     tags:
 *       - RenderImage
 *     summary: Generate an image from a prompt
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               prompt:
 *                 type: string
 *                 description: The prompt to generate the image from
 *     responses:
 *       200:
 *         description: Returns the presigned URL of the generated image
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 data:
 *                   type: string
 *       400:
 *         description: Returns an error message if the prompt is missing
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *       500:
 *         description: Returns an error message if there was an error generating the image
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 */
router.post('/image', RenderImageController.generateImage)

/**
 * @swagger
 * /api/renders/upload/:
 *   post:
 *     tags:
 *       - RenderImage
 *     summary: Upload an AI image to S3
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *             required:
 *               - file
 *     responses:
 *       200:
 *         description: The user avatar was successfully uploaded
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.post('/upload', RenderImageController.uploadAIImage)

router.get('/image/:id', RenderImageController.getAIImageUrl) // ahsd

export default router
