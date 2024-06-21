"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_s3_1 = require("@aws-sdk/client-s3");
const buffer_1 = require("buffer");
const uuid_1 = require("uuid");
const s3_config_1 = __importDefault(require("../configs/s3.config"));
const imageAIRender_model_1 = require("../models/imageAIRender.model");
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
async function generateImageFromPrompt(data) {
    const fetch = (await import('node-fetch')).default;
    const response = await fetch('https://api-inference.huggingface.co/models/CompVis/stable-diffusion-v1-4', {
        headers: {
            Authorization: `Bearer ${process.env.HF_ACCESS_TOKEN}`
        },
        method: 'POST',
        body: JSON.stringify(data)
    });
    const fileName = `Image_${Date.now().toString()}.jpg`;
    const image = `https://${bucketName}.s3.${bucketRegion}.amazonaws.com/${fileName}`;
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
    const blob = await response.blob();
    const file = buffer_1.Buffer.from(await blob.arrayBuffer());
    const params = {
        Bucket: bucketName,
        Key: fileName,
        Body: file,
        ContentType: 'image/png'
    };
    await s3_config_1.default.send(new client_s3_1.PutObjectCommand(params));
    return image;
}
async function createAIImage(imageUrl) {
    const aiImage = await imageAIRender_model_1.ImageAIRender.create({
        id: (0, uuid_1.v4)(),
        date: new Date(),
        imageUrl,
        deleted: false
    });
    return aiImage;
} // Create AI image
exports.default = {
    generateImageFromPrompt,
    createAIImage
};
