import React from 'react'
import { Helmet } from 'react-helmet'

const Meta = ({ title, description, keywords }) => {
    return (

        <Helmet>
            <title>{title}</title>
            <meta name='description' content={description} />
            <meta name='keywords' content={keywords} />
        </Helmet>

    )
}

Meta.defaultProps = {
    title: 'Welcome to TechShop',
    keywords: 'electronics, mobile, computer, buy electronics, affordable, cheap',
    description: 'We sell the best products in town',
}

export default Meta