"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
// Define the order detail schema using Zod
const orderDetailSchema = zod_1.z.object({
    orderId: zod_1.z.string().uuid('Invalid order ID format'),
    waiterId: zod_1.z.string().uuid('Invalid waiter ID format').optional(),
    productId: zod_1.z.string().uuid('Invalid product ID format'),
    quantity: zod_1.z.number().positive('Quantity must be a positive number'),
    price: zod_1.z.number().positive('Price must be a positive number'),
    orderTime: zod_1.z.date(),
    status: zod_1.z.enum(['Cooking', 'Served', 'Check', 'Finish']),
    deleted: zod_1.z.boolean().optional()
});
// Generic validation function (refer to previous explanation)
function validateOrderDetail(req, res, next) {
    try {
        orderDetailSchema.parse(req.body);
        next();
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: 'Invalid order detail data provided',
            errors: error
        });
    }
}
exports.default = { validateOrderDetail };
