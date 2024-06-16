import { Request, Response } from 'express'

import responseStatus from '~/constants/responseStatus'
import { CreateOrderDetail, UpdateOrderDetail } from '~/constants/type'
import OrderDetailService from '~/services/orderDetail.service'

async function getOrderDetails(req: Request, res: Response) {
  try {
    const orderDetails = await OrderDetailService.getAllOrderDetails()
    res.json(responseStatus.DataResponse('', orderDetails))
  } catch (error: string | any) {
    console.log(error)
    res.json(responseStatus.InternalErrorResponse(error.message))
  }
} // Controller Get all order details

async function getOrderDetail(req: Request, res: Response) {
  try {
    const orderDetailId = req.params.id
    const orderDetail = await OrderDetailService.getOrderDetailById(orderDetailId)
    if (!orderDetail) {
      res.json(responseStatus.NotFoundResponse('Not found any Order Detail'))
    }
    res.json(responseStatus.DataResponse('', orderDetail))
  } catch (error: string | any) {
    console.log(error)
    res.json(responseStatus.InternalErrorResponse(error.message))
  }
} // Controller Get order detail by Id

async function getOrderDetailsByOrderId(req: Request, res: Response) {
  try {
    const orderId = req.params.orderId
    const orderDetail = await OrderDetailService.getOrderDetailsByOrderId(orderId)
    if (!orderDetail) {
      res.json(responseStatus.NotFoundResponse('Not found any Order Detail'))
    }
    res.json(responseStatus.DataResponse('', orderDetail))
  } catch (error: string | any) {
    console.log(error)
    res.json(responseStatus.InternalErrorResponse(error.message))
  }
} // Controller Get order detail by Order Id

async function createOrderDetail(req: Request, res: Response) {
  try {
    const orderId = req.params.orderId
    const orderDetailData: CreateOrderDetail = req.body
    const orderDetail = await OrderDetailService.createOrderDetail(orderId, orderDetailData)
    if (!orderDetail) {
      res.json(responseStatus.MessageResponse('Error in create Order Detail'))
    }
    res.json(responseStatus.CreateSuccessResponse('', orderDetail))
  } catch (error: string | any) {
    console.log(error)
    // Handle specific errors like not found order or product
    if (error.message === 'Not found order' || error.message === 'Not found product') {
      res.json(responseStatus.MessageResponse(error.message))
    } else {
      res.json(responseStatus.InternalErrorResponse(error.message))
    }
  }
} // Controller Create order detail

async function updateOrderDetail(req: Request, res: Response) {
  try {
    const updateData: UpdateOrderDetail = req.body
    const orderDetail = await OrderDetailService.updateOrderDetail(updateData)
    if (!orderDetail) {
      res.json(responseStatus.MessageResponse('Error in update Order Detail'))
    }
    res.json(responseStatus.MessageResponse('Update Order Detail success'))
  } catch (error: string | any) {
    console.log(error)
    res.json(responseStatus.InternalErrorResponse(error.message))
  }
} // Controller Update order detail

async function deleteOrderDetail(req: Request, res: Response) {
  try {
    const orderDetailId = req.params.id
    const orderDetail = await OrderDetailService.deleteOrderDetail(orderDetailId)
    if (!orderDetail) {
      res.json(responseStatus.MessageResponse('Error in delete Order Detail'))
    }
    res.json(responseStatus.MessageResponse('Delete Order Detail success'))
  } catch (error: string | any) {
    console.log(error)
    res.json(responseStatus.InternalErrorResponse(error.message))
  }
} // Controller Delete order detail

export default {
  getOrderDetails,
  getOrderDetail,
  getOrderDetailsByOrderId,
  createOrderDetail,
  updateOrderDetail,
  deleteOrderDetail
}
