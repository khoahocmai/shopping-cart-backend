import { Request, Response } from 'express'

import response from '~/constants/responseStatus'
import ProductService from '~/services/product.service'

async function getProducts(req: Request, res: Response) {
  try {
    const { products, pagination } = await ProductService.getAllProducts(req)

    res.json(response.DataResponse('Get product list successfully!', products, pagination))
  } catch (error) {
    console.log(error)
    res.json(response.InternalErrorResponse())
  }
}

async function createProduct(req: Request, res: Response) {
  try {
    const product = await ProductService.createProduct(req.body)
    res.json(response.DataResponse('Create product successfully!', product))
  } catch (error) {
    console.log(error)
    res.json(response.InternalErrorResponse())
  }
} // Controller Create product

async function updateProduct(req: Request, res: Response) {
  try {
    const product = await ProductService.updateProduct(req.body)
    res.json(response.DataResponse('Update product successfully!', product))
  } catch (error) {
    console.log(error)
    res.json(response.InternalErrorResponse())
  }
} // Controller Update product

async function deleteProduct(req: Request, res: Response) {
  try {
    await ProductService.deleteProduct(req.params.id)
    res.json(response.DataResponse('Product deleted successfully', ''))
  } catch (error) {
    console.log(error)
    res.json(response.InternalErrorResponse())
  }
} // Controller Delete product

async function getProductById(req: Request, res: Response) {
  try {
    const product = await ProductService.getProductById(req.params.id)
    res.json(response.DataResponse('Get product successfully!', product))
  } catch (error) {
    console.log(error)
    res.json(response.InternalErrorResponse())
  }
} // Controller Get product by id

export default {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductById
}
