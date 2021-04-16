import React from 'react'
import { Button, Card, Col, Image, ListGroup, ListGroupItem, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Rating from '../components/Rating'
import products from '../products'

const ProductScreen = ({ match }) => {
    const product = products.find(product => product._id === match.params.id)
    return (
        <>
            <Link to='/' className='btn btn-light my-3' >
                Go Back
            </Link>
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
                            <ListGroupItem>
                                <Button className='btn-block'
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
        </>
    )
}

export default ProductScreen