"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
// Define the order schema using Zod
const orderSchema = zod_1.z.object({
    tableId: zod_1.z.string().uuid('Invalid table ID format'),
    customerId: zod_1.z.string().uuid('Invalid customer ID format'),
    status: zod_1.z.enum(['Pending', 'Completed']),
    date: zod_1.z.date(),
    discountApplied: zod_1.z.number().positive('Discount cannot be negative'),
    totalAmount: zod_1.z.number().positive('Total amount must be a positive number'),
    deleted: zod_1.z.boolean().optional()
});
// Generic validation function (refer to previous explanation)
function validateOrder(req, res, next) {
    try {
        orderSchema.parse(req.body);
        next();
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: 'Invalid order data provided',
            errors: error // Access specific error details from Zod
        });
    }
}
exports.default = { validateOrder };
