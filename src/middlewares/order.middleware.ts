import { NextFunction, Request, Response } from 'express'
import { z } from 'zod'

// Define the order schema using Zod
const orderSchema = z.object({
  tableId: z.string().uuid('Invalid table ID format'),
  customerId: z.string().uuid('Invalid customer ID format'),
  status: z.enum(['Pending', 'Completed']),
  date: z.date(),
  discountApplied: z.number().positive('Discount cannot be negative'),
  totalAmount: z.number().positive('Total amount must be a positive number'),
  deleted: z.boolean().optional()
})

// Generic validation function (refer to previous explanation)
function validateOrder(req: Request, res: Response, next: NextFunction) {
  try {
    orderSchema.parse(req.body)
    next()
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Invalid order data provided',
      errors: error // Access specific error details from Zod
    })
  }
}

export default { validateOrder }
