import { Buffer } from 'buffer'

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
  const base64Image = Buffer.from(arrayBuffer).toString('base64')
  return 'data:image/png;base64,' + base64Image
}
// ahsd
export default {
  generateImageFromPrompt
}
