"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const responseStatus_1 = __importDefault(require("../constants/responseStatus"));
const renderImage_service_1 = __importDefault(require("../services/renderImage.service"));
async function generateImage(req, res) {
    try {
        const { prompt } = req.body;
        if (!prompt) {
            res.status(400).send('Prompt is required');
            return;
        }
        const url = await renderImage_service_1.default.generateImageFromPrompt({ inputs: prompt });
        res.json(responseStatus_1.default.DataResponse('', url));
    }
    catch (error) {
        console.error('Error generating image:', error.message);
        res.status(500).send('Error generating image');
    }
}
exports.default = {
    generateImage
};
