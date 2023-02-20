import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { dimensions } from "../../helper";
import TodayTableContainer from "./Homepage/TodayTableContainer";
import { connect } from "react-redux";
import { fetchTodayReservations, fetchNextReservations, exportReservationCsv } from "../../../redux/reservation/actions";
import NextTableContainer from "./Homepage/NextTableContainer";
import InitReservation from "./Homepage/InitReservation";
import DrawerContainer from "./Reservation/DrawerContainer";
import { SmallPrimaryButton } from "../../styles";
import { message } from 'antd';

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



function Dashboard({ fetchTodayReservations, fetchNextReservations, todayData, nextData, exportReservationCsv, loadingExport }) {
    const [current, setCurrent] = useState(undefined);
    const [drawerState, setDrawerState] = useState(0);

    useEffect(() => {
        fetchTodayReservations();
        fetchNextReservations();
    }, [])

    const handleRowClick = (row) => {
        setCurrent(row.id);
        setDrawerState(1);
    }


    return (
        <Container>
            <h1>Bem vindo de volta ao painel de controlo</h1>
            {loadingExport ? message.loading("Descarregando ficheiros...", 5) : <></>}
            <SmallPrimaryButton onClick={exportReservationCsv}>Descarregar reservas</SmallPrimaryButton>
            <DrawerContainer currentId={current} drawerState={drawerState} setDrawerState={setDrawerState} />
            <TodayContainer>
                <TodayTableContainer handleRowClick={handleRowClick} title="Levantamentos Hoje" data={todayData.pickup} />
                <TodayTableContainer handleRowClick={handleRowClick} title="Devoluções Hoje" data={todayData.return} />
            </TodayContainer>

            <NextTableContainer handleRowClick={handleRowClick} title="Devoluções Hoje" data={nextData} />

            <InitReservation />


        </Container>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchTodayReservations: () => dispatch(fetchTodayReservations()),
        fetchNextReservations: () => dispatch(fetchNextReservations()),
        exportReservationCsv: (filters) => dispatch(exportReservationCsv(filters)),
    };
};

const mapStateToProps = (state) => {
    return {
        loading: state.reservation.loading,
        loadingExport: state.reservation.loadingExport,
        todayData: state.reservation.todayData,
        nextData: state.reservation.nextData
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
