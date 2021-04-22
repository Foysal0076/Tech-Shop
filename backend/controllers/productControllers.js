import Product from '../models/productModel.js'
import asyncHandler from 'express-async-handler'

//@route    GET /api/products
//@desc     Fetch all products
//@access   public
const getProducts = asyncHandler(async (req, res) => {
    const pageSize = 8
    const page = Number(req.query.pageNumber) || 1

    const keyword = req.query.keyword ? {
        name: {
            $regex: req.query.keyword,
            $options: 'i'
        }
    } : {}

    const count = await Product.countDocuments({ ...keyword })
    const products = await Product.find({ ...keyword }).limit(pageSize).skip(pageSize * (page - 1)).sort({ createdAt: -1 })
    // res.status(401)
    // throw new Error('Not Authorized')
    res.json({ products, page, pages: Math.ceil(count / pageSize) })
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


//@route    POST /api/products/:id/reviews
//@desc     Add review to a product
//@access   Private
const createProductReview = asyncHandler(async (req, res) => {

    const { rating, comment } = req.body

    const product = await Product.findById(req.params.id)


    if (product) {
        const alreadyReviewed = product.reviews.find(review => review.user.toString() === req.user._id.toString())
        if (alreadyReviewed) {
            res.status(400)
            throw new Error('You have already given review to this product')
        }

        const review = {
            name: req.user.name,
            rating: Number(rating),
            comment,
            user: req.user._id
        }

        product.reviews.push(review)
        product.numReviews = product.reviews.length
        product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length

        await product.save()
        res.status(201)
        res.json({ message: 'Reviews Added' })

    } else {
        res.status(404)
        throw new Error('Product not found')
    }

})

//@route    PUT /api/products/:id
//@desc     Update a product
//@access   Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
    const { name, price, description, image, brand, category, countInStock } = req.body

    const product = await Product.findById(req.params.id)

    const imageUrl = image.charAt(0) === '\/' ? image : '/' + image.replace(/\\/g, '/')

    if (product) {
        product.name = name || product.name
        product.price = price || product.price
        product.description = description || product.description
        product.image = imageUrl || product.image
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

//@route    GET /api/products/top
//@desc     Get top rated products
//@access   Public
const getTopProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({}).sort({ rating: -1 }).limit(3)
    res.json(products)
})

export { getProductById, getProducts, deleteProduct, createProduct, updateProduct, createProductReview, getTopProducts }