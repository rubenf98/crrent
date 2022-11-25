import React, { useState, useEffect } from 'react'
import styled from "styled-components";
import { connect } from "react-redux";
import { fetchCars, deleteCar } from "../../../../redux/car/actions";
import TableContainer from "./TableContainer";
import { dimensions } from '../../../helper';


const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`;

function Car({ data, loading, meta, fetchCars, deleteCar }) {
    const [filters, setFilters] = useState({});

    const handleFilters = (aFilters) => {
        setFilters({ ...filters, ...aFilters });

    }

    useEffect(() => {
        fetchCars(filters);
    }, [filters])

    const handlePageChange = (pagination) => {

        fetchCars(pagination.current, filters);
    }

    return (
        <Container>
            <TableContainer
                data={data}
                meta={meta}
                loading={loading}
                onDelete={deleteCar}
                handlePageChange={handlePageChange}
            />
        </Container>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchCars: (page, filters) => dispatch(fetchCars(page, filters)),
        deleteCar: (id) => dispatch(deleteCar(id)),
    };
};

const mapStateToProps = (state) => {
    return {
        loading: state.car.loading,
        data: state.car.data,
        meta: state.car.meta
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Car);