import React from 'react'
import About from './About'
import Faq from './Faq'
import Garage from './Garage'
import Header from './Header'


function Homepage() {
    return (
        <div>
            <Header />
            <Garage />
            <About />
            <Faq />
        </div>
    )
}

export default Homepage