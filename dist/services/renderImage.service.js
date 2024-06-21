"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const buffer_1 = require("buffer");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const util_1 = require("util");
const uuid_1 = require("uuid");
const imageAIRender_model_1 = require("../models/imageAIRender.model");
const HF_ACCESS_TOKEN = process.env.HF_ACCESS_TOKEN;
const writeFile = (0, util_1.promisify)(fs_1.default.writeFile);
async function generateImageFromPrompt(data) {
    try {
        const response = await fetch('https://api-inference.huggingface.co/models/CompVis/stable-diffusion-v1-4', {
            headers: {
                Authorization: `Bearer ${HF_ACCESS_TOKEN}`,
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            throw new Error(`Failed to generate image: ${response.statusText}`);
        }
        else {
            const blob = await response.blob();
            const arrayBuffer = await blob.arrayBuffer();
            const buffer = buffer_1.Buffer.from(arrayBuffer);
            const downloadsDir = path_1.default.join(__dirname, '..', 'tmps');
            // Lưu hình ảnh vào file
            const fileName = `Image_${Date.now().toString()}.png`;
            const filePath = path_1.default.join(downloadsDir, fileName);
            await writeFile(filePath, buffer);
            return filePath;
        }
    }
    catch (error) {
        throw new Error(`Error: ${error.message}`);
    }
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
