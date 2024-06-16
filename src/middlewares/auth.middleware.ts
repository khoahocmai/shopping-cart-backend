import { NextFunction, Request, Response } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { Secret } from 'jsonwebtoken'

import { Role } from '~/constants/type'

const verifyRole = (role: Role) => (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers['authorization'] || req.cookies.token
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET as string) as JwtPayload
    if (role !== decoded.role) {
      return res.status(403).json({ message: "Don't have permission" })
    }

    next()
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized' })
  }
}

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.replace('Bearer ', '')
  if (token) {
    jwt.verify(token, process.env.SECRET as Secret, (err, decoded) => {
      if (err) {
        return res.status(401).send({ message: 'Invalid token' })
      }
      // If there's no error, proceed to the next middleware or route handler
      next()
    })
  } else {
    return res.status(401).send({ message: 'Unauthorized' })
  }
}

// const verifyTokenAdmin

export default {
  verifyRole,
  verifyToken
}
