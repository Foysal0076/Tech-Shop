import React, { useEffect } from 'react'
import { Carousel, CarouselItem, Image } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { listTopRatedProducts } from '../actions/productActions'
import Loader from './layout/Loader'
import Message from './layout/Message'


const ProductCarousel = () => {

    const dispatch = useDispatch()

    const { loading, error, products } = useSelector(state => state.topRatedProducts)

    useEffect(() => {
        dispatch(listTopRatedProducts())
    }, [dispatch])

    return loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
        <Carousel pause='hover' className='bg-dark'>
            {products.map(product => (
                <CarouselItem key={product._id}>
                    <Link to={`/product/${product._id}`}>
                        <img src={product.image} alt={product.name} />
                        <Carousel.Caption className='carousel-caption d-none d-md-block'>
                            <h2>{product.name}(${product.price})</h2>
                        </Carousel.Caption>
                    </Link>
                </CarouselItem>
            ))}
        </Carousel>
    )
}

export default ProductCarousel