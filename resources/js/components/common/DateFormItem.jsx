import React, { useState } from 'react'
import { DatePicker } from 'antd';
import styled from "styled-components";
import { dimensions } from '../helper';
import moment from "moment";
import { connect } from 'react-redux';
import { isDateDisabled } from '../functions';

const RangePicker = styled(DatePicker.RangePicker)`
    width: 50%;
    margin: 0px;
    padding: 20px;
    box-sizing: border-box;
    -webkit-box-shadow: -8px 0px 20px 0px #0000002f; 
    box-shadow: -8px 0px 20px 0px #0000002f;

    .ant-picker-input {
        background-image: url("/icon/calendar.svg");
        background-repeat: no-repeat;
        background-size: 23px 25px;
        text-indent: 20px;
        padding-left: 50px;
        box-sizing: border-box;
    }
    .ant-picker-input > input::placeholder {
        color: black;
        opacity: .8;
        font-weight: 400;
        text-transform: uppercase;
        font-size: 18px;
    }

    @media (max-width: ${dimensions.lg}) {
        padding: 10px;
        flex: 1;

    }

    @media (max-width: ${dimensions.md}) {
        padding: 10px;
        flex: 1;

        .ant-picker-input {
            background-image: none;
            text-indent: 0px;
            padding-left: 0px;
        }

        .ant-picker-input > input::placeholder {
            font-size: 14px;
        }
    }
`;


function DateFormItem({ setDates, dates, text, blockedDates }) {
    const [currentDates, setCurrentDates] = useState(null);

    const onBlur = (e) => {
        if (e.target.placeholder && e.target.value) {
            var dateCopy = [...dates];

            if (e.target.placeholder == "data levantamento" || e.target.placeholder == "pickup date") {
                setDates([moment(e.target.value), dateCopy[1]]);
                setCurrentDates([moment(e.target.value), dateCopy[1]]);
            }
            else if (e.target.placeholder == "data devolução" || e.target.placeholder == "return date") {
                setDates([dateCopy[0], moment(e.target.value)]);
                setCurrentDates([dateCopy[0], moment(e.target.value)]);
            }
        }
    };

    const handleDateReset = (isOpen, a) => {
        if (isOpen) {
            if (currentDates && (currentDates[0] && currentDates[1])) {
                setCurrentDates(null);
                setDates([undefined, undefined]);
            }
        }
        else {
            setCurrentDates(null);
        }
    }


    return (
        <RangePicker
            onBlur={onBlur}
            onOpenChange={handleDateReset}
            showTime={{ format: "HH:mm", hideDisabledOptions: true }}
            minuteStep={30}
            onChange={(e) => setDates(e)}
            onCalendarChange={(val) => setCurrentDates(val)}
            format="YYYY-MM-DD HH:mm"
            placeholder={text.placeholder}
            suffixIcon={(<></>)}
            disabledDate={(current) => isDateDisabled(current, blockedDates, currentDates)}
            disabledTime={(endDate, type) => ({
                disabledHours: () => {
                    if (type == "end" && currentDates && endDate) {
                        var tooEarly = currentDates[0] && moment(endDate).diff(currentDates[0], 'days') == 1;

                        var hour = 0;
                        var blocked = [];
                        var initHour = currentDates[0].hour();

                        if (tooEarly) {
                            while (hour < 24) {
                                if (hour < initHour) {
                                    blocked.push(hour);
                                }
                                hour++;
                            }
                        }

                        return blocked.concat([0, 1, 2, 3, 4, 5, 6, 23])

                    }

                    return [0, 1, 2, 3, 4, 5, 6, 23];
                },

            })}
            value={dates}
        />
    )
}


const mapStateToProps = (state) => {
    return {
        blockedDates: state.block.selector
    };
};

export default connect(mapStateToProps, null)(DateFormItem);