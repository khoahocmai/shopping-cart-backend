"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
// Define the customer schema using Zod
const customerSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, 'Customer name must have at least one character'),
    phone: zod_1.z.string().regex(/^\d+$/, 'Phone number must be numeric'),
    totalSpent: zod_1.z.number().positive('Total spent cannot be negative'),
    discountRate: zod_1.z.number().gte(0, 'Discount rate cannot be negative').lte(1, 'Discount rate cannot be greater than 1'),
    deleted: zod_1.z.boolean().optional()
});
// Generic validation function (refer to previous explanation)
function validateCustomer(req, res, next) {
    try {
        customerSchema.parse(req.body);
        next();
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: 'Invalid customer data provided',
            errors: error
        });
    }
}
exports.default = { validateCustomer };
