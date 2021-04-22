import React, { useEffect, useState } from 'react'
import FormContainer from '../components/layout/FormContainer'
import { Row, Col, Form, FormGroup, FormLabel, Button, FormControl } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { register } from '../actions/userActions'
import Message from '../components/layout/Message'
import Loader from '../components/layout/Loader'

const RegisterScreen = ({ location, history }) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)

    const { loading, error, userInfo } = useSelector(state => state.userRegister)
    const dispatch = useDispatch()
    const redirect = location.search ? location.search.split('=')[1] : '/'

    useEffect(() => {
        if (userInfo) {
            history.push(redirect)
        }
    }, [history, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            setMessage('Password Must Match')
        } else {
            dispatch(register(name, email, password))
        }
    }

    return (
        <FormContainer>
            <h1>Sign Up</h1>
            {message && <Message variant='danger'>{message}</Message>}
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
                <Button type='submit' variant='primary'>Register</Button>
            </Form>
            <Row className='py-3'>
                <Col>
                    Already have an account?  <Link style={{ fontSize: '1.2rem' }} to={redirect ? `/login?redirect=${redirect}` : '/login'} >
                        Login</Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default RegisterScreen