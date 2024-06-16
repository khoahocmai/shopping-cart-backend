import { Request, Response } from 'express'

import responseStatus from '~/constants/responseStatus'
import MediaService from '~/services/media.service'

async function uploadImageFood(req: Request, res: Response): Promise<void> {
  try {
    const file = req.file
    const productId = req.body.productId
    if (!file) {
      res.json(responseStatus.MissingFieldResponse('No file uploaded'))
      return
    }

    const result = await MediaService.uploadImageFoodToS3(productId, file)
    res.json(responseStatus.CreateSuccessResponse('Upload image success', result))
  } catch (error: string | any) {
    res.json(responseStatus.InternalErrorResponse(error.message))
  }
} // Controller Upload image food to S3 AWS

async function uploadImageCategory(req: Request, res: Response): Promise<void> {
  try {
    const file = req.file
    const categoryId = req.body.categoryId
    if (!file) {
      res.json(responseStatus.MissingFieldResponse('No file uploaded'))
      return
    }

    const result = await MediaService.uploadImageCateToS3(categoryId, file)
    res.json(responseStatus.CreateSuccessResponse('Upload image success', result))
  } catch (error: string | any) {
    res.json(responseStatus.InternalErrorResponse(error.message))
  }
} // Controller Upload image category to S3 AWS

async function getImageFoodUrl(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params
    if (!id) {
      res.json(responseStatus.MissingFieldResponse('User is required'))
      return
    }

    const url = await MediaService.getFileFoodFromS3(id)
    res.json(responseStatus.DataResponse('', url))
  } catch (error: string | any) {
    console.error(error)
    res.json(responseStatus.InternalErrorResponse(error.message))
  }
} // Controller Get image food URL from S3 AWS

async function getImageCateUrl(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params
    if (!id) {
      res.json(responseStatus.MissingFieldResponse('User is required'))
      return
    }

    const url = await MediaService.getFileCateFromS3(id)
    res.json(responseStatus.DataResponse('', url))
  } catch (error: string | any) {
    console.error(error)
    res.json(responseStatus.InternalErrorResponse(error.message))
  }
} // Controller Get image category URL from S3 AWS

async function deleteFileFromS3(req: Request, res: Response): Promise<void> {
  try {
    const { filename } = req.params
    if (!filename) {
      res.json(responseStatus.MissingFieldResponse('Id is required'))
      return
    }

    await MediaService.deleteFileFromS3(filename)
    res.json(responseStatus.DataResponse('Delete file success', ''))
  } catch (error: string | any) {
    console.error(error)
    res.json(responseStatus.InternalErrorResponse(error.message))
  }
} // Controller Delete file from S3 AWS

export default {
  uploadImageFood,
  uploadImageCategory,
  getImageFoodUrl,
  getImageCateUrl,
  deleteFileFromS3
}
