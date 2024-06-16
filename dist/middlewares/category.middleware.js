"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
// Define the category schema using Zod
const categorySchema = zod_1.z.object({
    name: zod_1.z.string().min(1, 'Category name must have at least one character'),
    description: zod_1.z.string().nullable(),
    imageUrl: zod_1.z.string().url('Invalid image URL format'),
    deleted: zod_1.z.boolean().optional()
});
// Generic validation function (refer to previous explanation)
function validateCategory(req, res, next) {
    try {
        categorySchema.parse(req.body);
        next();
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: 'Invalid category data provided',
            errors: error
        });
    }
}
exports.default = { validateCategory };
