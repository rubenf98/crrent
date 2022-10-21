import React from 'react'
import { DatePicker } from 'antd';
import styled from "styled-components";

const RangePicker = styled(DatePicker.RangePicker)`
    width: 50%;
    margin: 0px;
    padding: 25px;
    box-sizing: border-box;
    -webkit-box-shadow: -8px 0px 30px 0px #0000002f; 
    box-shadow: -8px 0px 30px 0px #0000002f;

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
        font-size: 20px;
    }
`;


function DateFormItem({ setDates, dates }) {

    const onBlur = (e) => {
        if (e.target.placeholder && e.target.value) {
            var dateCopy = [...dates];
            if (e.target.placeholder == "data levantamento" || e.target.placeholder == "lifting date") {
                setDates([e.target.value, dateCopy[1]]);
            }
            else if (e.target.placeholder == "data devolução" || e.target.placeholder == "return date") {
                setDates([dateCopy[0], e.target.value]);
            }
        }
    };

    return (
        <RangePicker
            onBlur={onBlur}
            showTime={{ format: "HH:mm" }}
            minuteStep={30}
            onChange={(e) => setDates(e)}
            format="YYYY-MM-DD HH:mm"
            placeholder={["data levantamento", "data devolução"]}
            suffixIcon={(<></>)}
        />
    )
}

export default DateFormItem