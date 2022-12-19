import React, { useState, useEffect } from 'react'
import styled from "styled-components";
import { connect } from "react-redux";
import { fetchReservations, deleteReservation, fetchReservationsPerMonth } from "../../../../redux/reservation/actions";
import TableContainer from "./TableContainer";
import { dimensions } from '../../../helper';
import DrawerContainer from './DrawerContainer';
import CalendarContainer from './CalendarContainer';
import moment from "moment";

const Container = styled.div`
    width: 100%;
`;
const dateFormat = "YYYY-MM-DD";
function Reservation({ data, loading, meta, fetchReservations, deleteReservation, fetchReservationsPerMonth }) {
    const [calendarFilters, setCalendarFilters] = useState({ dates: [moment().startOf('month').startOf('day').subtract(5, 'days').format(dateFormat), moment().endOf('month').endOf('day').add(10, 'days').format(dateFormat)] });
    const [filters, setFilters] = useState({})
    const [current, setCurrent] = useState({});
    const [drawerState, setDrawerState] = useState(0);

    const handleFilters = (aFilters) => {
        setFilters({ ...filters, ...aFilters });

    }

    const handleCalendarFilters = (aFilters) => {
        setCalendarFilters({ ...calendarFilters, ...aFilters });

    }

    useEffect(() => {
        fetchReservationsPerMonth(calendarFilters);
    }, [calendarFilters])

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
            <CalendarContainer handleFilters={handleCalendarFilters} />
            <TableContainer
                data={data}
                meta={meta}
                loading={loading}
                handleRowClick={handleRowClick}
                onDelete={deleteReservation}
                handlePageChange={handlePageChange}
                handleFilters={handleFilters}
            />
        </Container>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchReservations: (page, filters) => dispatch(fetchReservations(page, filters)),
        fetchReservationsPerMonth: (filters) => dispatch(fetchReservationsPerMonth(filters)),
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