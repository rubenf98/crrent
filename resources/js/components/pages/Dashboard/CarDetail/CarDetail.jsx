import React, { useState, useEffect } from 'react'
import styled, { withTheme } from "styled-components";
import { connect } from "react-redux";
import { deleteCar, setCurrent, setCarStatus, fetchCarsAvailability, fetchCar } from "../../../../redux/car/actions";
import FormContainer from './FormContainer';
import CardContainer from '../Common/CardContainer';
import CalendarContainer from './CalendarContainer';
import { useParams } from 'react-router-dom';
import TableContainer from '../Reservation/TableContainer';
import { fetchReservations, fetchReservationsPerMonth } from '../../../../redux/reservation/actions';
import { Col, Row } from 'antd';
import { dateFormat } from '../../../helper';
import moment from "moment";
import { AirIcon, DoorsIcon, GasIcon, PeopleIcon, ShiftIcon } from '../../../../icons';

const Container = styled.div`
    width: 100%;
`;

const CarImage = styled.img`
    width: 100%;
`;

const IconContainer = styled.div`
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    gap: 30px;

    .border {
        border: 2px solid;
        border-color: ${props => props.border}; 
    }
`;


const Icon = styled.div`
    width: 55px;
    height: 55px;

    div {
        padding: 10px;
        box-sizing: border-box;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    p {
        font-size: 14px;
        text-align: center;
        margin: auto;
        margin-top: 15px;
    }

    svg {
        width: 100%;
        height: 100%;
    }
`;

const Action = styled.button`
    padding: 2px 10px;
    color: white;
    font-weight: bold;
    box-shadow: none;
    border: 0px;
    cursor: pointer;
    background-color: ${props => props.active ? "green" : "red"};
    
    &:nth-child(2) {
        margin-left: 5px;
    }

`;


const Field = styled.div`
    display: flex;
    align-items: flex-start;
    gap: 5px;
    margin-bottom: 10px;
    
    h4 {
        opacity: .7;
        
        &::after {
            content: ":";
        }
    }

    p, h4 {
        margin: 0px;
        font-size: 16px;
    }

`;


function CarDetail(props) {
    const [calendarFilters, setCalendarFilters] = useState(
        {
            dates: [
                moment().startOf('month').startOf('day').subtract(5, 'days').format(dateFormat),
                moment().endOf('month').endOf('day').add(2, 'months').add(10, 'days').format(dateFormat)]
        }
    );
    const [filters, setFilters] = useState({});

    let { id } = useParams();
    const { car } = props;

    const handleCalendarFilters = (aFilters) => {
        setCalendarFilters({ ...calendarFilters, ...aFilters });
    }

    useEffect(() => {
        props.fetchReservationsPerMonth({ car: car.registration, ...calendarFilters });
    }, [calendarFilters])

    const handleFilters = (aFilters) => {
        setFilters({ ...filters, ...aFilters });
    }

    useEffect(() => {
        props.fetchCar(id);
    }, [])

    useEffect(() => {
        if (car) {
            handleCalendarFilters({ car: car.registration });
            setFilters({ ...filters, car: car.registration });
        }
    }, [car])

    useEffect(() => {
        props.fetchReservations(1, filters);
    }, [filters])

    const handlePageChange = (pagination) => {
        props.fetchReservations(pagination.current, filters);
    }

    return (
        <Container>
            {!props.loadingCar &&
                <>
                    <CardContainer text="Veículo">
                        <Row type="flex" align='middle' justify='space-between' gutter={16}>
                            <Col span={6}>
                                <CarImage src={car?.category?.image} alt="" />
                            </Col>
                            <Col span={18}>
                                {car.registration && <CalendarContainer handleFilters={handleCalendarFilters} />}
                            </Col>
                        </Row>
                        <Row type="flex" align='flex-start' gutter={16}>
                            <Col span={24}>
                                <Row style={{ marginBottom: "30px" }} type="flex" justify='space-between'>
                                    <h1>{car?.category?.title + (car.registration ? " - " + car.registration : "")}</h1>
                                    <Action onClick={() => props.setCarStatus(car.id, { status: !car.status })} active={car.status} >{car.status ? "Desbloqueado" : "Bloqueado"}</Action>
                                </Row>
                            </Col>
                            <Col span={24}>
                                <h3>Descrição</h3>
                            </Col>
                            <Col span={12}>

                                <Field>
                                    <h4>PT</h4>
                                    <p>{car?.category?.description?.pt}</p>
                                </Field>

                            </Col>
                            <Col span={12}>
                                <Field>
                                    <h4>EN</h4>
                                    <p>{car?.category?.description?.en}</p>
                                </Field>
                            </Col>
                            {car?.category?.charateristics.map((charateristic) => (
                                <Col key={charateristic.id} span={6}>
                                    <Field>
                                        <h4>{charateristic.title}</h4>
                                        <p>{charateristic.pivot.value ? charateristic.pivot.value : "Sim"}</p>
                                    </Field>
                                </Col>

                            ))}

                            <Col span={6}>

                                <Field>
                                    <h4>Quilometragem</h4>
                                    <p>{car.kms} KM</p>
                                </Field>
                            </Col>
                        </Row>
                        <br />

                    </CardContainer>
                    <br />
                    <TableContainer
                        data={props.reservations}
                        meta={props.meta}
                        loading={props.loadingReservations}
                        onDelete={props.deleteReservation}
                        handlePageChange={handlePageChange}
                        handleFilters={handleFilters}
                        aFilters={{ id: undefined, name: undefined, date: undefined, car: car.registration }}
                    />
                </>
            }

        </Container>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchCar: (id) => dispatch(fetchCar(id)),
        fetchReservations: (page, filters) => dispatch(fetchReservations(page, filters)),
        deleteReservation: (id) => dispatch(deleteReservation(id)),
        fetchReservationsPerMonth: (filters) => dispatch(fetchReservationsPerMonth(filters)),
        deleteCar: (id) => dispatch(deleteCar(id)),
        setCarStatus: (id, status) => dispatch(setCarStatus(id, status)),
        setCurrent: (car) => dispatch(setCurrent(car)),
        fetchCarsAvailability: (filters) => dispatch(fetchCarsAvailability(filters)),
    };
};

const mapStateToProps = (state) => {
    return {
        loadingCar: state.car.loading,
        car: state.car.current,
        availability: state.car.availability,

        loadingReservations: state.car.loading,
        reservations: state.reservation.data,
        meta: state.car.meta,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(CarDetail));