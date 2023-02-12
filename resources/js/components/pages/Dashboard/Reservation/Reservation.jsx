import React, { useState, useEffect } from 'react'
import styled from "styled-components";
import { connect } from "react-redux";
import { fetchReservations, deleteReservation, fetchReservationsArchive, updateReservationStatus } from "../../../../redux/reservation/actions";
import TableContainer from "./TableContainer";
import ArchiveTableContainer from "./ArchiveTableContainer";
import { dimensions } from '../../../helper';
import DrawerContainer from './DrawerContainer';
import moment from "moment";
import ReservationFormContainer from './ReservationFormContainer';
import NewCalendarContainer from './NewCalendarContainer';

const Container = styled.div`
    width: 100%;
`;

function Reservation({ data, dataArchive, updateReservationStatus,
    metaArchive, loading, meta, fetchReservations, deleteReservation, fetchReservationsArchive }) {
    const [filters, setFilters] = useState({ after: moment().format('YYYY-MM-DD') });
    const [archiveFilters, setArchiveFilters] = useState({});
    const [current, setCurrent] = useState(undefined);
    const [drawerState, setDrawerState] = useState(0);

    const [currentForm, setCurrentForm] = useState({});
    const [formVisible, setFormVisible] = useState(0);
    const [formEdit, setFormEdit] = useState(0);

    const handleFilters = (aFilters) => {
        setFilters({ ...filters, ...aFilters });

    }


    const handleArchiveFilters = (aFilters) => {
        setArchiveFilters({ ...archiveFilters, ...aFilters });

    }

    useEffect(() => {
        fetchReservations(1, filters);
    }, [filters])

    useEffect(() => {
        fetchReservationsArchive(1, archiveFilters);
    }, [archiveFilters])

    const handleArchivePageChange = (pagination, _, sorter) => {
        var sorterData = {};
        if (sorter.field && sorter.order) {
            sorterData[sorter.field.replace("_", "") + "Sorter"] = sorter.order == "ascend" ? "asc" : "desc";
        }

        fetchReservationsArchive(pagination.current, { ...archiveFilters, ...sorterData });
    }

    const handlePageChange = (pagination, _, sorter) => {
        var sorterData = {};
        if (sorter.field && sorter.order) {
            sorterData[sorter.field.replace("_", "") + "Sorter"] = sorter.order == "ascend" ? "asc" : "desc";
        }

        fetchReservations(pagination.current, { ...filters, ...sorterData });
    }

    const handleRowClick = (row) => {
        setCurrent(row.id);
        setDrawerState(1);
    }

    const handleUpdateClick = (row) => {
        setFormVisible(true);
        setCurrentForm(row);
        setFormEdit(1);
    }

    const handleCreateClick = (row) => {
        setFormVisible(true);
        setCurrentForm({});
        setFormEdit(0);
    }

    return (
        <Container>
            <DrawerContainer currentId={current} drawerState={drawerState} setDrawerState={setDrawerState} />
            <NewCalendarContainer handleCalendarViewMore={handleRowClick} />
            <ReservationFormContainer
                visible={formVisible}
                handleClose={() => setFormVisible(false)}
                current={currentForm}
                edit={formEdit}
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
                handleCreateClick={handleCreateClick}
                handleStatusChange={(id, status) => (id && status) && updateReservationStatus(id, { status: status }).then(() => { location.reload(); })}
            />

            <ArchiveTableContainer
                data={dataArchive}
                meta={metaArchive}
                loading={loading}
                handleRowClick={handleRowClick}
                handlePageChange={handleArchivePageChange}
                handleFilters={handleArchiveFilters}
                handleStatusChange={(id, status) => (id && status) && updateReservationStatus(id, { status: status }).then(() => { location.reload(); })}
            />
        </Container>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchReservations: (page, filters) => dispatch(fetchReservations(page, filters)),
        fetchReservationsArchive: (page, filters) => dispatch(fetchReservationsArchive(page, filters)),
        deleteReservation: (id) => dispatch(deleteReservation(id)),
        updateReservationStatus: (id, data) => dispatch(updateReservationStatus(id, data)),
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