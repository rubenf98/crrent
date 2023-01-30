import React, { useState, useEffect } from 'react'
import styled, { withTheme } from "styled-components";
import { connect } from "react-redux";
import { fetchLocalizations, deleteLocalization, setCurrentLocalization } from "../../../../redux/localization/actions";
import LocalizationTableContainer from "./LocalizationTableContainer";
import { dimensions } from '../../../helper';
import LocalizationFormContainer from './LocalizationFormContainer';
import CardContainer from '../Common/CardContainer';
import { ActionButton } from "../../../styles";


const Container = styled.div`
    width: 100%;
`;

function Localization({ data, current, loading, fetchLocalizations, deleteLocalization, setCurrentLocalization, theme }) {
    const [filters, setFilters] = useState({});
    const [visible, setVisible] = useState(false);
    const [edit, setEdit] = useState(false);

    const handleFilters = (aFilters) => {
        setFilters({ ...filters, ...aFilters });

    }

    useEffect(() => {
        fetchLocalizations(filters);
    }, [filters])

    const handleUpdateClick = (row) => {
        setVisible(true);
        setEdit(true);
        setCurrentLocalization(row);

    }

    const handleCreateClick = () => {
        setVisible(true);
        setEdit(false);
        setCurrentLocalization({});

    }


    return (
        <Container>
            <CardContainer text="Localizações">
                <LocalizationFormContainer
                    visible={visible}
                    handleClose={() => setVisible(false)}
                    current={current}
                    edit={edit}
                />

                <ActionButton onClick={handleCreateClick} background={theme.primary}>
                    <img src="/icon/add_white.svg" alt="add" />
                </ActionButton>
                <LocalizationTableContainer
                    data={data}
                    loading={loading}
                    onDelete={deleteLocalization}
                    handleUpdateClick={handleUpdateClick}
                    handleCreateClick={handleCreateClick}
                />
            </CardContainer>
        </Container>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchLocalizations: (filters) => dispatch(fetchLocalizations(filters)),
        deleteLocalization: (id) => dispatch(deleteLocalization(id)),
        setCurrentLocalization: (row) => dispatch(setCurrentLocalization(row)),
    };
};

const mapStateToProps = (state) => {
    return {
        loading: state.localization.loading,
        data: state.localization.data,
        current: state.localization.current
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(Localization));