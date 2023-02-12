import React, { useState, useEffect } from 'react'
import styled, { withTheme } from "styled-components";
import { connect } from "react-redux";
import { fetchAgencies, deleteAgency, setCurrentAgency } from "../../../../redux/agency/actions";
import AgencyTableContainer from "./AgencyTableContainer";
import { dimensions } from '../../../helper';
import AgencyFormContainer from './AgencyFormContainer';
import CardContainer from '../Common/CardContainer';


const Container = styled.div`
    width: 100%;
`;


function Agency(props) {
    const [filters, setFilters] = useState({});
    const [visible, setVisible] = useState(false);
    const { data, loading, current } = props;

    const handleFilters = (aFilters) => {
        setFilters({ ...filters, ...aFilters });

    }

    useEffect(() => {
        props.fetchAgencies(1, filters);
    }, [filters])

    const handlePageChange = (pagination) => {

        props.fetchAgencies(pagination.current, filters);
    }

    const handleUpdateClick = (row) => {
        setVisible(true);
        props.setCurrentAgency(row);
    }

    return (

        <Container>
            <CardContainer text="Preços Base">

                <AgencyTableContainer
                    data={data}
                    loading={loading}
                    onDelete={props.deleteAgency}
                    setVisible={setVisible}
                    handlePageChange={handlePageChange}
                    handleUpdateClick={handleUpdateClick}
                />

                <AgencyFormContainer
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
        fetchAgencies: (page, filters) => dispatch(fetchAgencies(page, filters)),
        deleteAgency: (id) => dispatch(deleteAgency(id)),
        setCurrentAgency: (row) => dispatch(setCurrentAgency(row)),
    };
};

const mapStateToProps = (state) => {
    return {
        loading: state.agency.loading,
        data: state.agency.data,
        current: state.agency.current,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(Agency));