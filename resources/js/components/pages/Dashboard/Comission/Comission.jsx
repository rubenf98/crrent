import React, { useState, useEffect } from 'react'
import styled, { withTheme } from "styled-components";
import { connect } from "react-redux";
import { fetchComissions, deleteComission, setCurrentComission } from "../../../../redux/comission/actions";
import ComissionTableContainer from "./ComissionTableContainer";
import ComissionFormContainer from './ComissionFormContainer';
import CardContainer from '../Common/CardContainer';


const Container = styled.div`
    width: 100%;
`;


function Comission(props) {
    const [filters, setFilters] = useState({});
    const [visible, setVisible] = useState(false);
    const { data, loading, current } = props;

    const handleFilters = (aFilters) => {
        setFilters({ ...filters, ...aFilters });

    }

    useEffect(() => {
        props.fetchComissions(1, filters);
    }, [filters])

    const handlePageChange = (pagination) => {

        props.fetchComissions(pagination.current, filters);
    }

    const handleUpdateClick = (row) => {
        setVisible(true);
        props.setCurrentComission(row);
    }

    return (

        <Container>
            <CardContainer text="Preços Base">

                <ComissionTableContainer
                    data={data}
                    loading={loading}
                    onDelete={props.deleteComission}
                    setVisible={setVisible}
                    handlePageChange={handlePageChange}
                    handleUpdateClick={handleUpdateClick}
                />

                <ComissionFormContainer
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
        fetchComissions: (page, filters) => dispatch(fetchComissions(page, filters)),
        deleteComission: (id) => dispatch(deleteComission(id)),
        setCurrentComission: (row) => dispatch(setCurrentComission(row)),
    };
};

const mapStateToProps = (state) => {
    return {
        loading: state.comission.loading,
        data: state.comission.data,
        current: state.comission.current,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(Comission));