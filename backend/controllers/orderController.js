import Order from '../models/orderModel.js'
import asyncHandler from 'express-async-handler'

//@route    POST /api/orders
//@desc     Create new Order
//@access   private
const addOrderItems = asyncHandler(async (req, res) => {
    const { orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice } = req.body
    if (orderItems && orderItems.length === 0) {
        res.status(400)
        throw new Error('No order items')
    } else {
        const order = new Order({
            user: req.user._id,
            orderItems,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice
        })
        const createdOrder = await order.save()
        res.status(201).json(createdOrder)
    }
})

//@route    POST /api/orders/:id
//@desc     Get order information
//@access   private
const getOrderById = asyncHandler(async (req, res) => {

    const order = await Order.findById(req.params.id).populate(
        'user',
        'name email'
    )
    if (order) {
        res.json(order)
    } else {
        res.status(404)
        throw new Error('Order not found')
    }

})

//@route    POST /api/orders/:id/pay
//@desc     Update order to paid
//@access   private
const updateOrderToPaid = asyncHandler(async (req, res) => {

    const order = await Order.findById(req.params.id)

    if (order) {
        order.isPaid = true
        order.paidAt = Date.now()
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.email_address,
        }

        const updatedOrder = await order.save()

        res.json(updatedOrder)
    } else {
        res.status(404)
        throw new Error('Order not found')
    }

})

//@route    GET /api/orders/myorders
//@desc     Get logged in user orders
//@access   private
const getUserOrders = asyncHandler(async (req, res) => {


    const orders = await Order.find({ user: req.user._id }) // find orders with id of req.user._id
    if (orders) {
        res.json(orders)
    } else {
        res.status(404)
        throw new Error('No order found')
    }
})

//test route
const getMyOrders = asyncHandler(async (req, res) => {

    res.send('test route')

})

//@route    GET /api/orders
//@desc     Get all orders
//@access   private
const getOrders = asyncHandler(async (req, res) => {

    const orders = await Order.find({}).populate('user', 'id name') // find orders with id of req.user._id
    if (orders) {
        res.json(orders)
    } else {
        res.status(404)
        throw new Error('No order found')
    }

})

export { addOrderItems, getOrderById, updateOrderToPaid, getUserOrders, getOrders, getMyOrders }
