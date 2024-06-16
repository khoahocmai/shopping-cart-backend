"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
if (!process.env.AWS_ACCESS_KEY_ID ||
    !process.env.AWS_SECRET_ACCESS_KEY ||
    !process.env.AWS_S3_BUCKET ||
    !process.env.AWS_REGION) {
    console.error('Missing necessary environment variables for AWS configuration.');
    process.exit(1);
}
const bucketAccessKey = process.env.AWS_ACCESS_KEY_ID;
const bucketSecretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
const bucketName = process.env.AWS_S3_BUCKET;
const bucketRegion = process.env.AWS_REGION;
async function uploadImageFoodToS3(productId, file) {
    // try {
    //   const product = await productService.getProductById(productId)
    //   if (!product) {
    //     throw new Error('Not found Product')
    //   }
    //   if (!file) {
    //     throw new Error('Not found File')
    //   }
    //   if (!isImageFile(file)) {
    //     throw new Error('Invalid file format. Only image files are allowed.')
    //   }
    //   if (file.size > 5 * 1024 * 1024) {
    //     throw new Error('File size exceeds the maximum limit of 5MB.')
    //   }
    //   const fileName = `Image_${Date.now().toString()}_${file.mimetype.split('/')[1]}`
    //   if (product.imageUrl) {
    //     const parts = product.imageUrl.split('/')
    //     const fileNameAWS = parts[parts.length - 1]
    //     await deleteFileFromS3(fileNameAWS)
    //   }
    //   const params = {
    //     Bucket: bucketName,
    //     Key: fileName,
    //     Body: file.buffer,
    //     ContentType: file.mimetype
    //   }
    //   const image = `https://${bucketName}.s3.${bucketRegion}.amazonaws.com/${fileName}`
    //   product.imageUrl = image
    //   await productService.updateProduct(product)
    //   await s3.send(new PutObjectCommand(params))
    //   return Promise.resolve()
    // } catch (error) {
    //   console.error('Error uploading file:', error)
    //   return Promise.reject(error)
    // }
} // Upload image food to S3 AWS
async function uploadImageCateToS3(categoryId, file) {
    // try {
    //   const category = await categoryService.getCategoryById(categoryId)
    //   if (!category) {
    //     throw new Error('Not found Category')
    //   }
    //   if (!file) {
    //     throw new Error('Not found File')
    //   }
    //   if (!isImageFile(file)) {
    //     throw new Error('Invalid file format. Only image files are allowed.')
    //   }
    //   if (file.size > 5 * 1024 * 1024) {
    //     throw new Error('File size exceeds the maximum limit of 5MB.')
    //   }
    //   const fileName = `Image_${Date.now().toString()}_${file.mimetype.split('/')[1]}`
    //   if (category.imageUrl) {
    //     const parts = category.imageUrl.split('/')
    //     const fileNameAWS = parts[parts.length - 1]
    //     await deleteFileFromS3(fileNameAWS)
    //   }
    //   const params = {
    //     Bucket: bucketName,
    //     Key: fileName,
    //     Body: file.buffer,
    //     ContentType: file.mimetype
    //   }
    //   const image = `https://${bucketName}.s3.${bucketRegion}.amazonaws.com/${fileName}`
    //   category.imageUrl = image
    //   await categoryService.updateCategory(category)
    //   await s3.send(new PutObjectCommand(params))
    //   return Promise.resolve()
    // } catch (error) {
    //   console.error('Error uploading file:', error)
    //   return Promise.reject(error)
    // }
} // Upload image category to S3 AWS
async function getFileFoodFromS3(productId) {
    // try {
    //   const product = await productService.getProductById(productId)
    //   if (!product) {
    //     throw new Error('Not found')
    //   }
    //   const url = parseUrl(product.imageUrl)
    //   const s3Presigner = new S3RequestPresigner({
    //     region: bucketRegion,
    //     credentials: {
    //       accessKeyId: bucketAccessKey,
    //       secretAccessKey: bucketSecretAccessKey
    //     },
    //     sha256: Hash.bind(null, 'sha256')
    //   })
    //   const presignedObj = await s3Presigner.presign(
    //     new HttpRequest({
    //       ...url,
    //       method: 'GET'
    //     })
    //   )
    //   return formatUrl(presignedObj)
    // } catch (error) {
    //   console.error('Error get file:', error)
    //   throw error
    // }
    return 'abc';
} // Get image food from S3
async function getFileCateFromS3(categoryId) {
    // try {
    //   const category = await categoryService.getCategoryById(categoryId)
    //   if (!category) {
    //     throw new Error('Not found')
    //   }
    //   const url = parseUrl(category.imageUrl)
    //   const s3Presigner = new S3RequestPresigner({
    //     region: bucketRegion,
    //     credentials: {
    //       accessKeyId: bucketAccessKey,
    //       secretAccessKey: bucketSecretAccessKey
    //     },
    //     sha256: Hash.bind(null, 'sha256')
    //   })
    //   const presignedObj = await s3Presigner.presign(
    //     new HttpRequest({
    //       ...url,
    //       method: 'GET'
    //     })
    //   )
    //   return formatUrl(presignedObj)
    // } catch (error) {
    //   console.error('Error get file:', error)
    //   throw error
    // }
    return 'abc';
} // Get image category from S3
async function deleteFileFromS3(fileName) {
    // try {
    //   const params = {
    //     Bucket: bucketName,
    //     Key: fileName
    //   }
    //   await s3.send(new DeleteObjectCommand(params))
    //   return Promise.resolve()
    // } catch (error) {
    //   console.error('Error delete file:', error)
    //   return Promise.reject(error)
    // }
} // Delete any file by file name from S3
function isImageFile(file) {
    const fileName = file.originalname;
    const fileExtension = fileName.substring(fileName.lastIndexOf('.') + 1).toLowerCase();
    return fileExtension === 'jpg' || fileExtension === 'jpeg' || fileExtension === 'png' || fileExtension === 'gif';
} // Check file is good format
exports.default = {
    uploadImageFoodToS3,
    uploadImageCateToS3,
    getFileFoodFromS3,
    getFileCateFromS3,
    deleteFileFromS3
};
