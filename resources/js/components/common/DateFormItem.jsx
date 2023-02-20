import React, { useEffect, useState } from 'react'
import { Col, DatePicker, Row, Select, TimePicker } from 'antd';
import styled, { css } from "styled-components";
import { dimensions } from '../helper';
import moment from "moment";
import { connect } from 'react-redux';
import { isDateDisabled } from '../functions';
import { replace } from 'lodash';

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

const StyledTimePicker = styled(Select)`
    height: 100% !important;
    width: 100% !important;
    border: 1px solid rgba(0,0,0,.4) !important;

    .ant-select-selector {
        height: 100% !important;
        width: 100% !important;
        margin: 0px;
        box-sizing: border-box;
        padding: 15px !important;
        border: 0px  !important; 
        font-size: 16px;
        

        .ant-select-selection-item, .ant-select-selection-placeholder {
            background-repeat: no-repeat;
            text-indent: 15px !important;
            padding-left: 20px !important;
            box-sizing: border-box !important;
            background-image: url("/icon/time.svg") !important;
            background-size: 22px !important;
            height: 100% !important;
            display: flex !important;
            align-items: center !important;
            background-position-y: 50% !important;
            text-transform: uppercase;
            color: black;
            opacity: .8;
            font-weight: 400;
            text-transform: uppercase;
            font-size: 14px;
        }

        
    }

    

`;


const Container = styled(Row)`
    .ant-col-md-12, .ant-col-xs-24 {
        margin-bottom: 24px;
    }
`;
const timeOptions = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];

function DateFormItem({ enableReservations, globalParameters, setDates, dates, text, blockedDates, hours, width = 6, treshold = 1 }) {
    const [currentDates, setCurrentDates] = useState([undefined, undefined]);
    const [currentTimes, setCurrentTimes] = useState([undefined, undefined]);
    const [currentTimeValues, setCurrentTimeValues] = useState([undefined, undefined]);
    const [timeTreshold, setTimeTreshold] = useState([0, 0]);
    const [maxDaysReservation, setMaxDaysReservation] = useState(0);
    const [maxDateReservation, setMaxDateReservation] = useState(moment());

    useEffect(() => {
        var minTimeObject = undefined;
        var maxTimeObject = undefined;

        globalParameters.map((globalParameter) => {
            if (globalParameter.code == 'min_time') {
                minTimeObject = parseInt(globalParameter.value);
            } else if (globalParameter.code == 'max_time') {
                maxTimeObject = parseInt(globalParameter.value);
            } else if (globalParameter.code == 'max_days') {
                setMaxDaysReservation(parseInt(globalParameter.value));
            } else if (globalParameter.code == 'max_date') {
                setMaxDateReservation(moment(globalParameter.value, "DD-MM-YYYY"));
            }
        })

        setTimeTreshold([minTimeObject, maxTimeObject]);
    }, [globalParameters])


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
            setCurrentTimeValues([initTime[0] ? initTime[0].format("HH:mm") : undefined, initTime[1] ? initTime[1].format("HH:mm") : undefined])
        }
    }, [dates])

    const handleTimeChange = (e, index) => {
        var newTime = moment("1970-01-01 " + e);

        if (currentDates[index]) {
            var aNewDate = moment(currentDates[index].format("YYYY-MM-DD") + " " + newTime.format("HH:mm"));

            if (index)
                setDates([dates[0], aNewDate]);
            else
                setDates([aNewDate, dates[1]]);
        }

        if (index) {
            setCurrentTimes([currentTimes[0], newTime]);
            setCurrentTimeValues([currentTimeValues[0], newTime.format("HH:mm")]);
        }
        else {
            setCurrentTimes([newTime, undefined]);
            setCurrentTimeValues([newTime.format("HH:mm"), undefined])
        }
    }

    const handleDateChange = (e, index) => {
        if (e) {
            if (currentTimes[index]) {
                var aNewDate = moment(e.format("YYYY-MM-DD") + " " + currentTimes[index].format("HH:mm"));

                if (index)
                    setDates([dates[0], aNewDate]);
                else
                    setDates([aNewDate, undefined]);
            }

            if (index)
                setCurrentDates([currentDates[0], e]);
            else {
                setCurrentDates([e, undefined]);
            }
        } else {

            if (index)
                setDates([dates[0], undefined]);
            else
                setDates([undefined, undefined]);

            if (index)
                setCurrentDates([currentDates[0], undefined]);
            else
                setCurrentDates([undefined, undefined]);
        }
    }
    const isTimeDisabled = (aIndex) => {
        if (currentDates[0] && currentDates[1]) {
            if (currentDates[0].isSame(currentDates[1], 'day')) {
                if (currentTimeValues[0]) {
                    return parseFloat(aIndex.replace(':', '.')) - parseFloat(currentTimeValues[0].replace(':', '.')) < hours[0];
                } else {
                    return false;
                }
            } else {
                return false;
            }

        } else {
            return false;
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
                    disabledDate={(current) => (!enableReservations && treshold) || isDateDisabled(current, blockedDates, currentDates, 0, [maxDaysReservation, maxDateReservation], treshold)}
                    onChange={(e) => handleDateChange(e, 0)}
                />
            </Col>
            <Col xs={24} md={width}>
                <StyledTimePicker width={width} value={currentTimeValues[0]} placeholder={text[1]} onChange={(e) => handleTimeChange(e, 0)}>
                    {timeOptions.map((index) => (
                        <>
                            {(index >= timeTreshold[0] && index <= timeTreshold[1]) &&
                                <>
                                    <Select.Option value={(index < 10 && '0') + index + ":00"}>
                                        {(index < 10 && '0') + index + ":00"}
                                    </Select.Option>
                                    {index < timeTreshold[1] &&
                                        <>

                                            <Select.Option value={(index < 10 && '0') + index + ":15"}>
                                                {(index < 10 && '0') + index + ":15"}
                                            </Select.Option>
                                            <Select.Option value={(index < 10 && '0') + index + ":30"}>
                                                {(index < 10 && '0') + index + ":30"}
                                            </Select.Option>
                                            <Select.Option value={(index < 10 && '0') + index + ":45"}>
                                                {(index < 10 && '0') + index + ":45"}
                                            </Select.Option>
                                        </>
                                    }
                                </>
                            }
                        </>
                    ))}
                </StyledTimePicker>
            </Col>
            <Col xs={24} md={width}>
                <StyledDatePicker
                    width={width}
                    value={currentDates[1]}
                    format="DD-MM-YYYY"
                    placeholder={text[2]}
                    onChange={(e) => handleDateChange(e, 1)}
                    suffixIcon={(<></>)}
                    disabledDate={(current) => (!enableReservations && treshold) || isDateDisabled(current, blockedDates, currentDates, 1, [maxDaysReservation, maxDateReservation], treshold)}
                />
            </Col>
            <Col xs={24} md={width}>
                <StyledTimePicker width={width} value={currentTimeValues[1]} placeholder={text[3]} onChange={(e) => handleTimeChange(e, 1)}>
                    {timeOptions.map((index) => (
                        <>
                            {
                                (index >= timeTreshold[0] && index <= timeTreshold[1]) &&
                                <>
                                    <Select.Option disabled={isTimeDisabled(index + ":00")} value={(index < 10 && '0') + index + ":00"}>
                                        {(index < 10 && '0') + index + ":00"}
                                    </Select.Option>

                                    {index < timeTreshold[1] &&
                                        <>

                                            <Select.Option disabled={isTimeDisabled(index + ":15")} value={(index < 10 && '0') + index + ":15"}>
                                                {(index < 10 && '0') + index + ":15"}
                                            </Select.Option>
                                            <Select.Option disabled={isTimeDisabled(index + ":30")} value={(index < 10 && '0') + index + ":30"}>
                                                {(index < 10 && '0') + index + ":30"}
                                            </Select.Option>
                                            <Select.Option disabled={isTimeDisabled(index + ":45")} value={(index < 10 && '0') + index + ":45"}>
                                                {(index < 10 && '0') + index + ":45"}
                                            </Select.Option>
                                        </>
                                    }
                                </>


                            }
                        </>
                    ))}
                </StyledTimePicker>
            </Col>
        </Container>
    )
}


const mapStateToProps = (state) => {
    return {
        blockedDates: state.block.selector,
        globalParameters: state.globalParameter.data,
        hours: state.globalParameter.hours,
        enableReservations: state.globalParameter.enableReservations
    };
};

export default connect(mapStateToProps, null)(DateFormItem);