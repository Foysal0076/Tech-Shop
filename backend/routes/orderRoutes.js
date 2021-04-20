import express from 'express'
import { addOrderItems, getOrderById, updateOrderToPaid, getOrders, getUserOrders, getMyOrders } from '../controllers/orderController.js'
import { admin, protect } from '../middleware/authMiddleWare.js'

const router = express.Router()

router.route('/').post(protect, addOrderItems)
    .get(protect, admin, getOrders)

router.route('/myorders').get(protect, getUserOrders)
router.route('/:id').get(protect, getOrderById)
router.route('/:id/pay').put(protect, updateOrderToPaid)

export default router