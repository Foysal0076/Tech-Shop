import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Rating from './Rating'


const Product = ({ product }) => {
    return (
        <Card className=' p-2 rounded h-100'>
            <Link to={`/product/${product._id}`}>
                <Card.Img src={product.image} variant='top' />
            </Link>

            <Card.Body className=' p-2' >
                <Link to={`/product/${product._id}`}>
                    <Card.Title as='div' >
                        <strong>{product.name}</strong>
                    </Card.Title>
                </Link>

                <Card.Text as='div'>
                    <div className="my-3">
                        <Rating value={product.rating} text={product.numReviews > 1 ? `${product.numReviews} Reviews` : `${product.numReviews} Review`} />
                    </div>
                </Card.Text>

                <Card.Text as='h3'>
                    ${product.price}
                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default Product