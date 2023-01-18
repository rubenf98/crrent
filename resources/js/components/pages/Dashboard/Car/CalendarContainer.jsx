import { Badge, DatePicker, Row } from 'antd'
import React, { useEffect, useState } from 'react'
import moment from "moment"
import styled from "styled-components";
import CardContainer from '../Common/CardContainer';
import { connect } from 'react-redux';

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

const Calendar = styled.div`
    width: calc(100vw - 250px - 100px - 40px);
    overflow-x: scroll;
    border: 1px solid #777;

    .flex-container { 
        display: flex;
    }
`;

const CalendarItem = styled.div`
    min-width: 80px;
    height: 60px;
    background-color: ${props => props.background};
    /* border: 1px solid #777; */
    border-bottom: 1px solid #f0f0f0;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    h3, p {
        text-align: center;
        margin: 0px;
        font-size: 12px;
        width: 100%;
    }

    .value {
        color: white;
        font-weight: bold;
    }
`;

const CalendarTitle = styled.div`
    min-width:200px;
    border-bottom: 1px solid #f0f0f0;
    background-color: ${props => props.background};
    display: flex;
    align-items: center;
    justify-content: center;
    


    h4 {
        text-align: center;
        margin: 0px auto;
        opacity: .7;
        font-size: 12px;   
        font-weight: bold;
    }

    h3 {
        text-align: center;
        margin: 0px auto;
        font-size: 12px;
        overflow: hidden;
        text-overflow: ellipsis; 
        white-space: nowrap; 
        width: 200px;
    }

    h2 {
        text-align: center;
        margin: 0px auto;
    }
`;

function CalendarContainer({ data, loading, handleFilters }) {
    const [calendar, setCalendar] = useState([])
    const [date, setDate] = useState(moment())

    // useEffect(() => {
    //     const startDate = moment().startOf('month');
    //     const endDate = moment().endOf('month');

    //     handleDateChange(startDate, endDate);
    // }, [])

    function handleDateChange(startDate, endDate) {
        handleFilters({ from: startDate.format('YYYY-MM-DD'), to: endDate.format('YYYY-MM-DD') })

        let aCalendar = [];
        while (startDate < endDate) {
            aCalendar.push({ day: moment(startDate).format('D'), week: moment(startDate).format('ddd') });

            startDate.add(1, 'days');
        }
        setCalendar(aCalendar);
    }

    useEffect(() => {
        const startDate = moment(date).startOf('month');
        const endDate = moment(date).endOf('month');

        handleDateChange(startDate, endDate);
    }, [date])

    return (
        <Container>
            <CardContainer text="Calendário De Reservas">
                <Row type="flex" justify='end' style={{ marginBottom: "20px" }}>
                    <DatePicker.MonthPicker value={date} onChange={setDate} />
                </Row>
                <Calendar>
                    <div className="flex-container">
                        <CalendarTitle style={{ borderBottom: "1px solid #f0f0f0;" }} background="#fafafa" >
                            <h3>{date.format("MMMM YYYY")}</h3>
                        </CalendarTitle>
                        {calendar.map((calendarItem, index) => (
                            <CalendarItem style={{ borderBottom: "1px solid #f0f0f0;" }} key={index} background="#fafafa" >
                                <h3>{calendarItem.day}</h3>
                                <p>{calendarItem.week}</p>
                            </CalendarItem>
                        ))}
                    </div>
                    {data.map((car) => (
                        <div className="flex-container" index={"car-" + car.id}>
                            <CalendarTitle background="#fff">
                                <div>
                                    <h3>{car.title}</h3>
                                    <h4>{car.registration}</h4>
                                </div>
                            </CalendarTitle>
                            {car.availability.map((availability, index) => (
                                <CalendarItem key={'availability-' + index} background={availability ? "red" : "white"} >
                                    {/* <div className='value'>{availability ? availability : <></>}</div> */}
                                </CalendarItem>
                            ))}
                        </div>
                    ))}
                </Calendar>
            </CardContainer>
        </Container>
    )
}

const mapStateToProps = (state) => {
    return {
        loading: state.reservation.loading,
        data: state.car.availability,
    };
};

export default connect(mapStateToProps, null)(CalendarContainer);
