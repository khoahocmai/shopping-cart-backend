"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const responseStatus_1 = __importDefault(require("../constants/responseStatus"));
const media_service_1 = __importDefault(require("../services/media.service"));
async function uploadImageFood(req, res) {
    try {
        const file = req.file;
        const productId = req.body.productId;
        if (!file) {
            res.json(responseStatus_1.default.MissingFieldResponse('No file uploaded'));
            return;
        }
        const result = await media_service_1.default.uploadImageFoodToS3(productId, file);
        res.json(responseStatus_1.default.CreateSuccessResponse('Upload image success', result));
    }
    catch (error) {
        res.json(responseStatus_1.default.InternalErrorResponse(error.message));
    }
} // Controller Upload image food to S3 AWS
async function uploadImageCategory(req, res) {
    try {
        const file = req.file;
        const categoryId = req.body.categoryId;
        if (!file) {
            res.json(responseStatus_1.default.MissingFieldResponse('No file uploaded'));
            return;
        }
        const result = await media_service_1.default.uploadImageCateToS3(categoryId, file);
        res.json(responseStatus_1.default.CreateSuccessResponse('Upload image success', result));
    }
    catch (error) {
        res.json(responseStatus_1.default.InternalErrorResponse(error.message));
    }
} // Controller Upload image category to S3 AWS
async function getImageFoodUrl(req, res) {
    try {
        const { id } = req.params;
        if (!id) {
            res.json(responseStatus_1.default.MissingFieldResponse('User is required'));
            return;
        }
        const url = await media_service_1.default.getFileFoodFromS3(id);
        res.json(responseStatus_1.default.DataResponse('', url));
    }
    catch (error) {
        console.error(error);
        res.json(responseStatus_1.default.InternalErrorResponse(error.message));
    }
} // Controller Get image food URL from S3 AWS
async function getImageCateUrl(req, res) {
    try {
        const { id } = req.params;
        if (!id) {
            res.json(responseStatus_1.default.MissingFieldResponse('User is required'));
            return;
        }
        const url = await media_service_1.default.getFileCateFromS3(id);
        res.json(responseStatus_1.default.DataResponse('', url));
    }
    catch (error) {
        console.error(error);
        res.json(responseStatus_1.default.InternalErrorResponse(error.message));
    }
} // Controller Get image category URL from S3 AWS
async function deleteFileFromS3(req, res) {
    try {
        const { filename } = req.params;
        if (!filename) {
            res.json(responseStatus_1.default.MissingFieldResponse('Id is required'));
            return;
        }
        await media_service_1.default.deleteFileFromS3(filename);
        res.json(responseStatus_1.default.DataResponse('Delete file success', ''));
    }
    catch (error) {
        console.error(error);
        res.json(responseStatus_1.default.InternalErrorResponse(error.message));
    }
} // Controller Delete file from S3 AWS
exports.default = {
    uploadImageFood,
    uploadImageCategory,
    getImageFoodUrl,
    getImageCateUrl,
    deleteFileFromS3
};
