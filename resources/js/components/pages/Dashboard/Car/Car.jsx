import React, { useState, useEffect } from 'react'
import styled, { withTheme } from "styled-components";
import { connect } from "react-redux";
import { fetchCars, deleteCar, setCurrent, setCarStatus, fetchCarsAvailability } from "../../../../redux/car/actions";
import TableContainer from "./TableContainer";
import { ActionButton } from '../../../styles';
import FormContainer from './FormContainer';
import CardContainer from '../Common/CardContainer';
import CalendarContainer from './CalendarContainer';


const Container = styled.div`
    width: 100%;
`;

function Car({ current, theme, data, loading, meta, fetchCars, deleteCar, setCurrent, setCarStatus, fetchCarsAvailability, availability }) {
    const [filters, setFilters] = useState({});
    const [availabilityFilters, setAvailabilityFilters] = useState({});
    const [edit, setEdit] = useState(false);
    const [visible, setVisible] = useState(false);

    const handleFilters = (aFilters) => {
        setFilters({ ...filters, ...aFilters });

    }

    const handleAvailabilityFilters = (aFilters) => {
        setAvailabilityFilters({ ...availabilityFilters, ...aFilters });

    }

    useEffect(() => {
        fetchCars(1, filters);
    }, [filters])

    useEffect(() => {
        fetchCarsAvailability(availabilityFilters);
    }, [availabilityFilters])

    const handlePageChange = (pagination) => {

        fetchCars(pagination.current, filters);
    }

    const handleUpdateClick = (row) => {
        setVisible(true);
        setEdit(true);
        setCurrent(row);

    }

    const handleCreateClick = () => {
        setVisible(true);
        setEdit(false);
        setCurrent({});

    }


    return (
        <Container>
            <CalendarContainer data={availability} loading={loading} handleFilters={handleAvailabilityFilters} />
            <CardContainer text="Listagem de Carros">
                <FormContainer
                    visible={visible}
                    handleClose={() => setVisible(false)}
                    current={current}
                    edit={edit}
                />
                <ActionButton onClick={handleCreateClick} background={theme.primary}>
                    <img src="/icon/add_white.svg" alt="add" />
                </ActionButton>
                <TableContainer
                    data={data}
                    meta={meta}
                    loading={loading}
                    onDelete={deleteCar}
                    handlePageChange={handlePageChange}
                    handleUpdateClick={handleUpdateClick}
                    setCarStatus={setCarStatus}
                />
            </CardContainer>
        </Container>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchCars: (page, filters) => dispatch(fetchCars(page, filters)),
        deleteCar: (id) => dispatch(deleteCar(id)),
        setCurrent: (car) => dispatch(setCurrent(car)),
        setCarStatus: (id, status) => dispatch(setCarStatus(id, status)),
        fetchCarsAvailability: (filters) => dispatch(fetchCarsAvailability(filters)),
    };
};

const mapStateToProps = (state) => {
    return {
        loading: state.car.loading,
        data: state.car.data,
        meta: state.car.meta,
        current: state.car.current,
        availability: state.car.availability,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(Car));