import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'


const Footer = () => {
    return (
        <footer className='bg-primary text-white' >
            <Container>
                <Row>
                    <Col className='text-center py-3 ' >
                        Copyright &copy; {new Date().getFullYear()} TechShop
                    </Col>
                </Row>
            </Container>
        </footer>
    )
}

export default Footer