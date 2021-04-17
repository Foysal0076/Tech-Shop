import express from 'express'
const router = express.Router()
import Product from '../models/productModel.js'
import asyncHandler from 'express-async-handler'

//@route    GET /api/products
//@desc     Fetch all products
//@access   public
router.get('/', asyncHandler(async (req, res) => {
    const products = await Product.find({})
    // res.status(401)
    // throw new Error('Not Authorized')
    res.json(products)
}))

//@route    GET /api/products/:id
//@desc     Fetch single products
//@access   public
router.get('/:id', asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
    if (product) {
        res.json(product)
    } else {
        res.status(404)
        throw new Error('Product Not Found')
    }
}))

// router.get('/:id', (req, res) => {
//     Product.findById(req.params.id)
//         .then(product => {
//             res.json(product)
//         })
//         .catch(err => res.status(404).json({ message: 'Product no found' }))

// })

export default router