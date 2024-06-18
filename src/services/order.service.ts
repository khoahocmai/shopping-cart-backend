import { Request } from 'express'
import { Op, WhereOptions } from 'sequelize'
import { v4 as uuidv4 } from 'uuid'

import { CreateOrder, CreateOrderDetail, UpdateOrder } from '~/constants/type'
import { Order, OrderAttributes } from '~/models/order.model'

import orderDetailService from './orderDetail.service'

async function getAllOrders(req: Request) {
  const { page_index = 1, page_size = 10, status } = req.query

  const mapStatus = (statusNum: string) => {
    const statusValue = parseInt(statusNum)
    if (statusValue === 1) return 'Pending'
    if (statusValue === 0) return 'Completed'
    return undefined
  }

  const statusArray = status ? (status as string).split(',').map(mapStatus) : undefined

  const orders = await Order.findAll({
    where: {
      ...(statusArray && { status: { [Op.in]: statusArray } })
    } as WhereOptions<OrderAttributes> | undefined,
    limit: Number(page_size),
    offset: (Number(page_index) - 1) * Number(page_size)
  })
  return orders
} // Get all orders

async function getOrderById(orderId: string) {
  const order = await Order.findOne({ where: { id: orderId } })
  return order
} // Get order by Id

async function createOrder(req: Request) {
  const { order, orderDetails } = req.body as { order: CreateOrder; orderDetails: CreateOrderDetail[] }

  const totalAmountNumber = parseFloat(order.totalAmount)

  const result = await Order.create({
    id: uuidv4(),
    date: new Date(),
    totalAmount: totalAmountNumber,
    status: 'Pending',
    name: order.name,
    address: order.address,
    phone: order.phone,
    deleted: false
  })

  const orderDetailsPromises = orderDetails.map((detail) => {
    return orderDetailService.createOrderDetail(result.id, detail)
  })
  await Promise.all(orderDetailsPromises)

  return result
} // Create order

async function updateOrder(order: UpdateOrder) {
  const currentOrder = await Order.findOne({
    where: { id: order.id }
  })

  if (!currentOrder) {
    throw new Error('Order not found')
  }

  if (currentOrder.status === 'Completed') {
    throw new Error('Cannot update an order that is already Completed')
  }

  const updatedOrder = await Order.update(
    {
      date: new Date(),
      totalAmount: order.totalAmount,
      status: order.status
    },
    {
      where: { id: order.id }
    }
  )
  return updatedOrder
} // Update order

async function deleteOrder(orderId: string) {
  const result = await Order.update({ deleted: true }, { where: { id: orderId } })
  return result
} // Delete order

async function calculateTotalCompletedOrders() {
  const completedOrders = await Order.findAll({ where: { status: 'Completed' } })
  let totalAmount = 0

  completedOrders.forEach((order) => {
    totalAmount += order.totalAmount
  })

  return totalAmount
} // Calculate total completed orders

export default {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
  calculateTotalCompletedOrders
}
