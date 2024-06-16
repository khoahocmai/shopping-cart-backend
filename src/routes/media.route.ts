import express from 'express'

import MediaController from '~/controllers/media.controller'

const router = express.Router()

/**
 * @swagger
 * components:O
 *   schemas:
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
 * /api/medias/delete/{filename}:
 *   delete:
 *     tags:
 *       - media
 *     summary: Delete a file
 *     parameters:
 *       - in: path
 *         name: filename
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The file was successfully deleted
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.delete('/delete/:filename', MediaController.deleteFileFromS3)

export default router
