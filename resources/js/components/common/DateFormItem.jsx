import React, { useEffect, useState } from 'react'
import { Col, DatePicker, Row, TimePicker } from 'antd';
import styled, { css } from "styled-components";
import { dimensions } from '../helper';
import moment from "moment";
import { connect } from 'react-redux';
import { isDateDisabled, isTimeDisabled } from '../functions';

const styles = css`
    height: 100%;
    width: 100%;
    margin: 0px;
    box-sizing: border-box;
    padding: 15px;
    border: 1px solid rgba(0,0,0,.4);
    font-size: 16px;

    .ant-picker-input {
        background-repeat: no-repeat;
        text-indent: 20px;
        padding-left: 40px;
        box-sizing: border-box;
    }

    .ant-picker-input > input::placeholder {
        color: black;
        opacity: .8;
        font-weight: 400;
        text-transform: uppercase;
        font-size: 14px;
    }

    @media (max-width: ${dimensions.lg}) {
        padding: 10px;
        flex: 1;

    }

    @media (max-width: ${dimensions.md}) {
        padding: 10px;
        flex: 1;

        .ant-picker-input {
            background-image: none !important;
            text-indent: 0px;
            padding-left: 0px;
        }

        .ant-picker-input > input::placeholder {
            font-size: 14px;
        }
    }
`;

const StyledDatePicker = styled(DatePicker)`
    ${styles}

    .ant-picker-input {
        background-image: url("/icon/calendar.svg");
        background-size: 22px 24px;
    }
`;

const StyledTimePicker = styled(TimePicker)`
    ${styles}

    .ant-picker-input {
        background-image: url("/icon/time.svg");
        background-size: 22px;
    }
`;


const Container = styled(Row)`
    .ant-col-md-12, .ant-col-xs-24 {
        margin-bottom: 24px;
    }
`;


function DateFormItem({ setDates, dates, text, blockedDates, width = 6, treshold = 1 }) {
    const [currentDates, setCurrentDates] = useState([undefined, undefined]);
    const [currentTimes, setCurrentTimes] = useState([undefined, undefined]);

    useEffect(() => {
        if (!currentDates[0] || !currentDates[1]) {
            var initDate = [undefined, undefined];
            var initTime = [undefined, undefined];

            if (dates[0]) {
                initDate[0] = moment(dates[0], "DD-MM-YYYY");
                initTime[0] = moment(dates[0], "HH:mm");
            }

            if (dates[1]) {
                initDate[1] = moment(dates[1], "DD-MM-YYYY");
                initTime[1] = moment(dates[1], "HH:mm");
            }

            setCurrentDates(initDate);
            setCurrentTimes(initTime);
        }
    }, [dates])

    const handleTimeChange = (e, index) => {
        if (currentDates[index]) {
            var aNewDate = [...currentDates];
            aNewDate[index].set('hour', e.hour()).set('minute', e.minute());

            if (index)
                setDates([dates[0], aNewDate[1]]);
            else setDates([aNewDate[0], dates[1]]);

        }

        if (index)
            setCurrentTimes([currentTimes[0], e]);
        else setCurrentTimes([e, currentTimes[1]]);
    }

    const handleDateChange = (e, index) => {
        if (e) {
            if (currentTimes[index]) {
                var aNewDate = [...currentTimes];
                aNewDate[index].set('year', e.year()).set('month', e.month()).set('day', e.day());

                if (index)
                    setDates([dates[0], aNewDate[1]]);
                else setDates([aNewDate[0], undefined]);
            }

            if (index)
                setCurrentDates([currentDates[0], e]);
            else setCurrentDates([e, undefined]);
        } else {

            if (index)
                setDates([dates[0], undefined]);
            else setDates([undefined, undefined]);

            if (index)
                setCurrentDates([currentDates[0], undefined]);
            else setCurrentDates([undefined, undefined]);
        }
    }

    return (
        <Container type="flex" gutter={16}>
            <Col xs={24} md={width}>
                <StyledDatePicker
                    width={width}
                    value={currentDates[0]}
                    format="DD-MM-YYYY"
                    placeholder={text[0]}
                    suffixIcon={(<></>)}
                    disabledDate={(current) => isDateDisabled(current, blockedDates, currentDates, 0, treshold)}
                    onChange={(e) => handleDateChange(e, 0)}
                />
            </Col>
            <Col xs={24} md={width}>
                <StyledTimePicker
                    width={width}
                    value={currentTimes[0]}
                    placeholder={text[1]}
                    disabledHours={() => isTimeDisabled(dates, "start")}
                    onSelect={(e) => handleTimeChange(e, 0)}
                    minuteStep={15}
                    format="HH:mm"
                    hideDisabledOptions
                />
            </Col>
            <Col xs={24} md={width}>
                <StyledDatePicker
                    width={width}
                    value={currentDates[1]}
                    format="DD-MM-YYYY"
                    placeholder={text[2]}
                    onChange={(e) => handleDateChange(e, 1)}
                    suffixIcon={(<></>)}
                    disabledDate={(current) => isDateDisabled(current, blockedDates, currentDates, 1, treshold)}
                />
            </Col>
            <Col xs={24} md={width}>
                <StyledTimePicker
                    width={width}
                    value={currentTimes[1]}
                    disabledHours={() => isTimeDisabled(dates, "end")}
                    placeholder={text[3]} onSelect={(e) => handleTimeChange(e, 1)}
                    minuteStep={15}
                    format="HH:mm"
                    hideDisabledOptions
                />
            </Col>
        </Container>
    )
}


const mapStateToProps = (state) => {
    return {
        blockedDates: state.block.selector
    };
};

export default connect(mapStateToProps, null)(DateFormItem);