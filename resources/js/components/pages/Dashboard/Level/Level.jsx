import React, { useState, useEffect } from 'react'
import styled, { withTheme } from "styled-components";
import { connect } from "react-redux";
import { deleteLevel, fetchLevels, setCurrent } from "../../../../redux/level/actions";
import TableContainer from "./TableContainer";
import { ActionButton } from '../../../styles';
import FormContainer from './FormContainer';
import CardContainer from '../Common/CardContainer';


const Container = styled.div`
    width: 100%;
`;

function Level({ current, fetchLevels, setCurrent, theme, data, loading, meta, deleteLevel }) {
    const [filters, setFilters] = useState({});
    const [edit, setEdit] = useState(false);
    const [visible, setVisible] = useState(false);

    const handleFilters = (aFilters) => {
        setFilters({ ...filters, ...aFilters });
    }


    useEffect(() => {
        fetchLevels(1, filters);
    }, [filters])


    const handlePageChange = (pagination) => {

        fetchLevels(pagination.current, filters);
    }

    const handleUpdateClick = (row) => {
        setVisible(true);
        setEdit(true);
        setCurrent(row);

    }

    const handleCreateClick = () => {
        setVisible(true);
        setEdit(false);
        setCurrent();
    }


    return (
        <Container>
            <CardContainer text="Gamas de veículos">
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
                    onDelete={deleteLevel}
                    handlePageChange={handlePageChange}
                    handleUpdateClick={handleUpdateClick}
                />
            </CardContainer>
        </Container>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchLevels: (page, filters) => dispatch(fetchLevels(page, filters)),
        deleteLevel: (id) => dispatch(deleteLevel(id)),
        setCurrent: (record) => dispatch(setCurrent(record)),
    };
};

const mapStateToProps = (state) => {
    return {
        loading: state.level.loading,
        data: state.level.data,
        meta: state.level.meta,
        current: state.level.current,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(Level));