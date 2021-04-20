import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import ConnectDB from './config/db.js'
import productRoutes from './routes/productRoutes.js'
import { errorHandler, notFound } from './middleware/errorMiddleWare.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'

const app = express()
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

dotenv.config()
ConnectDB()

const PORT = process.env.PORT || 5000


//Routes
app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)


//PayPal route
app.get('/api/config/paypal',(req, res)=> res.send(process.env.PAYPAL_CLIENT_ID))


//Middleware
app.use(notFound)
app.use(errorHandler)



app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold))