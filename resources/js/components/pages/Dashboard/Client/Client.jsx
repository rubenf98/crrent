import React, { useState, useEffect } from 'react'
import styled, { withTheme } from "styled-components";
import { connect } from "react-redux";
import { fetchClients, deleteClient, setCurrentClient } from "../../../../redux/client/actions";
import ClientTableContainer from "./ClientTableContainer";
import { dimensions } from '../../../helper';
import ClientFormContainer from './ClientFormContainer';
import CardContainer from '../Common/CardContainer';


const Container = styled.div`
    width: 100%;
`;


function Client({ setCurrentClient, data, meta, loading, fetchClients, deleteClient, current }) {
    const [filters, setFilters] = useState({});
    const [visible, setVisible] = useState(false)

    const handleFilters = (aFilters) => {
        setFilters({ ...filters, ...aFilters });
    }

    useEffect(() => {
        fetchClients(1, filters);
    }, [filters])

    const handlePageChange = (pagination) => {
        fetchClients(pagination.current, filters);
    }

    const handleUpdateClick = (row) => {
        setVisible(true);
        setCurrentClient(row);
    }

    return (

        <Container>
            <CardContainer text="Listagem de clientes">

                <ClientTableContainer
                    data={data}
                    loading={loading}
                    onDelete={deleteClient}
                    setVisible={setVisible}
                    handlePageChange={handlePageChange}
                    handleUpdateClick={handleUpdateClick}
                    handleFilters={handleFilters}
                    meta={meta}
                />

                <ClientFormContainer
                    visible={visible}
                    handleClose={() => setVisible(false)}
                    current={current}

                />
            </CardContainer>
        </Container>


    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchClients: (page, filters) => dispatch(fetchClients(page, filters)),
        deleteClient: (id) => dispatch(deleteClient(id)),
        setCurrentClient: (row) => dispatch(setCurrentClient(row)),
    };
};

const mapStateToProps = (state) => {
    return {
        loading: state.client.loading,
        data: state.client.data,
        meta: state.client.meta,
        current: state.client.current,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(Client));