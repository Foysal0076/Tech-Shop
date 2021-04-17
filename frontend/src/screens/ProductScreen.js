import React, { useState, useEffect } from 'react'
import { Button, Card, Col, FormControl, Image, ListGroup, ListGroupItem, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Rating from '../components/Rating'

import { useDispatch, useSelector } from 'react-redux'
import { listProductDetails } from '../actions/productActions'
import Loader from '../components/layout/Loader'
import Message from '../components/layout/Message'


const ProductScreen = ({ match, history }) => {
    const [qty, setQty] = useState(0)

    const dispatch = useDispatch()
    const { product, loading, error } = useSelector(state => state.productDetails)

    useEffect(() => {
        dispatch(listProductDetails(match.params.id))
    }, [dispatch, match.params.id])

    const addToCartHandler = () => {
        history.push(`/cart/${match.params.id}?qty=${qty === 0 ? 1 : qty}`)
    }

    return (
        <>
            <Link to='/' className='btn btn-light my-3' >
                Go Back
            </Link>
            {loading ? <Loader /> : error ? <Message variant='danger' >{error}</Message> : (
                <Row>
                    <Col md={6} >
                        <div>
                            <Image fluid src={product.image} alt={product.name} />
                        </div>

                    </Col>
                    <Col md={3} >
                        <ListGroup variant='flush'>
                            <ListGroupItem>
                                <h3>{product.name}</h3>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Rating value={product.rating} text={` ${product.numReviews} reviews`} />
                            </ListGroupItem>
                            <ListGroupItem>
                                ${product.price}
                            </ListGroupItem>
                            <ListGroupItem>
                                ${product.description}
                            </ListGroupItem>
                        </ListGroup>
                    </Col>
                    <Col md={3}>
                        <Card>
                            <ListGroup variant='flush'>
                                <ListGroupItem>
                                    <Row>
                                        <Col>Price: </Col>
                                        <Col>
                                            <strong>${product.price}</strong>
                                        </Col>
                                    </Row>
                                </ListGroupItem>
                                <ListGroupItem>
                                    <Row>
                                        <Col>Status: </Col>
                                        <Col>
                                            {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                                        </Col>
                                    </Row>
                                </ListGroupItem>
                                {product.countInStock > 0 && (
                                    <ListGroupItem>
                                        <Row>
                                            <Col>Quantity</Col>
                                            <Col  >
                                                <FormControl as='select' value={qty} onChange={(e) => setQty(e.target.value)}>
                                                    {[...Array(product.countInStock).keys()].map(x => (
                                                        <option key={x + 1} value={x + 1} >{x + 1}</option>
                                                    ))}
                                                </FormControl>
                                            </Col>
                                        </Row>
                                    </ListGroupItem>
                                )}
                                <ListGroupItem>
                                    <Button
                                        onClick={addToCartHandler}
                                        className='btn-block'
                                        type='button'
                                        disabled={product.countInStock === 0}
                                    >
                                        Add To Cart
                                </Button>
                                </ListGroupItem>
                            </ListGroup>
                        </Card>
                    </Col>
                </Row>
            )}

        </>
    )
}

export default ProductScreen