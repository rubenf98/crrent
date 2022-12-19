import React, { useState, useEffect } from 'react'
import styled, { withTheme } from "styled-components";
import { connect } from "react-redux";
import { fetchExtras, deleteExtra, setCurrentExtra } from "../../../../redux/extra/actions";
import TableContainer from "./TableContainer";
import { dimensions } from '../../../helper';
import FormContainer from './FormContainer';
import CardContainer from '../Common/CardContainer';
import { ActionButton } from "../../../styles";


const Container = styled.div`
    width: 100%;
`;

function Extra({ data, current, loading, fetchExtras, deleteExtra, setCurrentExtra, theme }) {
    const [filters, setFilters] = useState({});
    const [visible, setVisible] = useState(false);
    const [edit, setEdit] = useState(false);

    const handleFilters = (aFilters) => {
        setFilters({ ...filters, ...aFilters });

    }

    useEffect(() => {
        fetchExtras(filters);
    }, [filters])

    const handleUpdateClick = (row) => {
        setVisible(true);
        setEdit(true);
        setCurrentExtra(row);

    }

    const handleCreateClick = () => {
        setVisible(true);
        setEdit(false);
        setCurrentExtra({});

    }


    return (
        <Container>
            <CardContainer text="Listagem de extras">
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
                    loading={loading}
                    onDelete={deleteExtra}
                    handleUpdateClick={handleUpdateClick}
                    handleCreateClick={handleCreateClick}
                />
            </CardContainer>
        </Container>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchExtras: (filters) => dispatch(fetchExtras(filters)),
        deleteExtra: (id) => dispatch(deleteExtra(id)),
        setCurrentExtra: (row) => dispatch(setCurrentExtra(row)),
    };
};

const mapStateToProps = (state) => {
    return {
        loading: state.extra.loading,
        data: state.extra.data,
        current: state.extra.current
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(Extra));