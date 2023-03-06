import React, { useState, useEffect } from 'react'
import styled, { withTheme } from "styled-components";
import { connect } from "react-redux";
import { fetchPromotions, deletePromotion, setCurrentPromotion } from "../../../../redux/promotion/actions";
import TableContainer from "./TableContainer";
import { dimensions } from '../../../helper';
import FormContainer from './FormContainer';
import CardContainer from '../Common/CardContainer';


const Container = styled.div`
    width: 100%;
    margin-bottom: 20px;
`;


function Promotion({ setCurrentPromotion, data, loading, current, fetchPromotions, deletePromotion, meta }) {
    const [filters, setFilters] = useState({});
    const [visible, setVisible] = useState(false);
    const [edit, setEdit] = useState(false);

    const handleFilters = (aFilters) => {
        setFilters({ ...filters, ...aFilters });

    }

    useEffect(() => {
        fetchPromotions(1, filters);
    }, [filters])

    const handlePageChange = (pagination) => {

        fetchPromotions(pagination.current, filters);
    }

    const handleUpdateClick = (row) => {
        setVisible(true);
        setCurrentPromotion(row);
        setEdit(true);
    }

    const handleCreateClick = () => {
        setVisible(true);
        setEdit(false);
        setCurrentPromotion({});

    }

    return (

        <Container>
            <CardContainer text="Preços Percentuais">
                <TableContainer
                    data={data}
                    loading={loading}
                    onDelete={deletePromotion}
                    meta={meta}
                    handleCreateClick={handleCreateClick}
                    handlePageChange={handlePageChange}
                    handleUpdateClick={handleUpdateClick}
                />
                <FormContainer
                    visible={visible}
                    handleClose={() => setVisible(false)}
                    current={current}
                    edit={edit}
                />
            </CardContainer>
        </Container>


    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchPromotions: (page, filters) => dispatch(fetchPromotions(page, filters)),
        deletePromotion: (id) => dispatch(deletePromotion(id)),
        setCurrentPromotion: (row) => dispatch(setCurrentPromotion(row)),
    };
};

const mapStateToProps = (state) => {
    return {
        loading: state.promotion.loading,
        data: state.promotion.data,
        meta: state.promotion.meta,
        current: state.promotion.current,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(Promotion));