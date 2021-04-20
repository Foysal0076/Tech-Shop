import React, { useState } from 'react'
import { Button, Form, FormControl, FormGroup, FormLabel } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { saveShippingAddress } from '../actions/cartActions'
import CheckoutSteps from '../components/CheckoutSteps'
import FormContainer from '../components/layout/FormContainer'


const ShippingScreen = ({ history }) => {
    const { shippingAddress } = useSelector(state => state.cart)

    const [address, setAddress] = useState(shippingAddress.address)
    const [city, setCity] = useState(shippingAddress.city)
    const [postalCode, setpostalCode] = useState(shippingAddress.postalCode)
    const [country, setCountry] = useState(shippingAddress.country)

    const dispatch = useDispatch()

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(saveShippingAddress({ address, city, postalCode, country }))
        history.push('/payment')
    }

    return (
        <FormContainer>
            <CheckoutSteps step1 step2 />
            <h1>Shipping</h1>
            <Form onSubmit={submitHandler}>
                <FormGroup controlId='address'>
                    <FormLabel>Address</FormLabel>
                    <FormControl
                        type='text'
                        placeholder='Enter address'
                        value={address}
                        required
                        onChange={(e) => setAddress(e.target.value)}
                    ></FormControl>
                </FormGroup>
                <FormGroup controlId='city'>
                    <FormLabel>City</FormLabel>
                    <FormControl
                        type='text'
                        placeholder='Enter city'
                        value={city}
                        required
                        onChange={(e) => setCity(e.target.value)}
                    ></FormControl>
                </FormGroup>
                <FormGroup controlId='postalCode'>
                    <FormLabel>PostalCode</FormLabel>
                    <FormControl
                        type='text'
                        placeholder='Enter postalCode'
                        value={postalCode}
                        onChange={(e) => setpostalCode(e.target.value)}
                    ></FormControl>
                </FormGroup>
                <FormGroup controlId='address'>
                    <FormLabel>Country</FormLabel>
                    <FormControl
                        type='text'
                        placeholder='Enter country'
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                    ></FormControl>
                </FormGroup>
                <Button type='submit' variant='primary'>Continue</Button>
            </Form>
        </FormContainer>
    )
}

export default ShippingScreen