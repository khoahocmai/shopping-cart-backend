import { query } from 'express-validator'

import handleValidationErrors from '~/middlewares/validation.middleware'

export const paginationValidation = [
  query('page').default(1).isInt({ min: 1 }).toInt().withMessage('page must be a positive integer'),
  query('limit').default(10).isInt({ min: 1, max: 100 }).toInt().withMessage('limit must be a positive integer'),
  handleValidationErrors
]
