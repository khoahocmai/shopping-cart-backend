"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const media_controller_1 = __importDefault(require("../controllers/media.controller"));
const router = express_1.default.Router();
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
router.delete('/delete/:filename', media_controller_1.default.deleteFileFromS3);
exports.default = router;
