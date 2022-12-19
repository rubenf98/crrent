import React, { useState, useEffect } from 'react'
import styled, { withTheme } from "styled-components";
import { connect } from "react-redux";
import { fetchCars, deleteCar, setCurrent, setCarStatus } from "../../../../redux/car/actions";
import TableContainer from "./TableContainer";
import { ActionButton } from '../../../styles';
import FormContainer from './FormContainer';
import CardContainer from '../Common/CardContainer';


const Container = styled.div`
    width: 100%;
`;

function Car({ current, theme, data, loading, meta, fetchCars, deleteCar, setCurrent, setCarStatus }) {
    const [filters, setFilters] = useState({});
    const [edit, setEdit] = useState(false);
    const [visible, setVisible] = useState(false);

    const handleFilters = (aFilters) => {
        setFilters({ ...filters, ...aFilters });

    }

    useEffect(() => {
        fetchCars(1, filters);
    }, [filters])

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
    };
};

const mapStateToProps = (state) => {
    return {
        loading: state.car.loading,
        data: state.car.data,
        meta: state.car.meta,
        current: state.car.current,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(Car));