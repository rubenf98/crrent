import React, { useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { dimensions } from "../../helper";
import TodayTableContainer from "./Homepage/TodayTableContainer";
import { connect } from "react-redux";
import { fetchTodayReservations, fetchNextReservations } from "../../../redux/reservation/actions";
import NextTableContainer from "./Homepage/NextTableContainer";
import InitReservation from "./Homepage/InitReservation";

const Container = styled.div`
    h1 {
        font-size: 36px;
        text-align: left;
        padding: 50px 0;
    }
`;



const TodayContainer = styled.section`
    display: flex;
    justify-content: space-between;
    gap: 20px;
    margin-bottom: 20px;
`;



function Dashboard({ fetchTodayReservations, fetchNextReservations, todayData, nextData }) {

    useEffect(() => {
        fetchTodayReservations();
        fetchNextReservations();
    }, [])


    return (
        <Container>
            <h1>Bem vindo de volta ao painel de controlo</h1>
            <TodayContainer>
                <TodayTableContainer title="Levantamentos Hoje" data={todayData.pickup} />
                <TodayTableContainer title="Devoluções Hoje" data={todayData.return} />
            </TodayContainer>

            <NextTableContainer title="Devoluções Hoje" data={nextData} />

            <InitReservation />


        </Container>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchTodayReservations: () => dispatch(fetchTodayReservations()),
        fetchNextReservations: () => dispatch(fetchNextReservations()),
    };
};

const mapStateToProps = (state) => {
    return {
        loading: state.reservation.loading,
        todayData: state.reservation.todayData,
        nextData: state.reservation.nextData
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
