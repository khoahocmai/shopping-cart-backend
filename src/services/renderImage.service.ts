import { PutObjectCommand } from '@aws-sdk/client-s3'
import { S3RequestPresigner } from '@aws-sdk/s3-request-presigner'
import { formatUrl } from '@aws-sdk/util-format-url'
import { Hash } from '@smithy/hash-node'
import { HttpRequest } from '@smithy/protocol-http'
import { parseUrl } from '@smithy/url-parser'
import { Buffer } from 'buffer'
import fs from 'fs'
import path from 'path'
import { promisify } from 'util'
import { v4 as uuidv4 } from 'uuid'

import s3 from '~/configs/s3.config'
import { ImageAIRender } from '~/models/imageAIRender.model'

if (
  !process.env.AWS_ACCESS_KEY_ID ||
  !process.env.AWS_SECRET_ACCESS_KEY ||
  !process.env.AWS_S3_BUCKET ||
  !process.env.AWS_REGION
) {
  console.error('Missing necessary environment variables for AWS configuration.')
  process.exit(1)
}

const bucketAccessKey = process.env.AWS_ACCESS_KEY_ID
const bucketSecretAccessKey = process.env.AWS_SECRET_ACCESS_KEY
const bucketName = process.env.AWS_S3_BUCKET
const bucketRegion = process.env.AWS_REGION
const HF_ACCESS_TOKEN = process.env.HF_ACCESS_TOKEN
const writeFile = promisify(fs.writeFile)
// async function generateImageFromPrompt(data: { inputs: string }): Promise<string> {
//   const fetch = (await import('node-fetch')).default

//   // Gọi API để tạo ảnh
//   const response = await fetch('https://api-inference.huggingface.co/models/CompVis/stable-diffusion-v1-4', {
//     headers: {
//       Authorization: `Bearer ${process.env.HF_ACCESS_TOKEN}`,
//       'Content-Type': 'application/json'
//     },
//     method: 'POST',
//     body: JSON.stringify(data)
//   })

//   if (!response.ok) {
//     throw new Error(`Failed to generate image: ${response.statusText}`)
//   }

//   const blob = await response.blob()
//   const arrayBuffer = await blob.arrayBuffer()
//   const buffer = Buffer.from(arrayBuffer)

//   // Tạo tên tệp và URL
//   const fileName = `Image_${Date.now().toString()}.jpg`
//   const imageUrl = `https://${bucketName}.s3.${bucketRegion}.amazonaws.com/${fileName}`

//   // Cấu hình params cho S3
//   const params = {
//     Bucket: bucketName,
//     Key: fileName,
//     Body: buffer,
//     ContentType: 'image/jpeg' // Đảm bảo rằng đây là loại nội dung phù hợp
//   }

//   // Đẩy tệp lên S3
//   await s3.send(new PutObjectCommand(params))

//   // Trả về URL của ảnh
//   return imageUrl
// }
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
