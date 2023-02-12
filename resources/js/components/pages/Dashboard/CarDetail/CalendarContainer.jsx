import { Calendar, Col, Badge, Popover, Row } from 'antd'
import React, { useEffect, useState } from 'react'
import moment from "moment"
import styled from "styled-components";
import CardContainer from '../Common/CardContainer';
import { connect } from 'react-redux';

const dateFormat = "YYYY-MM-DD";

const Container = styled.section`
    margin-bottom: 50px;
    padding-left: 100px;
    box-sizing: border-box;
    width: 100%;

    .ant-picker-calendar-date-value {
        display: none;
    }

    .ant-picker-cell {
        opacity: 0;
        cursor: default;
        pointer-events: none;
    }

    .ant-picker-cell-in-view {
        opacity: 1;
    }

    .empty, .full, .past, .pending {
        color: white;
    }

    .past {
        background-color: black;
    }

    .empty {
        background-color: green;
    }

    .full {
        background-color: red;
    }

    .pending {
        background-color: orange;
    }

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
        var hasActivity = "empty";

        data.map((reservation) => {
            if (value.isBetween(
                moment(reservation.pickup_date).startOf('day'),
                moment(reservation.return_date).endOf('day'),
                'day', '[]'
            )) {
                if (reservation.status == "confirmado") {
                    hasActivity = "full";
                } else hasActivity = "pending";

            }

            if (value.isBefore(moment().startOf('day'))) {
                hasActivity = "past";
            }
        })

        return (
            <div className={hasActivity}>
                {moment(value).format("DD")}
            </div>
        );
    };

    return (
        <Container>

            <Row type="flex" justify='start' gutter={16}>
                <Col span={8}>
                    <Calendar
                        defaultValue={moment().startOf('month')}
                        headerRender={() => <h3>{moment().startOf('month').format("MMMM")}</h3>}
                        dateCellRender={dateCellRender}
                        fullscreen={false}
                    />
                </Col>
                <Col span={8}>
                    <Calendar
                        defaultValue={moment().startOf('month').add(1, "months")}
                        headerRender={() => <h3>{moment().startOf('month').add(1, "months").format("MMMM")}</h3>}
                        dateCellRender={dateCellRender}
                        fullscreen={false}
                    />
                </Col>
                <Col span={8}>
                    <Calendar
                        defaultValue={moment().startOf('month').add(2, "months")}
                        headerRender={() => <h3>{moment().startOf('month').add(2, "months").format("MMMM")}</h3>}
                        dateCellRender={dateCellRender}
                        fullscreen={false}
                    />
                </Col>
            </Row>
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
