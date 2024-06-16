import { NextFunction, Request, Response } from 'express'
import { z } from 'zod'

// Define the order detail schema using Zod
const orderDetailSchema = z.object({
  orderId: z.string().uuid('Invalid order ID format'),
  waiterId: z.string().uuid('Invalid waiter ID format').optional(),
  productId: z.string().uuid('Invalid product ID format'),
  quantity: z.number().positive('Quantity must be a positive number'),
  price: z.number().positive('Price must be a positive number'),
  orderTime: z.date(),
  status: z.enum(['Cooking', 'Served', 'Check', 'Finish']),
  deleted: z.boolean().optional()
})

// Generic validation function (refer to previous explanation)
function validateOrderDetail(req: Request, res: Response, next: NextFunction) {
  try {
    orderDetailSchema.parse(req.body)
    next()
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Invalid order detail data provided',
      errors: error
    })
  }
}

export default { validateOrderDetail }
