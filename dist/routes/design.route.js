"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const design_controller_1 = __importDefault(require("../controllers/design.controller"));
const router = express_1.default.Router();
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
router.get('/', design_controller_1.default.getDesigns);
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
router.get('/:id', design_controller_1.default.getDesign);
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
router.post('/', design_controller_1.default.createDesign);
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
router.put('/:id', design_controller_1.default.updateDesign);
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
router.delete('/:id', design_controller_1.default.deleteDesign);
exports.default = router;
