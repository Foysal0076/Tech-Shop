import React, { useState, useEffect } from 'react'
import { Button, Card, Col, Form, FormControl, FormGroup, FormLabel, Image, ListGroup, ListGroupItem, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Rating from '../components/Rating'

import { useDispatch, useSelector } from 'react-redux'
import { createProductReview, listProductDetails } from '../actions/productActions'
import Loader from '../components/layout/Loader'
import Message from '../components/layout/Message'

import moment from 'moment'
import { PRODUCT_CREATE_REVIEW_RESET } from '../actions/types'
import Meta from '../components/Meta'

const ProductScreen = ({ match, history }) => {
    const [qty, setQty] = useState(0)
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')

    const dispatch = useDispatch()
    const { product, loading, error } = useSelector(state => state.productDetails)
    const { userInfo } = useSelector(state => state.userLogin)
    const { loading: loadingCreateReview, error: errorCreateReview, success: successCreateReview } = useSelector(state => state.productReviewCreate)

    useEffect(() => {
        if (successCreateReview) {
            setRating(0)
            setComment('')
            dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
        }
        dispatch(listProductDetails(match.params.id))
    }, [dispatch, match.params.id, successCreateReview])

    const addToCartHandler = () => {
        history.push(`/cart/${match.params.id}?qty=${qty === 0 ? 1 : qty}`)
    }

    const onSubmitHandler = (e) => {
        e.preventDefault()
        dispatch(createProductReview(match.params.id, { rating, comment }))
    }

    return (
        <>
            <Link to='/' className='btn btn-light my-3' >
                Go Back
            </Link>
            {loading ? <Loader /> : error ? <Message variant='danger' >{error}</Message> : (
                <>
                    <Meta title={product.name} />
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
                                    {product.description}
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
                    <Row>
                        <Col md={6}>
                            <h2>Reviews</h2>
                            {product.reviews.length === 0 && <Message>No Reviews</Message>}
                            <ListGroup variant='flush'>
                                {product.reviews.map(review => (
                                    <ListGroupItem key={review._id} >
                                        <strong>{review.name}</strong>
                                        <Rating value={review.rating} />
                                        <p>{moment(review.createdAt).format('MMMM DD YYYY')}</p>
                                        <p>{review.comment}</p>
                                    </ListGroupItem>
                                ))}
                                <ListGroupItem>
                                    <h2>Write a customer review</h2>
                                    {errorCreateReview && <Message variant='danger'>{errorCreateReview}</Message>}
                                    {userInfo ? (
                                        <h1>
                                            <Form onSubmit={onSubmitHandler}>
                                                <FormGroup controllId='rating'>
                                                    <FormLabel>Rating</FormLabel>
                                                    <FormControl as='select' value={rating} onChange={(e) => setRating(e.target.value)}>
                                                        <option value='' >Select...</option>
                                                        <option value='1' >1 - Poor</option>
                                                        <option value='2' >2 - Fair</option>
                                                        <option value='3' >3 - Good</option>
                                                        <option value='4' >4 - Very Good</option>
                                                        <option value='5' >5 - Excellent</option>
                                                    </FormControl>
                                                </FormGroup>
                                                <FormGroup controllId='comment'>
                                                    <FormLabel>Comment</FormLabel>
                                                    <FormControl as='textarea' row='3' value={comment} required onChange={(e) => setComment(e.target.value)} placeholder='Write Review'>
                                                    </FormControl>
                                                </FormGroup>
                                                <Button type='submit' variant='primary'>Submit Comment</Button>
                                            </Form>
                                        </h1>)
                                        : <Message variant='info'>Please  <Link style={{ color: 'black' }} to='/login'>Sign In</Link>to write a review </Message>}
                                </ListGroupItem>
                            </ListGroup>
                        </Col>
                    </Row>
                </>
            )}

        </>
    )
}

export default ProductScreen