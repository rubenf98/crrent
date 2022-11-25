import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import About from './About'
import Faq from './Faq'
import Garage from './Garage'
import Header from './Header'
import { fetchPromotions } from "../../../redux/promotion/actions";
import { fetchExtras } from '../../../redux/extra/actions'

function Homepage({ fetchPromotions, language, fetchExtras }) {
    const { text } = require('../../../../assets/' + language + "/homepage");

    useEffect(() => {
        fetchPromotions()
        fetchExtras()
    }, [])

    return (
        <div>
            <Header text={text.header} />
            <Garage text={text.garage} />
            <About text={text.about} />
            <Faq text={text.faq} />
        </div>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchPromotions: () => dispatch(fetchPromotions()),
        fetchExtras: () => dispatch(fetchExtras()),
    };
};

const mapStateToProps = (state) => {
    return {
        language: state.application.language,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);