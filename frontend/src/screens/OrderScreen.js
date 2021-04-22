import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Image, ListGroup, ListGroupItem, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { deliverOrder, getOrderDetails, payOrder } from '../actions/orderActions'
import Loader from '../components/layout/Loader'
import Message from '../components/layout/Message'
import { PayPalButton } from "react-paypal-button-v2"
import { ORDER_DELIVER_RESET, ORDER_PAY_RESET } from '../actions/types'

import moment from 'moment'

const OrderScreen = ({ match, history }) => {
    const dispatch = useDispatch()

    const orderId = match.params.id
    const [sdkReady, setSdkReady] = useState(false)

    const { userInfo } = useSelector(state => state.userLogin)
    const { order, loading, error } = useSelector(state => state.orderDetails)
    const { loading: loadingPay, success: successPay } = useSelector(state => state.orderPay) //rename loading to loadingPay
    const { loading: loadingDeliver, success: successDeliver } = useSelector(state => state.orderDeliver) //rename loading to loadingPay


    if (!loading && order) {
        //   Calculate prices
        const addDecimals = (num) => {
            return (Math.round(num * 100) / 100).toFixed(2)
        }

        order.itemsPrice = addDecimals(
            order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
        )
    }

    useEffect(() => {
        if (!userInfo) {
            history.push('/login')
        }

        //PayPal script
        const addPayPalScript = async () => {
            const { data: clientId } = await axios.get('/api/config/paypal')
            const script = document.createElement('script')
            script.type = 'text/javascript'
            script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
            script.async = true
            script.onload = () => {
                setSdkReady(true)
            }
            document.body.appendChild(script)
        }
        if (!order || successPay || successDeliver || orderId !== order._id) {
            dispatch({
                type: ORDER_PAY_RESET
            })
            dispatch({
                type: ORDER_DELIVER_RESET
            })
            dispatch(getOrderDetails(orderId))
        } else if (!order.isPaid) {
            if (!window.paypal) {
                addPayPalScript()
            } else {
                setSdkReady(true)
            }
        }
    }, [dispatch, orderId, order, successPay, successDeliver])

    const successPaymentHandler = (paymentResult) => {
        console.log(paymentResult)
        dispatch(payOrder(orderId, paymentResult))
    }

    const deliverHandler = () => {
        dispatch(deliverOrder(order))
    }

    return loading ? <Loader /> : error ? <Message variant='danger' >{error}</Message>
        : <>
            <h1>ORDER ID:{` ${order._id}`}</h1>
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroupItem>
                            <h2>Shipping Information</h2>
                            <p> <strong>Name:</strong> {order.user.name} </p>
                            <p> <a href={`mailto:${order.user.email}`}>{order.user.email}</a> </p>

                            <p>
                                <strong>Address:{' '}</strong>
                                {order.shippingAddress.address},
                            {order.shippingAddress.city},
                            {order.shippingAddress.postalCode},
                            {order.shippingAddress.country},
                        </p>
                            {order.isDelivered ? <Message variant='success'>Delivered on{' '}{moment(order.deliveredAt).format('MMMM Do YYYY, h:mm:ss a')}</Message> :
                                <Message variant='danger'>Not Delivered</Message>}
                        </ListGroupItem>
                        <ListGroupItem>
                            <h2>Payment Method</h2>
                            <p>
                                <strong>Method:{' '}</strong>
                                {order.paymentMethod}
                            </p>
                            {order.isPaid ? <Message variant='success'>Paid on{' '}{moment(order.paidAt).format('MMMM Do YYYY, h:mm:ss a')}</Message> :
                                <Message variant='danger'>Not Paid</Message>}
                        </ListGroupItem>
                        <ListGroupItem>
                            <h2>Order Items: {' '}</h2>
                            {order.orderItems.length === 0 ? <Message>Your cart is empty</Message> : (
                                <ListGroup variant='flush'>
                                    {order.orderItems.map((item, index) => (
                                        <ListGroupItem key={index}>
                                            <Row>
                                                <Col md={2}>
                                                    <Image src={item.image} alt={item.name} fluid rounded />
                                                </Col>
                                                <Col>
                                                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                                                </Col>
                                                <Col md={4}>
                                                    {item.qty} x ${item.price} = ${item.qty * item.price}
                                                </Col>
                                            </Row>
                                        </ListGroupItem>
                                    ))}
                                </ListGroup>
                            )}
                        </ListGroupItem>
                    </ListGroup>
                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup>
                            <ListGroupItem>
                                <h2>Order Summary</h2>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Row>
                                    <Col>Items</Col>
                                    <Col>${order.itemsPrice}</Col>
                                </Row>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Row>
                                    <Col>Shipping Price</Col>
                                    <Col>${order.shippingPrice}</Col>
                                </Row>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Row>
                                    <Col>Tax</Col>
                                    <Col>${order.taxPrice}</Col>
                                </Row>
                            </ListGroupItem>
                            <ListGroupItem>
                                <Row>
                                    <Col>Total</Col>
                                    <Col>${order.totalPrice}</Col>
                                </Row>
                            </ListGroupItem>
                            {!order.isPaid && !userInfo.isAdmin && (
                                <ListGroupItem>
                                    {loadingPay && <Loader />}
                                    {!sdkReady ? <Loader /> : (
                                        <PayPalButton
                                            amount={order.itemsPrice}
                                            onSuccess={successPaymentHandler}
                                        />
                                    )}
                                </ListGroupItem>
                            )}
                            {loadingDeliver && <Loader />}
                            {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                                <ListGroupItem>
                                    <Button
                                        type='button'
                                        className='btn btn-block'
                                        onClick={deliverHandler}>
                                        Mark as Delivered
                                </Button>
                                </ListGroupItem>
                            )}
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
}

export default OrderScreen