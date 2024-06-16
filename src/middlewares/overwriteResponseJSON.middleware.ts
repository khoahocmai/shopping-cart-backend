import { NextFunction, Request, Response } from 'express'

export const overwriteResponseJSON = async (req: Request, res: Response, next: NextFunction) => {
  const originalJson = res.json.bind(res)

  res.json = (data: any): Response<any> => {
    res.json = originalJson

    if (data?.code && Number.isFinite(data.code)) {
      return res.status(data.code).json(data)
    } else {
      return res.status(200).json(data)
    }
  }

  next()
}
