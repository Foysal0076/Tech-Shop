import express from 'express'
const router = express.Router()
import { deleteProduct, getProductById, getProducts } from '../controllers/productControllers.js'
import { admin, protect } from '../middleware/authMiddleWare.js'

router.route('/').get(getProducts)
router.route('/:id')
    .get(getProductById)
    .delete(protect, admin, deleteProduct)

export default router