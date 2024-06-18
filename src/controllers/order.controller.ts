import { Request, Response } from 'express'

import responseStatus from '~/constants/responseStatus'
import { UpdateOrder } from '~/constants/type'
import OrderService from '~/services/order.service'

async function getOrders(req: Request, res: Response) {
  try {
    const orders = await OrderService.getAllOrders(req)
    res.json(responseStatus.DataResponse('Get order list successfully!', orders))
  } catch (error: string | any) {
    console.log(error)
    res.json(responseStatus.InternalErrorResponse(error.message))
  }
} // Controller Get all orders

async function getOrder(req: Request, res: Response) {
  try {
    const orderId = req.params.id
    const order = await OrderService.getOrderById(orderId)
    if (!order) {
      res.json(responseStatus.NotFoundResponse('Not found any Order'))
    }
    res.json(responseStatus.DataResponse('Get order successfully!', order))
  } catch (error: string | any) {
    console.log(error)
    res.json(responseStatus.InternalErrorResponse(error.message))
  }
} // Controller Get order by Id

async function createOrder(req: Request, res: Response) {
  try {
    const order = await OrderService.createOrder(req)
    if (!order) {
      res.json(responseStatus.MessageResponse('Error in create Order'))
    }
    res.json(responseStatus.CreateSuccessResponse('', order))
  } catch (error: string | any) {
    console.log(error)
    // Handle specific errors like not found customer or table
    if (error.message === 'Not found table' || error.message === 'Not found customer') {
      res.json(responseStatus.MessageResponse(error.message))
    } else {
      res.json(responseStatus.InternalErrorResponse(error.message))
    }
  }
} // Controller Create order

async function updateOrder(req: Request, res: Response) {
  try {
    const updateData: UpdateOrder = req.body
    const order = await OrderService.updateOrder(updateData)
    if (!order) {
      res.json(responseStatus.MessageResponse('Error in update Order'))
    }
    res.json(responseStatus.MessageResponse('Update Order success'))
  } catch (error: string | any) {
    console.log(error)
    res.json(responseStatus.InternalErrorResponse(error.message))
  }
} // Controller Update order

async function deleteOrder(req: Request, res: Response) {
  try {
    const orderId = req.params.id
    const order = await OrderService.deleteOrder(orderId)
    if (!order) {
      res.json(responseStatus.MessageResponse('Error in delete Order'))
    }
    res.json(responseStatus.MessageResponse('Delete Order success'))
  } catch (error: string | any) {
    console.log(error)
    res.json(responseStatus.InternalErrorResponse(error.message))
  }
} // Controller Delete order

async function calculateTotalCompletedOrders(req: Request, res: Response) {
  try {
    const totalOrders = await OrderService.calculateTotalCompletedOrders()
    res.json(responseStatus.DataResponse('Get total amount order', totalOrders))
  } catch (error: string | any) {
    console.log(error)
    res.json(responseStatus.InternalErrorResponse(error.message))
  }
}

export default {
  getOrders,
  getOrder,
  createOrder,
  updateOrder,
  deleteOrder,
  calculateTotalCompletedOrders
}
