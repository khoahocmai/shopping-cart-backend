"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const tableSchema = zod_1.z.object({
    name: zod_1.z.string(),
    description: zod_1.z.string().nullable(),
    status: zod_1.z.enum(['Available', 'Fixing']),
    deleted: zod_1.z.boolean()
});
// Define a validation middleware function
const validateTable = (req, res, next) => {
    try {
        tableSchema.parse(req.body);
        next();
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: 'Invalid request table data',
            errors: error
        });
    }
};
exports.default = {
    validateTable
};
