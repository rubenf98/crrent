import React, { useState, useEffect } from 'react'
import styled from "styled-components";
import { connect } from "react-redux";
import { fetchReservations, deleteReservation } from "../../../../redux/reservation/actions";
import TableContainer from "./TableContainer";
import { dimensions } from '../../../helper';
import DrawerContainer from './DrawerContainer';


const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
`;

function Reservation({ data, loading, meta, fetchReservations, deleteReservation }) {
    const [filters, setFilters] = useState({});
    const [current, setCurrent] = useState({});
    const [drawerState, setDrawerState] = useState(0);

    const handleFilters = (aFilters) => {
        setFilters({ ...filters, ...aFilters });

    }

    useEffect(() => {
        fetchReservations(1, filters);
    }, [filters])

    const handlePageChange = (pagination) => {

        fetchReservations(pagination.current, filters);
    }

    const handleRowClick = (row) => {
        setCurrent(row);
        setDrawerState(1);
    }

    return (
        <Container>
            <DrawerContainer data={current} drawerState={drawerState} setDrawerState={setDrawerState} />
            <TableContainer
                data={data}
                meta={meta}
                loading={loading}
                handleRowClick={handleRowClick}
                onDelete={deleteReservation}
                handlePageChange={handlePageChange}
            />
        </Container>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchReservations: (page, filters) => dispatch(fetchReservations(page, filters)),
        deleteReservation: (id) => dispatch(deleteReservation(id)),
    };
};

const mapStateToProps = (state) => {
    return {
        loading: state.reservation.loading,
        data: state.reservation.data,
        meta: state.reservation.meta
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Reservation);