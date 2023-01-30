import React, { useState, useEffect } from 'react'
import styled, { withTheme } from "styled-components";
import { connect } from "react-redux";
import { fetchPromotions, deletePromotion } from "../../../../redux/promotion/actions";
import { dimensions } from '../../../helper';
import GlobalParameterFormContainer from './GlobalParameterFormContainer';
import CardContainer from '../Common/CardContainer';
import { fetchGlobalParameters } from '../../../../redux/globalParameter/actions';


const Container = styled.div`
    width: 100%;
    margin-bottom: 20px;
`;


function Promotion({ theme, data, loading, fetchGlobalParameters, meta }) {


    useEffect(() => {
        fetchGlobalParameters();
    }, [])


    return (

        <Container>
            <CardContainer text="Configuração global">
                <GlobalParameterFormContainer data={data} />
            </CardContainer>
        </Container>


    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchGlobalParameters: (page, filters) => dispatch(fetchGlobalParameters(page, filters)),
    };
};

const mapStateToProps = (state) => {
    return {
        loading: state.globalParameter.loading,
        data: state.globalParameter.data,
        meta: state.globalParameter.meta,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(Promotion));