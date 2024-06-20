"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_s3_1 = require("@aws-sdk/client-s3");
const s3_request_presigner_1 = require("@aws-sdk/s3-request-presigner");
const util_format_url_1 = require("@aws-sdk/util-format-url");
const hash_node_1 = require("@smithy/hash-node");
const protocol_http_1 = require("@smithy/protocol-http");
const url_parser_1 = require("@smithy/url-parser");
const dotenv_1 = __importDefault(require("dotenv"));
const uuid_1 = require("uuid");
const s3_config_1 = __importDefault(require("../configs/s3.config"));
const imageAIRender_model_1 = require("../models/imageAIRender.model");
const product_service_1 = __importDefault(require("./product.service"));
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
async function uploadImageClothesToS3(productId, file) {
    try {
        const product = await product_service_1.default.getProductById(productId);
        if (!product) {
            throw new Error('Not found Product');
        }
        if (!file) {
            throw new Error('Not found File');
        }
        if (!isImageFile(file)) {
            throw new Error('Invalid file format. Only image files are allowed.');
        }
        if (file.size > 5 * 1024 * 1024) {
            throw new Error('File size exceeds the maximum limit of 5MB.');
        }
        const fileName = `Image_${Date.now().toString()}_${file.mimetype.split('/')[1]}`;
        if (product.imageUrl) {
            const parts = product.imageUrl.split('/');
            const fileNameAWS = parts[parts.length - 1];
            await deleteFileFromS3(fileNameAWS);
        }
        const params = {
            Bucket: bucketName,
            Key: fileName,
            Body: file.buffer,
            ContentType: file.mimetype
        };
        const image = `https://${bucketName}.s3.${bucketRegion}.amazonaws.com/${fileName}`;
        product.imageUrl = image;
        await product_service_1.default.updateProduct(product);
        await s3_config_1.default.send(new client_s3_1.PutObjectCommand(params));
        return Promise.resolve();
    }
    catch (error) {
        console.error('Error uploading file:', error);
        return Promise.reject(error);
    }
} // Upload image food to S3 AWS
async function getFileClothesFromS3(productId) {
    try {
        const product = await product_service_1.default.getProductById(productId);
        if (!product) {
            throw new Error('Not found');
        }
        const url = (0, url_parser_1.parseUrl)(product.imageUrl);
        const s3Presigner = new s3_request_presigner_1.S3RequestPresigner({
            region: bucketRegion,
            credentials: {
                accessKeyId: bucketAccessKey,
                secretAccessKey: bucketSecretAccessKey
            },
            sha256: hash_node_1.Hash.bind(null, 'sha256')
        });
        const presignedObj = await s3Presigner.presign(new protocol_http_1.HttpRequest({
            ...url,
            method: 'GET'
        }));
        return (0, util_format_url_1.formatUrl)(presignedObj);
    }
    catch (error) {
        console.error('Error get file:', error);
        throw error;
    }
} // Get image food from S3
async function uploadAIImageToS3(file) {
    try {
        if (!file) {
            throw new Error('Not found File');
        }
        if (!isImageFile(file)) {
            throw new Error('Invalid file format. Only image files are allowed.');
        }
        if (file.size > 5 * 1024 * 1024) {
            throw new Error('File size exceeds the maximum limit of 5MB.');
        }
        const fileName = `Image_${Date.now().toString()}`;
        const params = {
            Bucket: bucketName,
            Key: fileName,
            Body: file.buffer,
            ContentType: file.mimetype
        };
        const image = `https://${bucketName}.s3.${bucketRegion}.amazonaws.com/${fileName}`;
        await imageAIRender_model_1.ImageAIRender.create({ id: (0, uuid_1.v4)(), date: new Date(), imageUrl: image, deleted: false });
        await s3_config_1.default.send(new client_s3_1.PutObjectCommand(params));
        return Promise.resolve();
    }
    catch (error) {
        console.error('Error uploading file:', error);
        return Promise.reject(error);
    }
} // Upload image food to S3 AWS
async function getFileAIImageFromS3(id) {
    try {
        const aiImage = await imageAIRender_model_1.ImageAIRender.findOne({ where: { id } });
        if (!aiImage) {
            throw new Error('Not found');
        }
        const url = (0, url_parser_1.parseUrl)(aiImage.imageUrl);
        const s3Presigner = new s3_request_presigner_1.S3RequestPresigner({
            region: bucketRegion,
            credentials: {
                accessKeyId: bucketAccessKey,
                secretAccessKey: bucketSecretAccessKey
            },
            sha256: hash_node_1.Hash.bind(null, 'sha256')
        });
        const presignedObj = await s3Presigner.presign(new protocol_http_1.HttpRequest({
            ...url,
            method: 'GET'
        }));
        return (0, util_format_url_1.formatUrl)(presignedObj);
    }
    catch (error) {
        console.error('Error get file:', error);
        throw error;
    }
} // Get image food from S3
async function deleteFileFromS3(fileName) {
    try {
        const params = {
            Bucket: bucketName,
            Key: fileName
        };
        await s3_config_1.default.send(new client_s3_1.DeleteObjectCommand(params));
        return Promise.resolve();
    }
    catch (error) {
        console.error('Error delete file:', error);
        return Promise.reject(error);
    }
} // Delete any file by file name from S3
function isImageFile(file) {
    const fileName = file.originalname;
    const fileExtension = fileName.substring(fileName.lastIndexOf('.') + 1).toLowerCase();
    return fileExtension === 'jpg' || fileExtension === 'jpeg' || fileExtension === 'png' || fileExtension === 'gif';
} // Check file is good format
//commit for push
exports.default = {
    uploadImageClothesToS3,
    getFileClothesFromS3,
    uploadAIImageToS3,
    getFileAIImageFromS3,
    deleteFileFromS3
};
