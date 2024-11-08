import { DeleteObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3'
import { S3RequestPresigner } from '@aws-sdk/s3-request-presigner'
import { formatUrl } from '@aws-sdk/util-format-url'
import { Hash } from '@smithy/hash-node'
import { HttpRequest } from '@smithy/protocol-http'
import { parseUrl } from '@smithy/url-parser'
import dotenv from 'dotenv'
import { v4 as uuidv4 } from 'uuid'

import s3 from '~/configs/s3.config'
import { ImageAIRender } from '~/models/imageAIRender.model'

import productService from './product.service'
dotenv.config()

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

async function uploadImageClothesToS3(file: Express.Multer.File): Promise<string> {
  try {
    if (!file) {
      throw new Error('Not found File')
    }
    if (!isImageFile(file)) {
      throw new Error('Invalid file format. Only image files are allowed.')
    }
    if (file.size > 5 * 1024 * 1024) {
      throw new Error('File size exceeds the maximum limit of 5MB.')
    }
    const fileName = `Image_${Date.now().toString()}_${file.mimetype.split('/')[1]}`
    const params = {
      Bucket: bucketName,
      Key: fileName,
      Body: file.buffer,
      ContentType: file.mimetype
    }
    const image = `https://${bucketName}.s3.${bucketRegion}.amazonaws.com/${fileName}`

    await s3.send(new PutObjectCommand(params))
    return image
  } catch (error) {
    console.error('Error uploading file:', error)
    return Promise.reject(error)
  }
} // Upload image food to S3 AWS

async function getFileClothesFromS3(productId: string): Promise<string> {
  try {
    const product = await productService.getProductById(productId)
    if (!product) {
      throw new Error('Not found')
    }
    const url = parseUrl(product.imageUrl)
    const s3Presigner = new S3RequestPresigner({
      region: bucketRegion,
      credentials: {
        accessKeyId: bucketAccessKey,
        secretAccessKey: bucketSecretAccessKey
      },
      sha256: Hash.bind(null, 'sha256')
    })
    const presignedObj = await s3Presigner.presign(
      new HttpRequest({
        ...url,
        method: 'GET'
      })
    )
    return formatUrl(presignedObj)
  } catch (error) {
    console.error('Error get file:', error)
    throw error
  }
} // Get image food from S3

async function uploadAIImageToS3(file: Express.Multer.File): Promise<string> {
  try {
    if (!file) {
      throw new Error('Not found File')
    }
    if (!isImageFile(file)) {
      throw new Error('Invalid file format. Only image files are allowed.')
    }
    if (file.size > 5 * 1024 * 1024) {
      throw new Error('File size exceeds the maximum limit of 5MB.')
    }
    const fileName = `Image_${Date.now().toString()}`
    const params = {
      Bucket: bucketName,
      Key: fileName,
      Body: file.buffer,
      ContentType: file.mimetype
    }
    const image = `https://${bucketName}.s3.${bucketRegion}.amazonaws.com/${fileName}`
    await ImageAIRender.create({ id: uuidv4(), date: new Date(), imageUrl: image, deleted: false })

    await s3.send(new PutObjectCommand(params))
    return image
  } catch (error) {
    console.error('Error uploading file:', error)
    return Promise.reject(error)
  }
} // Upload image food to S3 AWS

async function getFileAIImageFromS3(id: string): Promise<string> {
  try {
    const aiImage = await ImageAIRender.findOne({ where: { id } })
    if (!aiImage) {
      throw new Error('Not found')
    }
    const url = parseUrl(aiImage.imageUrl)
    const s3Presigner = new S3RequestPresigner({
      region: bucketRegion,
      credentials: {
        accessKeyId: bucketAccessKey,
        secretAccessKey: bucketSecretAccessKey
      },
      sha256: Hash.bind(null, 'sha256')
    })
    const presignedObj = await s3Presigner.presign(
      new HttpRequest({
        ...url,
        method: 'GET'
      })
    )
    return formatUrl(presignedObj)
  } catch (error) {
    console.error('Error get file:', error)
    throw error
  }
} // Get image food from S3

async function deleteFileFromS3(fileName: string): Promise<void> {
  try {
    const params = {
      Bucket: bucketName,
      Key: fileName
    }
    await s3.send(new DeleteObjectCommand(params))
    return Promise.resolve()
  } catch (error) {
    console.error('Error delete file:', error)
    return Promise.reject(error)
  }
} // Delete any file by file name from S3

function isImageFile(file: Express.Multer.File): boolean {
  const fileName = file.originalname
  const fileExtension = fileName.substring(fileName.lastIndexOf('.') + 1).toLowerCase()
  return fileExtension === 'jpg' || fileExtension === 'jpeg' || fileExtension === 'png' || fileExtension === 'gif'
} // Check file is good format
//commit for push
export default {
  uploadImageClothesToS3,
  getFileClothesFromS3,
  uploadAIImageToS3,
  getFileAIImageFromS3,
  deleteFileFromS3
}
