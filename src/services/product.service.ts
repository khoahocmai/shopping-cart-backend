import { Request } from 'express'
import { Op, WhereOptions } from 'sequelize'

import { Product, ProductAttributes } from '~/models/product.model'

async function getAllProducts(req: Request) {
  const { status, price_from, price_to, page_index = 1, page_size = 10, keyword } = req.query

  const mapStatus = (statusNum: string) => {
    const statusValue = parseInt(statusNum)
    if (statusValue === 1) return 'Available'
    if (statusValue === 0) return 'Unavailable'
    return undefined
  }

  const statusArray = status ? (status as string).split(',').map(mapStatus) : undefined

  const priceRange = price_from && price_to ? [Number(price_from), Number(price_to)] : undefined

  const { count, rows: products } = await Product.findAndCountAll({
    where: {
      ...(statusArray && { status: { [Op.in]: statusArray } }),
      ...(priceRange && { price: { [Op.between]: priceRange } }),
      ...(keyword && { name: { [Op.like]: `%${keyword}%` } })
    } as WhereOptions<ProductAttributes> | undefined,
    limit: Number(page_size),
    offset: (Number(page_index) - 1) * Number(page_size)
  })

  const totalPage = Math.ceil(count / Number(page_size))
  const pagination = {
    pageSize: Number(page_size),
    totalItem: count,
    currentPage: Number(page_index),
    maxPageSize: 100,
    totalPage: totalPage
  }

  return { products: products, pagination: pagination }
}

async function getProductById(id: string) {
  const product = await Product.findByPk(id)
  if (product) {
    // Convert the product instance into a plain object
    const productData = product.get({ plain: true })

    return productData
  }
  return null
} // Get product by id

async function createProduct(productData: ProductAttributes) {
  const product = await Product.create({
    id: productData.id,
    name: productData.name,
    description: productData.description,
    price: productData.price,
    previousPrice: productData.previousPrice,
    status: productData.status,
    imageUrl: productData.imageUrl,
    category: productData.category,
    deleted: productData.deleted
  })
  return product
} // Create product

async function updateProduct(productData: ProductAttributes) {
  const product = await Product.update(productData, {
    where: { id: productData.id }
  })
  return product
} // Update product

async function deleteProduct(id: string) {
  const result = await Product.update(
    {
      deleted: true
    },
    {
      where: { id: id }
    }
  )
  return result
} // Delete product

export default {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
}
