import { PutObjectCommand } from '@aws-sdk/client-s3'
import { S3RequestPresigner } from '@aws-sdk/s3-request-presigner'
import { formatUrl } from '@aws-sdk/util-format-url'
import { Hash } from '@smithy/hash-node'
import { HttpRequest } from '@smithy/protocol-http'
import { parseUrl } from '@smithy/url-parser'
import { Buffer } from 'buffer'
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

async function generateImageFromPrompt(data: { inputs: string }): Promise<string> {
  const fetch = (await import('node-fetch')).default
  const response = await fetch('https://api-inference.huggingface.co/models/CompVis/stable-diffusion-v1-4', {
    headers: {
      Authorization: `Bearer ${process.env.HF_ACCESS_TOKEN}`
    },
    method: 'POST',
    body: JSON.stringify(data)
  })
  const arrayBuffer = await response.arrayBuffer()
  const file = Buffer.from(arrayBuffer)
  const fileName = `Image_${Date.now().toString()}`

  const params = {
    Bucket: bucketName,
    Key: fileName,
    Body: file,
    ContentType: 'image/png'
  }
  const image = `https://${bucketName}.s3.${bucketRegion}.amazonaws.com/${fileName}`
  // const imageAIRender = await ImageAIRender.create({
  //   id: uuidv4(),
  //   date: new Date(),
  //   imageUrl: image,
  //   deleted: false
  // })

  await s3.send(new PutObjectCommand(params))

  // const url = parseUrl(imageAIRender.imageUrl)
  // const s3Presigner = new S3RequestPresigner({
  //   region: bucketRegion,
  //   credentials: {
  //     accessKeyId: bucketAccessKey,
  //     secretAccessKey: bucketSecretAccessKey
  //   },
  //   sha256: Hash.bind(null, 'sha256')
  // })
  // const presignedObj = await s3Presigner.presign(
  //   new HttpRequest({
  //     ...url,
  //     method: 'GET'
  //   })
  // )
  // return formatUrl(presignedObj)
  return image
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
