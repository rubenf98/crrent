import React, { useState, useEffect } from 'react'
import styled, { withTheme } from "styled-components";
import { connect } from "react-redux";
import { fetchPrices, deletePrice, setCurrentPrice } from "../../../../redux/price/actions";
import TableContainer from "./TableContainer";
import { dimensions } from '../../../helper';
import FormContainer from './FormContainer';
import CardContainer from '../Common/CardContainer';


const Container = styled.div`
    width: 100%;
`;


function Price({ setCurrentPrice, data, loading, fetchPrices, deletePrice, current }) {
    const [filters, setFilters] = useState({});
    const [visible, setVisible] = useState(false)

    const handleFilters = (aFilters) => {
        setFilters({ ...filters, ...aFilters });

    }

    useEffect(() => {
        fetchPrices(1, filters);
    }, [filters])

    const handlePageChange = (pagination) => {

        fetchPrices(pagination.current, filters);
    }

    const handleUpdateClick = (row) => {
        setVisible(true);
        setCurrentPrice(row);
    }

    return (

        <Container>
            <CardContainer text="Preços Base">

                <TableContainer
                    data={data}
                    loading={loading}
                    onDelete={deletePrice}
                    setVisible={setVisible}
                    handlePageChange={handlePageChange}
                    handleUpdateClick={handleUpdateClick}
                />

                <FormContainer
                    visible={visible}
                    handleClose={() => setVisible(false)}
                    current={current}
                />
            </CardContainer>
        </Container>


    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchPrices: (page, filters) => dispatch(fetchPrices(page, filters)),
        deletePrice: (id) => dispatch(deletePrice(id)),
        setCurrentPrice: (row) => dispatch(setCurrentPrice(row)),
    };
};

const mapStateToProps = (state) => {
    return {
        loading: state.price.loading,
        data: state.price.data,
        current: state.price.current,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(Price));