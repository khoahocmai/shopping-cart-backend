import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_EMAIL,
    pass: process.env.GMAIL_PASSWORD
  }
})

export function sendEmail(toEmail: any, subject: any, content: any, callback: () => void) {
  const mail = {
    from: process.env.GMAIL_EMAIL,
    to: toEmail,
    subject: subject,
    html: content
  }
  transporter.sendMail(mail, (err) => {
    if (err) console.log(err)
    else callback()
  })
}
