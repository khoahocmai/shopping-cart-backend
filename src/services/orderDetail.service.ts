import { v4 as uuidv4 } from 'uuid'

import { CreateOrderDetail, UpdateOrderDetail } from '~/constants/type'
import { Order } from '~/models/order.model'
import { OrderDetail } from '~/models/orderDetail.model'
import { Product } from '~/models/product.model'
import { User } from '~/models/user.model'

// Assuming you have services for Order and Product
import orderService from './order.service'
import productService from './product.service'

async function getAllOrderDetails() {
  const orderDetails = await OrderDetail.findAll({
    include: [
      { model: Order, as: 'order' },
      { model: User, as: 'waiter' },
      { model: Product, as: 'product' }
    ]
  })
  return orderDetails
} // Get all order details

async function getOrderDetailById(orderDetailId: string) {
  const orderDetail = await OrderDetail.findByPk(orderDetailId, {
    include: [
      { model: Order, as: 'order' },
      { model: User, as: 'waiter' },
      { model: Product, as: 'product' }
    ]
  })
  return orderDetail
} // Get order detail by Id

async function getOrderDetailsByOrderId(orderId: string) {
  const orderDetail = await OrderDetail.findAll({
    where: { orderId },
    include: [
      { model: Order, as: 'order' },
      { model: User, as: 'waiter' },
      { model: Product, as: 'product' }
    ]
  })
  return orderDetail
} // Get order detail by Order Id

async function createOrderDetail(orderId: string, orderDetail: CreateOrderDetail) {
  const order = await orderService.getOrderById(orderId)
  if (!order) {
    throw new Error('Not found order')
  }

  const product = await productService.getProductById(orderDetail.productId)
  if (!product) {
    throw new Error('Not found product')
  }

  const price = product.price * orderDetail.quantity
  const result = await OrderDetail.create({
    id: uuidv4(),
    orderId: orderId,
    productId: orderDetail.productId,
    quantity: orderDetail.quantity,
    price: price,
    sizes: orderDetail.sizes,
    design: orderDetail.design,
    orderTime: new Date(),
    deleted: false
  })
  return result
} // Create order detail

async function updateOrderDetail(orderDetail: UpdateOrderDetail) {
  const updatedOrderDetail = await OrderDetail.update(orderDetail, {
    where: { id: orderDetail.id }
  })
  return updatedOrderDetail
} // Update order detail

async function deleteOrderDetail(orderDetailId: string) {
  const result = await OrderDetail.update({ deleted: true }, { where: { id: orderDetailId } })
  return result
} // Delete order detail

export default {
  getAllOrderDetails,
  getOrderDetailById,
  getOrderDetailsByOrderId,
  createOrderDetail,
  updateOrderDetail,
  deleteOrderDetail
}
