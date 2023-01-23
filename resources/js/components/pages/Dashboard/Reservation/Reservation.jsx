import React, { useState, useEffect } from 'react'
import styled from "styled-components";
import { connect } from "react-redux";
import { fetchReservations, deleteReservation, fetchReservationsPerMonth, fetchReservationsArchive } from "../../../../redux/reservation/actions";
import TableContainer from "./TableContainer";
import ArchiveTableContainer from "./ArchiveTableContainer";
import { dimensions } from '../../../helper';
import DrawerContainer from './DrawerContainer';
import CalendarContainer from './CalendarContainer';
import moment from "moment";

const Container = styled.div`
    width: 100%;
`;
const dateFormat = "YYYY-MM-DD";
function Reservation({ data, dataArchive,
    metaArchive, loading, meta, fetchReservations, deleteReservation, fetchReservationsPerMonth, fetchReservationsArchive }) {
    const [calendarFilters, setCalendarFilters] = useState({ dates: [moment().startOf('month').startOf('day').subtract(5, 'days').format(dateFormat), moment().endOf('month').endOf('day').add(10, 'days').format(dateFormat)] });
    const [filters, setFilters] = useState({ after: moment().format('YYYY-MM-DD') });
    const [archiveFilters, setArchiveFilters] = useState({});
    const [current, setCurrent] = useState({});
    const [drawerState, setDrawerState] = useState(0);

    const handleFilters = (aFilters) => {
        setFilters({ ...filters, ...aFilters });

    }

    const handleCalendarFilters = (aFilters) => {
        setCalendarFilters({ ...calendarFilters, ...aFilters });

    }

    const handleArchiveFilters = (aFilters) => {
        setArchiveFilters({ ...archiveFilters, ...aFilters });

    }

    useEffect(() => {
        fetchReservationsPerMonth(calendarFilters);
    }, [calendarFilters])

    useEffect(() => {
        fetchReservations(1, filters);
    }, [filters])

    useEffect(() => {
        fetchReservationsArchive(1, archiveFilters);
    }, [archiveFilters])

    const handleArchivePageChange = (pagination) => {
        fetchReservationsArchive(pagination.current, archiveFilters);
    }

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

            <ArchiveTableContainer
                data={dataArchive}
                meta={metaArchive}
                loading={loading}
                handleRowClick={handleRowClick}
                handlePageChange={handleArchivePageChange}
                handleFilters={handleArchiveFilters}
            />
        </Container>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchReservations: (page, filters) => dispatch(fetchReservations(page, filters)),
        fetchReservationsArchive: (page, filters) => dispatch(fetchReservationsArchive(page, filters)),
        fetchReservationsPerMonth: (filters) => dispatch(fetchReservationsPerMonth(filters)),
        deleteReservation: (id) => dispatch(deleteReservation(id)),
    };
};

const mapStateToProps = (state) => {
    return {
        loading: state.reservation.loading,
        data: state.reservation.data,
        meta: state.reservation.meta,
        dataArchive: state.reservation.dataArchive,
        metaArchive: state.reservation.metaArchive
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Reservation);