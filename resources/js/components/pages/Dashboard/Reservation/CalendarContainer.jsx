import { Calendar, Badge, Popover, Row, Col, Tag } from 'antd'
import React from 'react'
import moment from "moment"
import styled from "styled-components";
import CardContainer from '../Common/CardContainer';
import { connect } from 'react-redux';
import PopoverContainer from './PopoverContainer';
const dateFormat = "YYYY-MM-DD";

const Container = styled.section`
    margin-bottom: 50px;
    width: 100%;

    h1 {
        font-size: 36px;
        text-align: left;
        padding: 50px 0;
    }

    .ant-picker-calendar-date-content {
        height: 60px !important;
    }
`;

function CalendarContainer({ data, loading, handleFilters }) {

    const dateCellRender = (value) => {
        var listData = [];

        data.map((reservation) => {

            if (moment(reservation.pickup_date).isSame(value, 'day')) {
                listData.push({
                    type: 'error',
                    content: 'Levantamento (#' + reservation.id + ')',
                    reservation: reservation
                },)
            }

            if (moment(reservation.return_date).isSame(value, 'day')) {
                listData.push({
                    type: 'error',
                    content: 'Devolução (#' + reservation.id + ')',
                    reservation: reservation
                },)
            }
        })

        return (
            <div>
                {listData.map((item) => (
                    <PopoverContainer key={item.content} item={item.reservation}>
                        <p >
                            <Badge status={item.type} text={item.content} />
                        </p>
                    </PopoverContainer>
                ))}
            </div>
        );
    };

    const handlePanelChange = (date) => {
        var startDate = moment(date).startOf('month').startOf('day').subtract(5, 'days').format(dateFormat);
        var endDate = moment(date).endOf('month').endOf('day').add(10, 'days').format(dateFormat);
        handleFilters({ dates: [startDate, endDate] });
    }

    return (
        <Container>
            <CardContainer text="Calendário De Reservas">
                <Calendar onPanelChange={handlePanelChange} loading={loading} dateCellRender={dateCellRender} />
            </CardContainer>
        </Container>
    )
}

const mapStateToProps = (state) => {
    return {
        loading: state.reservation.loading,
        data: state.reservation.dataPerMonth,
    };
};

export default connect(mapStateToProps, null)(CalendarContainer);
