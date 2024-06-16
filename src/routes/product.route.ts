import express from 'express'
import multer from 'multer'

import MediaController from '~/controllers/media.controller'
import ProductController from '~/controllers/product.controller'
import ProductMiddleware from '~/middlewares/product.middleware'

const router = express.Router()
const upload = multer()

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
router.get('/', ProductController.getProducts)

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
router.post('/', ProductMiddleware.validateProduct, ProductController.createProduct)

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
router.get('/:id', ProductController.getProductById)

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
router.put('/:id', ProductMiddleware.validateProduct, ProductController.updateProduct)

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
router.delete('/:id', ProductController.deleteProduct)

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
router.get('/image/:id', MediaController.getImageFoodUrl)

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
 *             $ref: '#/components/schemas/File'
 *     responses:
 *       200:
 *         description: The product image was successfully uploaded
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.post('/image/upload', upload.single('file'), MediaController.uploadImageFood)

export default router
