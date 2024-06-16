import { createHmac } from 'crypto'
import { Request } from 'express'
import moment from 'moment'
import { stringify } from 'qs'
import { v4 as uuidv4 } from 'uuid'

import { PaymentMethod } from '~/constants/type'
import { Payment } from '~/models/payment.model'

async function payment(req: Request) {
  process.env.TZ = 'Asia/Ho_Chi_Minh'

  const date = new Date()
  const createDate = moment(date).format('YYYYMMDDHHmmss')

  const ipAddr =
    (req.headers['x-forwarded-for'] as string) ||
    req.socket.remoteAddress ||
    (req.socket ? req.socket.remoteAddress : null)
  const cleanIpAddr = ipAddr ? ipAddr.split(':').pop() : null

  const tmnCode = process.env.VNP_TMN_CODE
  const secretKey = process.env.VNP_HASH_SECRET as string
  let vnpUrl = process.env.VNP_URL
  const returnUrl = process.env.VNP_RETURN_URL

  const codeVNPay = moment(date).format('DDHHmmss')
  const orderId = req.body.orderId
  const customerId = req.body.customerId
  const amount = req.body.amount
  const bankCode = req.body.bankCode

  const locale = req.body.language || 'vn'

  const currCode = 'VND'
  let vnp_Params: { [key: string]: string | number | null | undefined } = {
    vnp_Version: '2.1.0',
    vnp_Command: 'pay',
    vnp_TmnCode: tmnCode,
    vnp_Locale: locale,
    vnp_CurrCode: currCode,
    vnp_TxnRef: codeVNPay,
    vnp_OrderInfo: `${orderId}_${customerId}`,
    vnp_OrderType: 'other',
    vnp_Amount: amount * 100,
    vnp_ReturnUrl: returnUrl,
    vnp_IpAddr: cleanIpAddr,
    vnp_CreateDate: createDate
  }
  if (bankCode !== null && bankCode !== '') {
    vnp_Params['vnp_BankCode'] = bankCode
  }

  vnp_Params = await sortObject(vnp_Params)

  // eslint-disable-next-line no-var
  var signData = stringify(vnp_Params, { encode: false })
  // eslint-disable-next-line no-var
  var hmac = createHmac('sha512', secretKey)
  // eslint-disable-next-line no-var
  var signed = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex')
  vnp_Params['vnp_SecureHash'] = signed
  vnpUrl += '?' + stringify(vnp_Params, { encode: false })
  console.log(vnpUrl)
  return vnpUrl
}

async function vnpayReturn(req: Request) {
  let vnp_Params: { [key: string]: string | number | null } = req.query as {
    [key: string]: string | number | null
  }

  const secureHash = vnp_Params['vnp_SecureHash']

  delete vnp_Params['vnp_SecureHash']
  delete vnp_Params['vnp_SecureHashType']

  vnp_Params = await sortObject(vnp_Params)

  const tmnCode = process.env.VNP_TMN_CODE ?? ''
  const secretKey = process.env.VNP_HASH_SECRET ?? ''

  const signData = stringify(vnp_Params, { encode: false })
  const hmac = createHmac('sha512', secretKey)
  const signed = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex')

  if (secureHash === signed) {
    const tmp = vnp_Params['vnp_OrderInfo'] as string
    const [orderId, customerId] = tmp.split('_')

    let paymentStatus

    if (vnp_Params['vnp_BankCode'] == 'NCB') {
      paymentStatus = 'Card'
    } else {
      paymentStatus = 'Cash'
    }
    console.log(vnp_Params['vnp_BankCode'])

    await Payment.create({
      id: uuidv4(),
      orderId,
      customerId,
      amount: vnp_Params['vnp_Amount'] as number,
      paymentMethod: paymentStatus as PaymentMethod,
      paymentStatus: 'Completed',
      paymentTime: new Date(),
      deleted: false
    })

    return 'http://localhost:3306/api'
  } else {
    return 'https://www.facebook.com/'
  }
}

async function sortObject(obj: any) {
  const sorted: { [key: string]: string } = {}
  const str = []
  let key: string | number
  for (key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      str.push(encodeURIComponent(key))
    }
  }
  str.sort()
  for (key = 0; key < str.length; key++) {
    sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, '+')
  }
  return sorted
}

export default {
  payment,
  vnpayReturn
}

// Thông tin thẻ test
// #	Thông tin thẻ	Ghi chú
// 1
// Ngân hàng: NCB
// Số thẻ: 9704198526191432198
// Tên chủ thẻ:NGUYEN VAN A
// Ngày phát hành:07/15
// Mật khẩu OTP:123456
