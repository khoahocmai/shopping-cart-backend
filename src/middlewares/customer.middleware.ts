import { NextFunction, Request, Response } from 'express'
import { z } from 'zod'

// Define the customer schema using Zod
const customerSchema = z.object({
  name: z.string().min(1, 'Customer name must have at least one character'),
  phone: z.string().regex(/^\d+$/, 'Phone number must be numeric'),
  totalSpent: z.number().positive('Total spent cannot be negative'),
  discountRate: z.number().gte(0, 'Discount rate cannot be negative').lte(1, 'Discount rate cannot be greater than 1'),
  deleted: z.boolean().optional()
})

// Generic validation function (refer to previous explanation)
function validateCustomer(req: Request, res: Response, next: NextFunction) {
  try {
    customerSchema.parse(req.body)
    next()
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Invalid customer data provided',
      errors: error
    })
  }
}

export default { validateCustomer }
