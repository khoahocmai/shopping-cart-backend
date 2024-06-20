"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const buffer_1 = require("buffer");
async function generateImageFromPrompt(data) {
    const fetch = (await import('node-fetch')).default;
    const response = await fetch('https://api-inference.huggingface.co/models/CompVis/stable-diffusion-v1-4', {
        headers: {
            Authorization: `Bearer ${process.env.HF_ACCESS_TOKEN}`
        },
        method: 'POST',
        body: JSON.stringify(data)
    });
    const arrayBuffer = await response.arrayBuffer();
    const base64Image = buffer_1.Buffer.from(arrayBuffer).toString('base64');
    return 'data:image/png;base64,' + base64Image;
    // const blob = await response.blob()
    // const objectURL = URL.createObjectURL(blob)
    // return objectURL
}
// ahsd
exports.default = {
    generateImageFromPrompt
};
