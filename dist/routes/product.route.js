"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const media_controller_1 = __importDefault(require("../controllers/media.controller"));
const product_controller_1 = __importDefault(require("../controllers/product.controller"));
const router = express_1.default.Router();
const upload = (0, multer_1.default)();
/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: The product ID
 *         categoryId:
 *           type: string
 *           description: The category ID
 *         name:
 *           type: string
 *           description: The product name
 *         price:
 *           type: number
 *           description: The product price
 *         previousPrice:
 *           type: number
 *           description: The previous product price
 *         status:
 *           type: string
 *           description: The product status
 *           enum: [Available, Unavailable]
 *         imageUrl:
 *           type: string
 *           description: The product image URL
 *         deleted:
 *           type: boolean
 *           description: The product deletion status
 *       required:
 *         - id
 *         - categoryId
 *         - name
 *         - price
 *         - previousPrice
 *         - status
 *         - imageUrl
 *         - deleted
 */
/**
 * @swagger
 * /api/products:
 *   get:
 *     tags:
 *       - product
 *     summary: Get products by criteria
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *         description: Comma separated list of status values (1 for 'Available', 0 for 'Unavailable')
 *       - in: query
 *         name: category_id
 *         schema:
 *           type: string
 *         description: Category id
 *       - in: query
 *         name: price_from
 *         schema:
 *           type: integer
 *         description: The lower limit of the price range
 *       - in: query
 *         name: price_to
 *         schema:
 *           type: integer
 *         description: The upper limit of the price range
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
 *       - in: query
 *         name: keyword
 *         schema:
 *           type: string
 *         description: Keyword to search in product names
 *     responses:
 *       200:
 *         description: Returns a list of criteria products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 */
router.get('/', product_controller_1.default.getProducts);
/**
 * @swagger
 * /api/products:
 *   post:
 *     tags:
 *       - product
 *     summary: Create a new product
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: Returns the created product
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 */
router.post('/', product_controller_1.default.createProduct);
/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     tags:
 *       - product
 *     summary: Get a product by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The product ID
 *     responses:
 *       200:
 *         description: Returns the product with the specified ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 */
router.get('/:id', product_controller_1.default.getProductById);
/**
 * @swagger
 * /api/products/{id}:
 *   put:
 *     tags:
 *       - product
 *     summary: Update a product
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The product ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Product'
 *     responses:
 *       200:
 *         description: Returns the updated product
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 */
router.put('/:id', product_controller_1.default.updateProduct);
/**
 * @swagger
 * /api/products/{id}:
 *   delete:
 *     tags:
 *       - product
 *     summary: Delete a product
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The product ID
 *     responses:
 *       200:
 *         description: Product deleted successfully
 */
router.delete('/:id', product_controller_1.default.deleteProduct);
/**
 * @swagger
 * /api/products/image/{id}:
 *   get:
 *     tags:
 *       - product
 *     summary: Get a product's image
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: The product image URL was successfully retrieved
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.get('/image/:id', media_controller_1.default.getImageClothesUrl);
/**
 * @swagger
 * /api/products/image/upload:
 *   post:
 *     tags:
 *       - product
 *     summary: Upload a product image
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
 *         description: The product image was successfully uploaded
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.post('/image/upload', upload.single('file'), media_controller_1.default.uploadImageClothes);
exports.default = router;
