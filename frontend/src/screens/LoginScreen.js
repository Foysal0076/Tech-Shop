import React, { useEffect, useState } from 'react'
import FormContainer from '../components/layout/FormContainer'
import { Row, Col, Form, FormGroup, FormLabel, Button, FormControl } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../actions/userActions'
import Message from '../components/layout/Message'
import Loader from '../components/layout/Loader'

const LoginScreen = ({ location, history }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const { loading, error, userInfo } = useSelector(state => state.userLogin)
    const dispatch = useDispatch()
    const redirect = location.search ? location.search.split('=')[1] : '/'

    useEffect(() => {
        if (userInfo) {
            history.push(redirect)
        }
    }, [history, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(login(email, password))
    }

    return (
        <FormContainer>
            <h1>Sign In</h1>
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>
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
                <Button type='submit' variant='primary'>Sign In</Button>
            </Form>
            <Row className='py-3'>
                <Col>
                    New Customer? <Link style={{fontSize:'1.2rem'}} to={redirect ? `register?redirect=${redirect}` : '/register'} >
                        Sign Up
                    </Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default LoginScreen