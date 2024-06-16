import { NextFunction, Request, Response } from 'express'
import { z } from 'zod'

// Define the category schema using Zod
const categorySchema = z.object({
  name: z.string().min(1, 'Category name must have at least one character'),
  description: z.string().nullable(),
  imageUrl: z.string().url('Invalid image URL format'),
  deleted: z.boolean().optional()
})

// Generic validation function (refer to previous explanation)
function validateCategory(req: Request, res: Response, next: NextFunction) {
  try {
    categorySchema.parse(req.body)
    next()
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Invalid category data provided',
      errors: error
    })
  }
}

export default { validateCategory }
