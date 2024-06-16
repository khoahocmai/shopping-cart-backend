import { Request, Response } from 'express'

import responseStatus from '~/constants/responseStatus'
import PaymentService from '~/services/payment.service'

async function payment(req: Request, res: Response) {
  try {
    const vnpUrl = await PaymentService.payment(req)
    res.status(200).redirect(vnpUrl || '')
  } catch (error: string | any) {
    console.log(error)
    res.json(responseStatus.InternalErrorResponse(error.message))
  }
} // Controller payment

async function vnpayReturn(req: Request, res: Response) {
  try {
    const redirectUrl = await PaymentService.vnpayReturn(req)
    res.status(200).redirect(redirectUrl)
  } catch (error: string | any) {
    console.log(error)
    res.json(responseStatus.InternalErrorResponse(error.message))
  }
} // Controller return

export default {
  payment,
  vnpayReturn
}
