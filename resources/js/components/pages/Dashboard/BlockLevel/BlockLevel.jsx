import React, { useState, useEffect } from 'react'
import styled, { withTheme } from "styled-components";
import { connect } from "react-redux";
import { fetchBlockPeriods, deleteBlockPeriod } from "../../../../redux/blockPeriod/actions";
import TableContainer from "./TableContainer";
import { dimensions } from '../../../helper';
import FormContainer from './FormContainer';
import CardContainer from '../Common/CardContainer';


const Container = styled.div`
    width: 100%;
    margin-bottom: 50px;
`;


function BlockLevel({ theme, data, loading, fetchBlockPeriods, deleteBlockPeriod, meta }) {
    const [filters, setFilters] = useState({});
    const [visible, setVisible] = useState(false)

    const handleFilters = (aFilters) => {
        setFilters({ ...filters, ...aFilters });

    }

    useEffect(() => {
        fetchBlockPeriods(1, filters);
    }, [filters])

    const handlePageChange = (pagination) => {

        fetchBlockPeriods(pagination.current, filters);
    }

    return (

        <Container>
            <CardContainer text="Grupos Bloqueados">
                <TableContainer
                    data={data}
                    loading={loading}
                    onDelete={deleteBlockPeriod}
                    meta={meta}
                    setVisible={setVisible}
                    handlePageChange={handlePageChange}
                />
                <FormContainer
                    visible={visible}
                    handleClose={() => setVisible(false)}
                />
            </CardContainer>
        </Container>


    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchBlockPeriods: (page, filters) => dispatch(fetchBlockPeriods(page, filters)),
        deleteBlockPeriod: (id) => dispatch(deleteBlockPeriod(id)),
    };
};

const mapStateToProps = (state) => {
    return {
        loading: state.blockPeriod.loading,
        data: state.blockPeriod.data,
        meta: state.blockPeriod.meta,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(BlockLevel));