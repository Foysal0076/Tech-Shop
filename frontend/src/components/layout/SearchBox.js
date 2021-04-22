import React, { useState } from 'react'
import { Button, Form, FormControl } from 'react-bootstrap'


const SearchBox = ({ history }) => {

    const [keyword, setKeyword] = useState('')

    const onSubmitHandler = (e) => {
        e.preventDefault()
        if (keyword.trim()) {
            history.push(`/search/${keyword}`)
        } else {
            history.push('/')
        }
    }

    return (
        <Form onSubmit={onSubmitHandler} inline>
            <FormControl
                type='text'
                name='q'
                onChange={(e) => setKeyword(e.target.value)}
                className='mr-sm-2 ml-sm-5'>

            </FormControl>
            <Button type='submit' variant='success' className='p-2'>
                Search
             </Button>
        </Form>
    )
}

export default SearchBox