"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const transporter = nodemailer_1.default.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_EMAIL,
        pass: process.env.GMAIL_PASSWORD
    }
});
function sendEmail(toEmail, subject, content, callback) {
    const mail = {
        from: process.env.GMAIL_EMAIL,
        to: toEmail,
        subject: subject,
        html: content
    };
    transporter.sendMail(mail, (err) => {
        if (err)
            console.log(err);
        else
            callback();
    });
}
exports.sendEmail = sendEmail;
