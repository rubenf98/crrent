import React, { useState, useEffect } from 'react'
import styled, { withTheme } from "styled-components";
import { connect } from "react-redux";
import { fetchPromotions, deletePromotion } from "../../../../redux/promotion/actions";
import TableContainer from "./TableContainer";
import { dimensions } from '../../../helper';
import FormContainer from './FormContainer';
import CardContainer from '../Common/CardContainer';


const Container = styled.div`
    width: 100%;
    margin-bottom: 20px;
`;


function Promotion({ theme, data, loading, fetchPromotions, deletePromotion, meta }) {
    const [filters, setFilters] = useState({});
    const [visible, setVisible] = useState(false)

    const handleFilters = (aFilters) => {
        setFilters({ ...filters, ...aFilters });

    }

    useEffect(() => {
        fetchPromotions(1, filters);
    }, [filters])

    const handlePageChange = (pagination) => {

        fetchPromotions(pagination.current, filters);
    }

    return (

        <Container>
            <CardContainer text="Preços Percentuais">
                <TableContainer
                    data={data}
                    loading={loading}
                    onDelete={deletePromotion}
                    meta={meta}
                    setVisible={setVisible}
                    handlePageChange={handlePageChange}
                />
                <FormContainer
                    visible={visible}
                    handleClose={() => setVisible(false)}
                />
            </CardContainer>
        </Container>


    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchPromotions: (page, filters) => dispatch(fetchPromotions(page, filters)),
        deletePromotion: (id) => dispatch(deletePromotion(id)),
    };
};

const mapStateToProps = (state) => {
    return {
        loading: state.promotion.loading,
        data: state.promotion.data,
        meta: state.promotion.meta,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(Promotion));