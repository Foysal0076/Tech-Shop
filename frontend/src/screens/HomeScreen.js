import React, { useEffect } from 'react'
import { Col, Row } from 'react-bootstrap'
import Product from '../components/Product'
import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../actions/productActions'
import Loader from '../components/layout/Loader'
import Message from '../components/layout/Message'


const HomeScreen = () => {
    const dispatch = useDispatch()
    const { products, loading, error } = useSelector(state => state.productList)

    useEffect(() => {
        dispatch(listProducts())
    }, [dispatch])

    return (
        <>
            <h1>Latest products</h1>
            {loading ? <Loader /> : error ? (<Message variant='danger' >{error}</Message>) : <Row>
                {products.map(product => (
                    <Col className='my-3' key={product._id} sm={12} md={6} lg={4} xl={3}>
                        <Product product={product} />
                    </Col>
                ))}
            </Row>}

        </>
    )
}

export default HomeScreen