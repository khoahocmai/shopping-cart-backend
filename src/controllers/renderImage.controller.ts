import { Request, Response } from 'express'

import responseStatus from '~/constants/responseStatus'

import imageService from '../services/renderImage.service'

async function generateImage(req: Request, res: Response): Promise<void> {
  try {
    const { prompt } = req.body

    if (!prompt) {
      res.status(400).send('Prompt is required')
      return
    }
    const url = await imageService.generateImageFromPrompt({ inputs: prompt })
    res.json(responseStatus.DataResponse('', url))
  } catch (error: any) {
    console.error('Error generating image:', error.message)
    res.status(500).send('Error generating image')
  }
}

export default {
  generateImage
}
