import express from 'express'
const router = express.Router()
import { createProduct, deleteProduct, getProductById, getProducts, updateProduct } from '../controllers/productControllers.js'
import { admin, protect } from '../middleware/authMiddleWare.js'

router.route('/')
    .get(getProducts)
    .post(protect, admin, createProduct)

router.route('/:id')
    .get(getProductById)
    .delete(protect, admin, deleteProduct)
    .put(protect, admin, updateProduct)

export default router