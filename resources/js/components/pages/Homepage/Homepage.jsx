import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import About from './About'
import Faq from './Faq'
import Garage from './Garage'
import Header from './Header'
import { fetchPromotions } from "../../../redux/promotion/actions";

function Homepage({ fetchPromotions }) {
    
    useEffect(() => {
        fetchPromotions()
    }, [])

    return (
        <div>
            <Header />
            <Garage />
            <About />
            <Faq />
        </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchPromotions: () => dispatch(fetchPromotions()),
    };
};


export default connect(null, mapDispatchToProps)(Homepage);