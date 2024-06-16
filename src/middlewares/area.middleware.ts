import { NextFunction, Request, Response } from 'express'
import { z } from 'zod'

const areaSchema = z.object({
  categoryId: z.string(),
  name: z.string().min(1),
  price: z.number().positive(),
  previousPrice: z.number().positive(),
  status: z.enum(['Available', 'Unavailable']),
  imageUrl: z.string().url(),
  deleted: z.boolean()
})

// Define a validation middleware function
const validateArea = (req: Request, res: Response, next: NextFunction) => {
  try {
    areaSchema.parse(req.body)
    next()
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Invalid request area data',
      errors: error
    })
  }
}

export default {
  validateArea
}
