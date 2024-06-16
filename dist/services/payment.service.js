"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = require("crypto");
const moment_1 = __importDefault(require("moment"));
const qs_1 = require("qs");
const uuid_1 = require("uuid");
const payment_model_1 = require("../models/payment.model");
async function payment(req) {
    process.env.TZ = 'Asia/Ho_Chi_Minh';
    const date = new Date();
    const createDate = (0, moment_1.default)(date).format('YYYYMMDDHHmmss');
    const ipAddr = req.headers['x-forwarded-for'] ||
        req.socket.remoteAddress ||
        (req.socket ? req.socket.remoteAddress : null);
    const cleanIpAddr = ipAddr ? ipAddr.split(':').pop() : null;
    const tmnCode = process.env.VNP_TMN_CODE;
    const secretKey = process.env.VNP_HASH_SECRET;
    let vnpUrl = process.env.VNP_URL;
    const returnUrl = process.env.VNP_RETURN_URL;
    const codeVNPay = (0, moment_1.default)(date).format('DDHHmmss');
    const orderId = req.body.orderId;
    const cashierId = req.body.cashierId;
    const amount = req.body.amount;
    const bankCode = req.body.bankCode;
    const locale = req.body.language || 'vn';
    const currCode = 'VND';
    let vnp_Params = {
        vnp_Version: '2.1.0',
        vnp_Command: 'pay',
        vnp_TmnCode: tmnCode,
        vnp_Locale: locale,
        vnp_CurrCode: currCode,
        vnp_TxnRef: codeVNPay,
        vnp_OrderInfo: `${orderId}_${cashierId}`,
        vnp_OrderType: 'other',
        vnp_Amount: amount * 100,
        vnp_ReturnUrl: returnUrl,
        vnp_IpAddr: cleanIpAddr,
        vnp_CreateDate: createDate
    };
    if (bankCode !== null && bankCode !== '') {
        vnp_Params['vnp_BankCode'] = bankCode;
    }
    vnp_Params = await sortObject(vnp_Params);
    // eslint-disable-next-line no-var
    var signData = (0, qs_1.stringify)(vnp_Params, { encode: false });
    // eslint-disable-next-line no-var
    var hmac = (0, crypto_1.createHmac)('sha512', secretKey);
    // eslint-disable-next-line no-var
    var signed = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex');
    vnp_Params['vnp_SecureHash'] = signed;
    vnpUrl += '?' + (0, qs_1.stringify)(vnp_Params, { encode: false });
    console.log(vnpUrl);
    return vnpUrl;
}
async function vnpayReturn(req) {
    let vnp_Params = req.query;
    const secureHash = vnp_Params['vnp_SecureHash'];
    delete vnp_Params['vnp_SecureHash'];
    delete vnp_Params['vnp_SecureHashType'];
    vnp_Params = await sortObject(vnp_Params);
    const tmnCode = process.env.VNP_TMN_CODE ?? '';
    const secretKey = process.env.VNP_HASH_SECRET ?? '';
    const signData = (0, qs_1.stringify)(vnp_Params, { encode: false });
    const hmac = (0, crypto_1.createHmac)('sha512', secretKey);
    const signed = hmac.update(Buffer.from(signData, 'utf-8')).digest('hex');
    if (secureHash === signed) {
        const tmp = vnp_Params['vnp_OrderInfo'];
        const [orderId, cashierId] = tmp.split('_');
        let paymentStatus;
        if (vnp_Params['vnp_BankCode'] == 'NCB') {
            paymentStatus = 'Card';
        }
        else {
            paymentStatus = 'Cash';
        }
        console.log(vnp_Params['vnp_BankCode']);
        await payment_model_1.Payment.create({
            id: (0, uuid_1.v4)(),
            orderId,
            cashierId,
            amount: vnp_Params['vnp_Amount'],
            paymentMethod: paymentStatus,
            paymentStatus: 'Completed',
            paymentTime: new Date(),
            deleted: false
        });
        return 'http://localhost:3306/api';
    }
    else {
        return 'https://www.facebook.com/';
    }
}
async function sortObject(obj) {
    const sorted = {};
    const str = [];
    let key;
    for (key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            str.push(encodeURIComponent(key));
        }
    }
    str.sort();
    for (key = 0; key < str.length; key++) {
        sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, '+');
    }
    return sorted;
}
exports.default = {
    payment,
    vnpayReturn
};
// Thông tin thẻ test
// #	Thông tin thẻ	Ghi chú
// 1
// Ngân hàng: NCB
// Số thẻ: 9704198526191432198
// Tên chủ thẻ:NGUYEN VAN A
// Ngày phát hành:07/15
// Mật khẩu OTP:123456
