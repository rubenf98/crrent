import React, { useState } from 'react'
import styled, { withTheme, keyframes } from "styled-components";
import { DoorsIcon, GasIcon, PeopleIcon, ShiftIcon, PlaceIcon, FlightIcon, AirIcon } from '../../../icons';
import { maxWidthStyle } from '../../styles';
import { Col, DatePicker, Divider, Form, Input, Radio, Row, Select, Space } from 'antd';
import { dimensions } from '../../helper';
import { connect } from 'react-redux';
import moment from "moment";
import { isDateDisabled } from '../../functions';

const stretch = keyframes`
  from {
    width: 40%;
    right: 40%;
  }

  to {
    width: 140%;
    right: 40%;
  }
`;

const Container = styled.section`
    position: relative;
    padding: 0px 0px;
    box-sizing: border-box;
    

    input::placeholder, .ant-picker-input > input::placeholder {
        color: black;
        opacity: .6;
        font-weight: 400;
        text-transform: uppercase;
        font-size: 16px;
    }

    .ant-input-prefix {
        width: 23px;
        height: 25px;
        opacity: .3;
    }
`;

const Content = styled.div`
    ${maxWidthStyle}
    display: flex;
    justify-content: space-between;

    @media (max-width: ${dimensions.md}) {
        padding: 0px;
    }
`;

const Car = styled.div`
    width: 50%;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
        width: 90%;
        height: auto;

        @media (max-width: ${dimensions.md}) {
            width: 100%;
        }
    }
`;

const Background = styled.div`
    top: 0;
    animation: ${stretch} 1s ease-in-out forwards;
    position: absolute;
    height: 100%;
    z-index: -1;
    background-color: ${props => props.background};
`;

const Info = styled.div`
    width: 50%;

    @media (max-width: ${dimensions.md}) {
        padding-left: 20px;
        box-sizing: border-box;
    }

    h2 {
        font-size: 36px;
        font-weight: 700;
        margin-bottom: 50px;
    }

    @media (max-width: ${dimensions.lg}) {
        h2 {
            font-size: 18px;
        }
    }
`;

const IconContainer = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
    gap: 35px;
    margin: 20px 0px 60px 0px;

    .border {
        border: 2px solid;
        border-color: ${props => props.border}; 
    }

    @media (max-width: ${dimensions.md}) {
        margin: 20px 0px 0px 0px;
    }
`;


const Icon = styled.div`
    width: 65px;
    height: 65px;

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
        margin: 15px 0px;
    }

    svg {
        width: 100%;
        height: 100%;
    }

    @media (max-width: ${dimensions.md}) {
        width: 50px;
        height: 50px;

        p {
            margin: 5px 0px 10px 0px;
        }
    }
`;

const StyledInput = styled(Input)`
    width: 100%;
    padding: 15px;
    box-sizing: border-box;
    border: 1px solid rgba(0,0,0,.4);

    input {
        padding-left: 25px !important;
    }

    @media (max-width: ${dimensions.md}) {
        margin: 10px 0px;
    }
`;

const StyledSelect = styled(Select)`
    width: 50%;
    padding: 15px;
    box-sizing: border-box;
    border: 1px solid rgba(0,0,0,.4);
    font-size: 16px;

    .ant-select-selector {
        padding: 0px !important;
    }

    .ant-select-selection-placeholder, .ant-select-selection-item {
        background-image: url("/icon/place.svg");
        background-repeat: no-repeat;
        background-size: 23px 25px;
        text-indent: 50px;
        padding-left: 30px;
        box-sizing: border-box;
    }

    .ant-select-selection-placeholder {
        color: black;
        opacity: .6;
        font-weight: 400;
        text-transform: uppercase;
        font-size: 16px;
    }
`;


const RangePicker = styled(DatePicker.RangePicker)`
    width: 100%;
    padding: 15px;
    box-sizing: border-box;
    border: 1px solid rgba(0,0,0,.4);

    .ant-picker-input {
        background-image: url("/icon/calendar.svg");
        background-repeat: no-repeat;
        background-size: 23px 25px;
        text-indent: 20px;
        padding-left: 50px;
        box-sizing: border-box;
    }



    @media (max-width: ${dimensions.md}) {
        margin: 10px 0px;
    }
`;

const DesktopContainer = styled(Row)`

    @media (max-width: ${dimensions.md}) {
        display: none;
    }
`;

const MobileContainer = styled.div`
    margin-top: 50px;

    @media (min-width: ${dimensions.md}) {
        display: none;
    }
`;

const AddButton = styled.button`
    background-color: transparent;
    border: 0px;
    margin-left: auto;

    img {
        width: 20px;
        margin: auto;
        display: block;
        cursor: ${props => props.active ? "pointer" : "default"};
        opacity: ${props => props.active ? "1" : ".3"};
    }
    
`;

const rules = {
    date: [{ required: true, message: 'Please input the reservation date!' }],
    place: [{ required: true, message: 'Please input the pickup and return place!' }],
    flight: [{ required: true }],
};


function GeneralInfo({ text, theme, car, handleDateChange, form, extras, tax, setTax,
    taxPrice,
    setTaxPrice, blockedDates }) {
    const [customPickup, setCustomPickup] = useState(undefined);
    const [customPickupTax, setCustomPickupTax] = useState(undefined);
    const [customReturn, setCustomReturn] = useState(undefined);
    const [customReturnTax, setCustomReturnTax] = useState(undefined);

    const [dates, setDates] = useState(null);

    var pickupCondition = customPickup != undefined && customPickup != "" && customPickupTax;
    var returnCondition = customReturn != undefined && customReturn != "" && customReturnTax;

    function returnID(itemName) {
        var id = undefined;

        if (itemName == "pickup_place")
            id = 5;
        else
            id = 7;

        return id;
    }

    const handleCustomPlace = (itemName, value, condition) => {
        if (condition) {
            var newEntry = {};
            newEntry[itemName] = value;
            form.setFieldsValue(newEntry);

            var id = returnID(itemName);

            if (condition == 2) {
                if (!tax.includes(id)) {
                    var price = extras.find(e => e.id === id).price;

                    setTax([...tax, id]);
                    setTaxPrice(taxPrice + price);
                }
            } else {
                if (tax.includes(id)) {
                    var price = extras.find(e => e.id === id).price;
                    const index = tax.indexOf(id);

                    var taxCopy = [...tax];
                    taxCopy.splice(index, 1);

                    setTax(taxCopy);
                    setTaxPrice(taxPrice - price);
                }
            }
        }
    }

    const handlePlaceSelection = (itemName) => {
        var id = returnID(itemName);

        if (tax.includes(id)) {
            var price = extras.find(e => e.id === id).price;
            const index = tax.indexOf(id);

            var taxCopy = [...tax];
            taxCopy.splice(index, 1);

            setTax(taxCopy);
            setTaxPrice(taxPrice - price);
        }
    }

    const handleDateReset = (isOpen) => {
        if (isOpen) {
            if (dates && (dates[0] && dates[1])) {
                setDates(null);
            }
        }
        else {
            setDates(null);
        }
    }


    return (
        <Container>

            <Content>
                <Car>
                    <Background background={theme.levels[car.level.code]} />
                    <img src={car.image} alt={car.title} />
                </Car>
                <Info>
                    <h2>{car.title}</h2>

                    <IconContainer border={theme.primary}>
                        <Icon><div className='border'><ShiftIcon /></div> <p>{text.descriptions[car.shift_mode]}</p></Icon>
                        <Icon><div className='border'><GasIcon /></div> <p>{text.descriptions[car.gas]}</p></Icon>
                        <Icon><div className='border'><PeopleIcon /></div> <p>{car.people}</p></Icon>
                        <Icon><div className='border'><DoorsIcon /></div> <p>{car.doors}</p></Icon>
                        {car.air ? <Icon><div className='border'><AirIcon /></div> <p></p></Icon> : <></>}
                    </IconContainer>
                    <DesktopContainer>
                        <Col xs={24} md={24}>
                            <Form.Item name="date" rules={rules.date}>
                                <RangePicker
                                    onChange={handleDateChange}
                                    showTime={{ format: "HH:mm", hideDisabledOptions: true }}
                                    minuteStep={15}
                                    format="DD-MM-YYYY HH:mm"
                                    placeholder={text.placeholder.date}
                                    suffixIcon={(<></>)}
                                    onOpenChange={handleDateReset}
                                    onCalendarChange={(val) => setDates(val)}
                                    disabledDate={(current) => isDateDisabled(current, blockedDates, dates, car.registration)}
                                    disabledTime={(endDate, type) => ({
                                        disabledHours: () => {
                                            if (type == "end" && dates && endDate) {
                                                var tooEarly = dates[0] && moment(endDate).diff(dates[0], 'days') == 1;

                                                var hour = 0;
                                                var blocked = [];
                                                var initHour = dates[0].hour();

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
                                />
                            </Form.Item>
                        </Col>

                        <Col xs={24} md={24}>
                            <Form.Item name="pickup_place" rules={rules.place}>
                                <StyledSelect onChange={() => handlePlaceSelection("pickup_place")} bordered={false} dropdownRender={(menu) => (
                                    <>
                                        {menu}
                                        <Divider style={{ margin: '12px 0' }} />
                                        <Row type="flex" align="middle" gutter={16} style={{ padding: '0 10px 6px' }}>
                                            <Col span={12}>
                                                <Input onChange={(e) => setCustomPickup(e.target.value)} value={customPickup} size="large" placeholder={text.placeholder.pickup_place.placeholder} />
                                            </Col>
                                            <Col span={10}>
                                                <Radio.Group onChange={(e) => setCustomPickupTax(e.target.value)} value={customPickupTax}>
                                                    <Radio value={1}>Funchal</Radio>
                                                    <Radio value={2}>{text.placeholder.pickup_place.tax} Funchal</Radio>
                                                </Radio.Group>
                                            </Col>
                                            <Col span={2}>
                                                <AddButton active={pickupCondition} type="text" onClick={(e) => handleCustomPlace("pickup_place", customPickup, pickupCondition)}>
                                                    <img alt="add" src="/icon/add_black.svg" />
                                                </AddButton>
                                            </Col>
                                        </Row>
                                    </>
                                )} placeholder={text.placeholder.pickup_place.label}>
                                    <Select.Option value="aeroporto">{text.placeholder.pickup_place.options[0]}</Select.Option>
                                    <Select.Option value="loja">{text.placeholder.pickup_place.options[1]}</Select.Option>
                                </StyledSelect>
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={24}>
                            <Form.Item name="return_place" rules={rules.place}>
                                <StyledSelect onChange={() => handlePlaceSelection("return_place")} bordered={false} dropdownRender={(menu) => (
                                    <>
                                        {menu}
                                        <Divider style={{ margin: '12px 0' }} />
                                        <Row type="flex" align="middle" gutter={16} style={{ padding: '0 10px 6px' }}>
                                            <Col span={12}>
                                                <Input onChange={(e) => setCustomReturn(e.target.value)} value={customReturn} size="large" placeholder={text.placeholder.return_place.placeholder} />
                                            </Col>
                                            <Col span={10}>
                                                <Radio.Group onChange={(e) => setCustomReturnTax(e.target.value)} value={customReturnTax}>
                                                    <Radio value={1}>Funchal</Radio>
                                                    <Radio value={2}>{text.placeholder.return_place.tax} Funchal</Radio>
                                                </Radio.Group>
                                            </Col>
                                            <Col span={2}>
                                                <AddButton active={returnCondition} type="text" onClick={(e) => handleCustomPlace("return_place", customReturn, returnCondition)}>
                                                    <img alt="add" src="/icon/add_black.svg" />
                                                </AddButton>
                                            </Col>
                                        </Row>
                                    </>
                                )} placeholder={text.placeholder.return_place.label}>
                                    <Select.Option value="aeroporto">{text.placeholder.return_place.options[0]}</Select.Option>
                                    <Select.Option value="loja">{text.placeholder.return_place.options[1]}</Select.Option>
                                </StyledSelect>
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={24}>
                            <Form.Item name="flight" rules={rules.flight}>
                                <StyledInput prefix={<FlightIcon />} size="large" placeholder='Número de Voo' />
                            </Form.Item>
                        </Col>
                    </DesktopContainer>
                </Info>


            </Content >
            <MobileContainer>
                <Col xs={24} md={24}>
                    <Form.Item name="date" rules={rules.name}>
                        <RangePicker showTime={{
                            format: "HH:mm"
                        }}
                            format="DD-MM-YYYY HH:mm"
                            placeholder={text.placeholder.date}
                            suffixIcon={(<></>)}
                        />
                    </Form.Item>
                </Col>
                <Col xs={24} md={24}>
                    <Form.Item name="pickup_place" rules={rules.place}>
                        <StyledSelect bordered={false} dropdownRender={(menu) => (
                            <>
                                {menu}
                                <Divider style={{ margin: '12px 0' }} />
                                <Row type="flex" align="middle" gutter={16} style={{ padding: '0 10px 6px' }}>
                                    <Col span={12}>
                                        <Input size="large" placeholder={text.placeholder.pickup_place.placeholder} />
                                    </Col>
                                    <Col span={10}>
                                        <Radio.Group >
                                            <Radio value={1}>Funchal</Radio>
                                            <Radio value={2}>{text.placeholder.pickup_place.tax} Funchal</Radio>
                                        </Radio.Group>
                                    </Col>
                                    <Col span={2}>
                                        <AddButton type="text" onClick={(e) => handleCustomPlace("pickup_place", e)}>
                                            <img alt="add" src="/icon/add_black.svg" />
                                        </AddButton>
                                    </Col>
                                </Row>
                            </>
                        )} placeholder={text.placeholder.pickup_place.label}>
                            <Select.Option value="aeroporto">{text.placeholder.pickup_place.options[0]}</Select.Option>
                            <Select.Option value="loja">{text.placeholder.pickup_place.options[1]}</Select.Option>
                        </StyledSelect>
                    </Form.Item>
                </Col>
                <Col xs={24} md={24}>
                    <Form.Item name="pickup_place" rules={rules.place}>
                        <StyledSelect bordered={false} dropdownRender={(menu) => (
                            <>
                                {menu}
                                <Divider style={{ margin: '12px 0' }} />
                                <Space style={{ padding: '0 10px 6px' }}>
                                    <StyledInput placeholder={text.placeholder.return_place.placeholder} />
                                    <Radio.Group >
                                        <Radio value={1}>Funchal</Radio>
                                        <Radio value={2}>{text.placeholder.return_place.tax} Funchal</Radio>
                                    </Radio.Group>
                                    <AddButton type="text" onClick={() => setSelected(true)}>
                                        <img alt="add" src="/icon/add_black.svg" />
                                    </AddButton>
                                </Space>
                            </>
                        )} placeholder={text.placeholder.return_place.label}>
                            <Select.Option value="aeroporto">{text.placeholder.return_place.options[0]}</Select.Option>
                            <Select.Option value="loja">{text.placeholder.return_place.options[1]}</Select.Option>
                        </StyledSelect>
                    </Form.Item>
                </Col>
                <Col xs={24} md={24}>
                    <Form.Item name="flight" rules={rules.name}>
                        <StyledInput prefix={<FlightIcon />} size="large" placeholder={text.placeholder.flight} />
                    </Form.Item>
                </Col>
            </MobileContainer>
        </Container >
    )
}

const mapStateToProps = (state) => {
    return {
        extras: state.extra.data,
        blockedDates: state.block.selector
    };
};

export default connect(mapStateToProps, null)(withTheme(GeneralInfo));