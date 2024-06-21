import { Buffer } from 'buffer'
import fs from 'fs'
import path from 'path'
import { promisify } from 'util'
import { v4 as uuidv4 } from 'uuid'

import { ImageAIRender } from '~/models/imageAIRender.model'

const HF_ACCESS_TOKEN = process.env.HF_ACCESS_TOKEN
const writeFile = promisify(fs.writeFile)

async function generateImageFromPrompt(data: { inputs: string }): Promise<string> {
  try {
    const response = await fetch('https://api-inference.huggingface.co/models/CompVis/stable-diffusion-v1-4', {
      headers: {
        Authorization: `Bearer ${HF_ACCESS_TOKEN}`,
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(data)
    })

    if (!response.ok) {
      throw new Error(`Failed to generate image: ${response.statusText}`)
    } else {
      const blob = await response.blob()
      const arrayBuffer = await blob.arrayBuffer()
      const buffer = Buffer.from(arrayBuffer)

      const downloadsDir = path.join(__dirname, '..', 'tmps')

      // Lưu hình ảnh vào file
      const fileName = `Image_${Date.now().toString()}.png`
      const filePath = path.join(downloadsDir, fileName)

      await writeFile(filePath, buffer)
      return filePath
    }
  } catch (error: string | any) {
    throw new Error(`Error: ${error.message}`)
  }
}

async function createAIImage(imageUrl: string) {
  const aiImage = await ImageAIRender.create({
    id: uuidv4(),
    date: new Date(),
    imageUrl,
    deleted: false
  })
  return aiImage
} // Create AI image

export default {
  generateImageFromPrompt,
  createAIImage
}
