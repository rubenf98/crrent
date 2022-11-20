import React, { useState } from 'react'
import { DatePicker } from 'antd';
import styled from "styled-components";
import { dimensions } from '../helper';
import moment from "moment";

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


function DateFormItem({ setDates, dates }) {
    const [currentDates, setCurrentDates] = useState(null);

    const onBlur = (e) => {
        if (e.target.placeholder && e.target.value) {
            var dateCopy = [...dates];
            if (e.target.placeholder == "data levantamento" || e.target.placeholder == "lifting date") {
                setDates([moment(e.target.value), dateCopy[1]]);
                setCurrentDates([moment(e.target.value), null])
            }
            else if (e.target.placeholder == "data devolução" || e.target.placeholder == "return date") {
                setDates([dateCopy[0], moment(e.target.value)]);
                setCurrentDates([null, moment(e.target.value)])
            }
        }
    };

    return (
        <RangePicker
            onBlur={onBlur}
            showTime={{ format: "HH:mm" }}
            minuteStep={30}
            onChange={(e) => setDates(e)}
            onCalendarChange={(val) => setCurrentDates(val)}
            format="YYYY-MM-DD HH:mm"
            placeholder={["data levantamento", "data devolução"]}
            suffixIcon={(<></>)}
            disabledDate={(current) => {
                let customDate = moment().add(1, 'days').format("YYYY-MM-DD HH:mm");
                let tooEarly = false;
                let tooLate = false
                if (currentDates) {
                    tooLate = currentDates[0] && current.diff(currentDates[0], 'days') > 365;
                    tooEarly = currentDates[0] && current.diff(currentDates[0], 'days') < 2;
                }
                return current && (current < moment(customDate, "YYYY-MM-DD HH:mm")) || (!!tooEarly || !!tooLate);
            }}
            disabledTime={() => ({
                disabledHours: () => [0, 1, 2, 3, 4, 5, 6, 23],
            })}
            value={dates}
        />
    )
}

export default DateFormItem