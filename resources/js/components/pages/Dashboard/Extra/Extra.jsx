import React, { useState, useEffect } from 'react'
import styled from "styled-components";
import { connect } from "react-redux";
import { fetchExtras, deleteExtra } from "../../../../redux/extra/actions";
import TableContainer from "./TableContainer";
import { dimensions } from '../../../helper';


const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
`;

function Extra({ data, loading, fetchExtras, deleteExtra }) {
    const [filters, setFilters] = useState({});

    const handleFilters = (aFilters) => {
        setFilters({ ...filters, ...aFilters });

    }

    useEffect(() => {
        fetchExtras(filters);
    }, [filters])

    return (
        <Container>
            <TableContainer
                data={data}
                loading={loading}
                onDelete={deleteExtra}
            />
        </Container>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchExtras: (filters) => dispatch(fetchExtras(filters)),
        deleteExtra: (id) => dispatch(deleteExtra(id)),
    };
};

const mapStateToProps = (state) => {
    return {
        loading: state.extra.loading,
        data: state.extra.data,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Extra);