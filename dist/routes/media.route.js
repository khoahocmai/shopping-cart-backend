"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const media_controller_1 = __importDefault(require("../controllers/media.controller"));
const router = express_1.default.Router();
const upload = (0, multer_1.default)();
/**
 * @swagger
 * components:
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
// /**
//  * @swagger
//  * /api/medias/upload/avatar:
//  *   post:
//  *     tags:
//  *       - media
//  *     summary: Upload an avatar
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         multipart/form-data:
//  *           schema:
//  *             $ref: '#/components/schemas/File'
//  *     responses:
//  *       200:
//  *         description: The avatar was successfully uploaded
//  *       400:
//  *         description: Bad request
//  *       500:
//  *         description: Internal server error
//  */
// router.post('/upload/avatar', upload.single('file'), MediaController.uploadAvatar)
// /**
//  * @swagger
//  * /api/medias/upload/product:
//  *   post:
//  *     tags:
//  *       - media
//  *     summary: Upload a food image
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         multipart/form-data:
//  *           schema:
//  *             $ref: '#/components/schemas/File'
//  *     responses:
//  *       200:
//  *         description: The food image was successfully uploaded
//  *       400:
//  *         description: Bad request
//  *       500:
//  *         description: Internal server error
//  */
// router.post('/upload/product', upload.single('file'), MediaController.uploadImageFood)
// /**
//  * @swagger
//  * /api/medias/upload/category:
//  *   post:
//  *     tags:
//  *       - media
//  *     summary: Upload a category image
//  *     requestBody:
//  *       required: true
//  *       content:
//  *         multipart/form-data:
//  *           schema:
//  *             $ref: '#/components/schemas/File'
//  *     responses:
//  *       200:
//  *         description: The category image was successfully uploaded
//  *       400:
//  *         description: Bad request
//  *       500:
//  *         description: Internal server error
//  */
// router.post('/upload/category', upload.single('file'), MediaController.uploadImageCategory)
// /**
//  * @swagger
//  * /api/medias/avatar/{userId}:
//  *   get:
//  *     tags:
//  *       - media
//  *     summary: Get a user's avatar
//  *     parameters:
//  *       - in: path
//  *         name: userId
//  *         required: true
//  *         schema:
//  *           type: string
//  *     responses:
//  *       200:
//  *         description: The avatar URL was successfully retrieved
//  *       400:
//  *         description: Bad request
//  *       500:
//  *         description: Internal server error
//  */
// router.get('/avatar/:userId', MediaController.getUserAvatarUrl)
// /**
//  * @swagger
//  * /api/medias/food/{productId}:
//  *   get:
//  *     tags:
//  *       - media
//  *     summary: Get a product's image
//  *     parameters:
//  *       - in: path
//  *         name: productId
//  *         required: true
//  *         schema:
//  *           type: string
//  *     responses:
//  *       200:
//  *         description: The product image URL was successfully retrieved
//  *       400:
//  *         description: Bad request
//  *       500:
//  *         description: Internal server error
//  */
// router.get('/food/:productId', MediaController.getImageFoodUrl)
// /**
//  * @swagger
//  * /api/medias/category/{categoryId}:
//  *   get:
//  *     tags:
//  *       - media
//  *     summary: Get a category's image
//  *     parameters:
//  *       - in: path
//  *         name: categoryId
//  *         required: true
//  *         schema:
//  *           type: string
//  *     responses:
//  *       200:
//  *         description: The category image URL was successfully retrieved
//  *       400:
//  *         description: Bad request
//  *       500:
//  *         description: Internal server error
//  */
// router.get('/category/:categoryId', MediaController.getImageCateUrl)
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
