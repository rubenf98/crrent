import React, { useState, useEffect } from 'react'
import styled, { withTheme } from "styled-components";
import { connect } from "react-redux";
import { fetchBlocks, deleteBlock } from "../../../../redux/block/actions";
import TableContainer from "./TableContainer";
import { dimensions } from '../../../helper';
import FormContainer from './FormContainer';


const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
`;


function Block({ theme, data, loading, fetchBlocks, deleteBlock, meta }) {
    const [filters, setFilters] = useState({});
    const [visible, setVisible] = useState(false)

    const handleFilters = (aFilters) => {
        setFilters({ ...filters, ...aFilters });

    }

    useEffect(() => {
        fetchBlocks(1, filters);
    }, [filters])

    const handlePageChange = (pagination) => {

        fetchBlocks(pagination.current, filters);
    }

    return (

        <Container>

            <TableContainer
                data={data}
                loading={loading}
                onDelete={deleteBlock}
                meta={meta}
                setVisible={setVisible}
                handlePageChange={handlePageChange}
            />
            <FormContainer
                visible={visible}
                handleClose={() => setVisible(false)}
            />
        </Container>


    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchBlocks: (page, filters) => dispatch(fetchBlocks(page, filters)),
        deleteBlock: (id) => dispatch(deleteBlock(id)),
    };
};

const mapStateToProps = (state) => {
    return {
        loading: state.block.loading,
        data: state.block.data,
        meta: state.block.meta,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(Block));