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

//@route    CREATE /api/products/
//@desc     Create a product
//@access   Private/Admin
const createProduct = asyncHandler(async (req, res) => {
    const product = new Product({
        name: 'Sample name',
        price: 0,
        user: req.user._id,
        image: '/images/sample.jpg',
        brand: 'Sample Brand',
        category: 'Sample Category',
        countInStock: 0,
        numReview: 0,
        description: 'Sample Description',
    })

    const createdProduct = await product.save()
    res.status(201).json(createdProduct)
})


//@route    PUT /api/products/:id
//@desc     Update a product
//@access   Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
    const { name, price, description, image, brand, category, countInStock } = req.body

    const product = await Product.findById(req.params.id)

    if (product) {
        product.name = name || product.name
        product.price = price || product.price
        product.description = description || product.description
        product.image = image || product.image
        product.brand = brand || product.brand
        product.category = category || product.category
        product.countInStock = countInStock || product.countInStock

        const updatedProduct = await product.save()

        res.json(updatedProduct)

    } else {
        res.status(404)
        throw new Error('Product not found')
    }

})


export { getProductById, getProducts, deleteProduct, createProduct, updateProduct }