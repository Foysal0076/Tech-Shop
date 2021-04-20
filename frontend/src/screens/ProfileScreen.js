import React, { useEffect, useState } from 'react'
import { Row, Col, Form, FormGroup, FormLabel, Button, FormControl, Table } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getUserDetails, updateUserProfile } from '../actions/userActions'
import Message from '../components/layout/Message'
import Loader from '../components/layout/Loader'
import { listMyOrders } from '../actions/orderActions'

const ProfileScreen = ({ history }) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)
    const dispatch = useDispatch()

    const { loading, error, user } = useSelector(state => state.userDetails)


    const { userInfo } = useSelector(state => state.userLogin)
    const { success } = useSelector(state => state.userUpdateProfile)
    const { myOrders, loading: loadingOrders, error: errorOrders } = useSelector(state => state.myOrderList)

    useEffect(() => {
        if (!userInfo) {
            history.push('/login')
        } else {
            if (!user.name || !user) {
                dispatch(getUserDetails('profile'))
                dispatch(listMyOrders())
            } else {
                setName(user.name)
                setEmail(user.email)
            }
        }
        console.log('inside')
    }, [dispatch, history, userInfo, user])

    const submitHandler = (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            setMessage('Password Must Match')
        } else {
            dispatch(updateUserProfile({ id: user._id, name, email, password }))
        }
    }

    return (
        <Row>
            <Col md={3}>
                <h2>User Profile</h2>
                {message && <Message variant='danger'>{message}</Message>}
                {success && <Message variant='success'>{success}</Message>}
                {error && <Message variant='danger'>{error}</Message>}
                {loading && <Loader />}
                <Form onSubmit={submitHandler}>
                    <FormGroup controlId='name'>
                        <FormLabel>
                            Name
                    </FormLabel>
                        <FormControl type='name' placeholder='Enter name' value={name} onChange={(e) => setName(e.target.value)} ></FormControl>
                    </FormGroup>
                    <FormGroup controlId='email'>
                        <FormLabel>
                            Email Address
                    </FormLabel>
                        <FormControl type='email' placeholder='Enter email' value={email} onChange={(e) => setEmail(e.target.value)} ></FormControl>
                    </FormGroup>
                    <FormGroup controlId='password'>
                        <FormLabel>
                            Password
                    </FormLabel>
                        <FormControl type='password' placeholder='Enter password' value={password} onChange={(e) => setPassword(e.target.value)} ></FormControl>
                    </FormGroup>
                    <FormGroup controlId='confirmPassword'>
                        <FormLabel>
                            Confirm Password
                    </FormLabel>
                        <FormControl type='password' placeholder='Confirm Password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} ></FormControl>
                    </FormGroup>
                    <Button type='submit' variant='primary'>Update</Button>
                </Form>
            </Col>
            <Col md={9}>
                <h2>My Orders</h2>
                {loadingOrders ? <Loader /> : errorOrders ? <Message variant='danger'>{errorOrders}</Message> : (
                    <Table striped bordered hover responsive className='table-sm'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>DATE</th>
                                <th>TOTAL</th>
                                <th>PAID</th>
                                <th>DELIVERED</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {myOrders.map(order => (
                                <tr key={order._id}>
                                    <td>{order._id}</td>
                                    <td>{order.createdAt.substring(0, 10)}</td>
                                    <td>${order.totalPrice}</td>
                                    <td>{order.isPaid ? order.paidAt.substring(0, 10) : (
                                        <i className="fas fa-times" style={{ color: 'red' }} ></i>
                                    )}</td>
                                    <td>{order.isDelivered ? order.deliveredAt.substring(0, 10) : (
                                        <i className="fas fa-times" style={{ color: 'red' }} ></i>
                                    )}</td>

                                    <td>
                                        <LinkContainer to={`/order/${order._id}`}>
                                            <Button variant='light'>Detaills</Button>
                                        </LinkContainer>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                )}
            </Col>
        </Row>
    )
}

export default ProfileScreen