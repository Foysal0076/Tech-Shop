import Product from '../models/productModel.js'
import asyncHandler from 'express-async-handler'

//@route    GET /api/products
//@desc     Fetch all products
//@access   public
const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({})
    // res.status(401)
    // throw new Error('Not Authorized')
    res.json(products)
})

//@route    GET /api/products/:id
//@desc     Fetch single products
//@access   public
const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
    if (product) {
        res.json(product)
    } else {
        res.status(404)
        throw new Error('Product Not Found')
    }
})

//@route    DELETE /api/products/:id
//@desc     Delete a product
//@access   Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
    if (product) {
        await product.remove()
        res.json({ message: 'Product is removed from database' })
    } else {
        res.status(404)
        throw new Error('Product Not Found')
    }
})


export { getProductById, getProducts, deleteProduct }