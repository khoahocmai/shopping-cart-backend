"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const responseStatus_1 = __importDefault(require("../constants/responseStatus"));
const media_service_1 = __importDefault(require("../services/media.service"));
const renderImage_service_1 = __importDefault(require("../services/renderImage.service"));
async function generateImage(req, res) {
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
        const { prompt } = req.body;
        const imageUrl = await renderImage_service_1.default.generateImageFromPrompt(prompt);
        res.json(responseStatus_1.default.DataResponse('', imageUrl));
    }
    catch (error) {
        console.error('Error generating image:', error.message);
        res.status(500).send('Error generating image');
    }
}
async function createAIImage(req, res) {
    try {
        const imageUrl = req.body.imageUrl;
        if (!imageUrl) {
            res.json(responseStatus_1.default.MissingFieldResponse('No imageUrl found'));
            return;
        }
        const result = await renderImage_service_1.default.createAIImage(imageUrl);
        res.json(responseStatus_1.default.CreateSuccessResponse('Upload image success', result));
    }
    catch (error) {
        res.json(responseStatus_1.default.InternalErrorResponse(error.message));
    }
} // Controller Upload image clothes to S3 AWS
async function getAIImageUrl(req, res) {
    try {
        const { id } = req.params;
        if (!id) {
            res.json(responseStatus_1.default.MissingFieldResponse('AI Image is required'));
            return;
        }
        const url = await media_service_1.default.getFileAIImageFromS3(id);
        res.json(responseStatus_1.default.DataResponse('', url));
    }
    catch (error) {
        console.error(error);
        res.json(responseStatus_1.default.InternalErrorResponse(error.message));
    }
} // Controller Get image clothes URL from S3 AWS
exports.default = {
    generateImage,
    createAIImage,
    getAIImageUrl
};
