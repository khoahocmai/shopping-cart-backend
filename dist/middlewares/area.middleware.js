"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const areaSchema = zod_1.z.object({
    categoryId: zod_1.z.string(),
    name: zod_1.z.string().min(1),
    price: zod_1.z.number().positive(),
    previousPrice: zod_1.z.number().positive(),
    status: zod_1.z.enum(['Available', 'Unavailable']),
    imageUrl: zod_1.z.string().url(),
    deleted: zod_1.z.boolean()
});
// Define a validation middleware function
const validateArea = (req, res, next) => {
    try {
        areaSchema.parse(req.body);
        next();
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: 'Invalid request area data',
            errors: error
        });
    }
};
exports.default = {
    validateArea
};
