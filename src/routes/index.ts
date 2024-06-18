import express from 'express'

import authRouter from '~/routes/auth.route'
import mediaRouter from '~/routes/media.route'
import orderRouter from '~/routes/order.route'
import paymentRouter from '~/routes/payment.route'
import productRouter from '~/routes/product.route'
import renderImageRouter from '~/routes/renderImage.route'
import userRouter from '~/routes/user.route'

const app = express()

app.use('/users', userRouter)
app.use('/products', productRouter)
app.use('/auth', authRouter)
app.use('/medias', mediaRouter)
app.use('/orders', orderRouter)
app.use('/renders', renderImageRouter)
app.use('/payments', paymentRouter)
app.use('/health', (_, res) => res.send('OK'))

export default app
