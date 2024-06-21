import { Request, Response } from 'express'

import responseStatus from '~/constants/responseStatus'
import MediaService from '~/services/media.service'

import ImageService from '../services/renderImage.service'

async function generateImage(req: Request, res: Response): Promise<void> {
  // try {
  //   const { prompt } = req.body

  //   if (!prompt) {
  //     res.status(400).send('Prompt is required')
  //     return
  //   }
  //   const url = await ImageService.generateImageFromPrompt({ inputs: prompt })
  //   res.json(responseStatus.DataResponse('', url))
  // } catch (error: any) {
  //   console.error('Error generating image:', error.message)
  //   res.status(500).send('Error generating image')
  // }
  try {
    const { prompt } = req.body
    const imageUrl = await ImageService.generateImageFromPrompt(prompt)
    res.json(responseStatus.DataResponse('', imageUrl))
  } catch (error: string | any) {
    console.error('Error generating image:', error.message)
    res.status(500).send('Error generating image')
  }
}

async function createAIImage(req: Request, res: Response): Promise<void> {
  try {
    const imageUrl = req.body.imageUrl
    if (!imageUrl) {
      res.json(responseStatus.MissingFieldResponse('No imageUrl found'))
      return
    }

    const result = await ImageService.createAIImage(imageUrl)
    res.json(responseStatus.CreateSuccessResponse('Upload image success', result))
  } catch (error: string | any) {
    res.json(responseStatus.InternalErrorResponse(error.message))
  }
} // Controller Upload image clothes to S3 AWS

async function getAIImageUrl(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params
    if (!id) {
      res.json(responseStatus.MissingFieldResponse('AI Image is required'))
      return
    }

    const url = await MediaService.getFileAIImageFromS3(id)
    res.json(responseStatus.DataResponse('', url))
  } catch (error: string | any) {
    console.error(error)
    res.json(responseStatus.InternalErrorResponse(error.message))
  }
} // Controller Get image clothes URL from S3 AWS

export default {
  generateImage,
  createAIImage,
  getAIImageUrl
}
