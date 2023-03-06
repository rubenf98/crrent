import React, { useState, useEffect } from 'react'
import styled from "styled-components";
import { connect } from "react-redux";
import { fetchLogRecords } from "../../../../redux/logRecord/actions";
import moment from "moment";
import CardContainer from '../Common/CardContainer';

const Container = styled.div`
    width: 100%;
    span {
        font-weight: bold;
    }
`;

function LogRecord(props) {
    const { data, loading } = props;

    useEffect(() => {
        props.fetchLogRecords();
    }, [])

    return (
        <Container>
            <CardContainer text="Registo de atividade">
                {data.map((log) => (
                    <div>
                        <span>{moment(log.created_at).format('DD-MM-YYYY HH:mm')}:</span> {log.user.name} {log.description}
                    </div>
                ))}
            </CardContainer>
        </Container>
    )
}
const mapDispatchToProps = (dispatch) => {
    return {
        fetchLogRecords: (filters) => dispatch(fetchLogRecords(filters)),
    };
};


const mapStateToProps = (state) => {
    return {
        loading: state.logRecord.loading,
        data: state.logRecord.data,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LogRecord);