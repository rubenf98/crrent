import React, { useState, useEffect } from 'react'
import styled, { withTheme } from "styled-components";
import { connect } from "react-redux";
import { fetchBlockCars, deleteBlockCar } from "../../../../redux/blockCar/actions";
import TableContainer from "./TableContainer";
import FormContainer from './FormContainer';
import CardContainer from '../Common/CardContainer';

const Container = styled.div`
    width: 100%;
`;


function BlockCar({ theme, data, loading, fetchBlockCars, deleteBlockCar, meta }) {
    const [filters, setFilters] = useState({});
    const [visible, setVisible] = useState(false);

    const handleFilters = (aFilters) => {
        setFilters({ ...filters, ...aFilters });
    }

    useEffect(() => {
        fetchBlockCars(1, filters);
    }, [filters])

    const handlePageChange = (pagination) => {
        fetchBlockCars(pagination.current, filters);
    }

    return (

        <Container>
            <CardContainer text="Carros bloqueados">
                <TableContainer
                    data={data}
                    loading={loading}
                    onDelete={deleteBlockCar}
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
        fetchBlockCars: (page, filters) => dispatch(fetchBlockCars(page, filters)),
        deleteBlockCar: (id) => dispatch(deleteBlockCar(id)),
    };
};

const mapStateToProps = (state) => {
    return {
        loading: state.blockCar.loading,
        data: state.blockCar.data,
        meta: state.blockCar.meta,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(BlockCar));