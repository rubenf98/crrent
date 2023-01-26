import React, { useState, useEffect } from 'react'
import styled from "styled-components";
import { connect } from "react-redux";
import { fetchReservations, deleteReservation, fetchReservationsPerMonth, fetchReservationsArchive } from "../../../../redux/reservation/actions";
import TableContainer from "./TableContainer";
import ArchiveTableContainer from "./ArchiveTableContainer";
import { dimensions } from '../../../helper';
import DrawerContainer from './DrawerContainer';
import moment from "moment";
import ReservationFormContainer from './ReservationFormContainer';
import ClientFormContainer from '../Client/ClientFormContainer';
import ComissionFormContainer from '../Comission/ComissionFormContainer';
import NewCalendarContainer from './NewCalendarContainer';

const Container = styled.div`
    width: 100%;
`;
const dateFormat = "YYYY-MM-DD";
function Reservation({ data, dataArchive,
    metaArchive, loading, meta, fetchReservations, deleteReservation, fetchReservationsPerMonth, fetchReservationsArchive }) {
    const [calendarFilters, setCalendarFilters] = useState({ dates: [moment().startOf('month').startOf('day').subtract(5, 'days').format(dateFormat), moment().endOf('month').endOf('day').add(10, 'days').format(dateFormat)] });
    const [filters, setFilters] = useState({ after: moment().format('YYYY-MM-DD') });
    const [archiveFilters, setArchiveFilters] = useState({});
    const [current, setCurrent] = useState(undefined);
    const [drawerState, setDrawerState] = useState(0);

    const [currentForm, setCurrentForm] = useState({});
    const [formVisible, setFormVisible] = useState(0);

    const [currentClient, setCurrentClient] = useState({});
    const [clientFormVisible, setClientFormVisible] = useState(0);

    const [currentComission, setCurrentComission] = useState({});
    const [comissionFormVisible, setComissionFormVisible] = useState(0);

    const handleFilters = (aFilters) => {
        setFilters({ ...filters, ...aFilters });

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
        setCurrent(row.id);
        setDrawerState(1);
    }

    const handleUpdateClick = (row) => {
        setFormVisible(true);
        setCurrentForm(row);
    }

    const handleUpdateClientClick = (row) => {
        setClientFormVisible(true);
        setCurrentClient(row.client);
    }

    const handleUpdateComissionClick = (row) => {
        setComissionFormVisible(true);
        setCurrentComission(row.comission);
    }

    return (
        <Container>
            <DrawerContainer currentId={current} drawerState={drawerState} setDrawerState={setDrawerState} />
            <NewCalendarContainer handleCalendarViewMore={handleRowClick} />
            <ReservationFormContainer
                visible={formVisible}
                handleClose={() => setFormVisible(false)}
                current={currentForm}
            />
            <ClientFormContainer
                visible={clientFormVisible}
                handleClose={() => setClientFormVisible(false)}
                current={currentClient}
            />

            <ComissionFormContainer
                visible={comissionFormVisible}
                handleClose={() => setComissionFormVisible(false)}
                current={currentComission}
            />

            <TableContainer
                data={data}
                meta={meta}
                loading={loading}
                handleRowClick={handleRowClick}
                onDelete={deleteReservation}
                handlePageChange={handlePageChange}
                handleFilters={handleFilters}
                handleUpdateClick={handleUpdateClick}
                handleUpdateClientClick={handleUpdateClientClick}
                handleUpdateComissionClick={handleUpdateComissionClick}
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