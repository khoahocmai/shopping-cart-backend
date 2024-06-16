import { NextFunction, Request, Response } from 'express'
import { z } from 'zod'

const tableSchema = z.object({
  name: z.string(),
  description: z.string().nullable(),
  status: z.enum(['Available', 'Fixing']),
  deleted: z.boolean()
})

// Define a validation middleware function
const validateTable = (req: Request, res: Response, next: NextFunction) => {
  try {
    tableSchema.parse(req.body)
    next()
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Invalid request table data',
      errors: error
    })
  }
}

export default {
  validateTable
}
