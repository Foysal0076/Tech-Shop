import express from 'express'
const router = express.Router()
import { createProduct, createProductReview, deleteProduct, getProductById, getProducts, getTopProducts, updateProduct } from '../controllers/productControllers.js'
import { admin, protect } from '../middleware/authMiddleWare.js'

router.route('/')
    .get(getProducts)
    .post(protect, admin, createProduct)

router.get('/top', getTopProducts)

router.route('/:id')
    .get(getProductById)
    .delete(protect, admin, deleteProduct)
    .put(protect, admin, updateProduct)

router.route('/:id/review').post(protect, createProductReview)

export default router