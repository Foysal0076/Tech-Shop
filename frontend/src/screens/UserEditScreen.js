import React, { useEffect, useState } from 'react'
import FormContainer from '../components/layout/FormContainer'
import { Form, FormGroup, FormLabel, Button, FormControl, FormCheck } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/layout/Message'
import Loader from '../components/layout/Loader'
import { getUserDetails, updateUser } from '../actions/userActions'
import { USER_UPDATE_RESET } from '../actions/types'

const UserEditScreen = ({ match, history }) => {
    const userId = match.params.id
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [isAdmin, setIsAdmin] = useState(false)
    const dispatch = useDispatch()

    const { loading, error, user } = useSelector(state => state.userDetails)
    const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = useSelector(state => state.userUpdate)

    useEffect(() => {
        if (successUpdate) {
            dispatch({
                type: USER_UPDATE_RESET
            })
            history.push('/admin/userlist')
        } else {
            if (!user || user._id !== userId) {
                dispatch(getUserDetails(userId))
            } else {
                setName(user.name)
                setEmail(user.email)
                setIsAdmin(user.isAdmin)
            }
        }
    }, [dispatch, user, history, successUpdate, userId])

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(updateUser({ _id: userId, name, email, isAdmin }))
    }

    return (
        <>
            <Link to='/admin/userlist' className='btn btn-light my-3'>Go Back</Link>
            <FormContainer>
                <h1>Edit User</h1>
                {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
                {loadingUpdate && <Loader />}
                {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> :
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
                        <FormGroup controlId='isAdmin'>
                            <FormCheck
                                type='checkbox'
                                label='Admin'
                                checked={isAdmin}
                                onChange={(e) => setIsAdmin(e.target.checked)} >
                            </FormCheck>
                        </FormGroup>
                        <Button type='submit' variant='primary'>Update</Button>
                    </Form>
                }

            </FormContainer>
        </>
    )
}

export default UserEditScreen