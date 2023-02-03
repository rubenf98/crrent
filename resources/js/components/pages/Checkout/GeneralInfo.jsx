import React, { useState, useEffect } from 'react'
import styled, { withTheme, keyframes } from "styled-components";
import { FlightIcon } from '../../../icons';
import { maxWidthStyle } from '../../styles';
import { fetchLocalizations } from '../../../redux/localization/actions';
import { Col, DatePicker, Divider, Form, Input, Radio, Row, Select, Space } from 'antd';
import { dimensions } from '../../helper';
import { connect } from 'react-redux';
import moment from "moment";
import DateFormItem from '../../common/DateFormItem';

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

    img {
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

function GeneralInfo(props) {
    const [customPickup, setCustomPickup] = useState(undefined);
    const [customPickupTax, setCustomPickupTax] = useState(undefined);
    const [customReturn, setCustomReturn] = useState(undefined);
    const [customReturnTax, setCustomReturnTax] = useState(undefined);
    const [mandatory, setMandatory] = useState(true)


    const { text, theme, car, form, language, localization,
        localizationPrice, dates, setDates, localizations } = props;

    const rules = {
        date: [{ required: true, message: 'Please input the reservation date!' }],
        place: [{ required: true, message: 'Please input the pickup and return place!' }],
        flight: [{ required: mandatory }],
    };

    var pickupCondition = customPickup != undefined && customPickup != "" && customPickupTax;
    var returnCondition = customReturn != undefined && customReturn != "" && customReturnTax;

    useEffect(() => {
        props.fetchLocalizations();
    }, [])


    function returnIndex(itemName) {
        return itemName == "pickup_place" ? 0 : 1;
    }

    function returnLocalization(id) {
        return localizations.find(item => item.id === id);
    }


    const updateState = (id, index, itemName, customValue = undefined) => {
        var currentLocalization = localizations.find(item => item.id === id);


        var localizationCopy = [...localization];
        localizationCopy[index] = currentLocalization.id;

        var localizationPriceCopy = [...localizationPrice];
        localizationPriceCopy[index] = currentLocalization.price;

        var newEntry = {};
        newEntry[itemName] = customValue ? customValue : currentLocalization.name.pt;
        form.setFieldsValue(newEntry);

        props.setLocalization(localizationCopy);
        props.setLocalizationPrice(localizationPriceCopy);
    }

    const handleCustomPlace = (itemName, stringValue, idValue, condition) => {
        if (condition) {

            var index = returnIndex(itemName);
            var newEntry = {};
            newEntry[itemName] = stringValue;
            form.setFieldsValue(newEntry);

            updateState(idValue, index, itemName, stringValue);
        }
    }

    const handlePlaceSelection = (itemName, e) => {
        var index = returnIndex(itemName);
        if (itemName === "pickup_place") {
            if (e === "Loja") {
                setMandatory(false);
            } else {
                setMandatory(true);
            }
        }

        updateState(e, index, itemName);
    }

    return (
        <Container>

            <Content>
                <Car>
                    <Background background={car.level.color} />
                    <img src={car.image} alt={car.title} />
                </Car>
                <Info>
                    <h2>{car.title}</h2>

                    <IconContainer border={theme.primary}>
                        {car.charateristics.map((charateristic) => (
                            <Icon>
                                <div className='border'>
                                    <img src={charateristic.icon} />
                                </div>
                                <p>{charateristic.pivot.value}</p>
                            </Icon>
                        ))}
                    </IconContainer>
                    <DesktopContainer>
                        <DateFormItem
                            width={12}
                            text={text.placeholder.date}
                            dates={dates}
                            setDates={setDates}
                            treshold={car.available_cars}
                        />

                        <Col xs={24} md={24}>
                            <Form.Item name="pickup_place" rules={rules.place}>
                                <StyledSelect onChange={(e) => handlePlaceSelection("pickup_place", e)} bordered={false} dropdownRender={(menu) => (
                                    <>
                                        {menu}
                                        <Divider style={{ margin: '12px 0' }} />
                                        <Row type="flex" align="middle" gutter={16} style={{ padding: '0 10px 6px' }}>
                                            <Col span={12}>
                                                <Input onChange={(e) => setCustomPickup(e.target.value)} value={customPickup} size="large" placeholder={text.placeholder.pickup_place.placeholder} />
                                            </Col>
                                            <Col span={10}>
                                                <Radio.Group onChange={(e) => setCustomPickupTax(e.target.value)} value={customPickupTax}>
                                                    {localizations.map((localization) => {
                                                        return !localization.visible && <Radio value={localization.id}>{localization.name[language]}</Radio>
                                                    })}
                                                </Radio.Group>
                                            </Col>
                                            <Col span={2}>
                                                <AddButton active={pickupCondition} type="text" onClick={(e) => handleCustomPlace("pickup_place", customPickup, customPickupTax, pickupCondition)}>
                                                    <img alt="add" src="/icon/add_black.svg" />
                                                </AddButton>
                                            </Col>
                                        </Row>
                                    </>
                                )} placeholder={text.placeholder.pickup_place.label}>
                                    {localizations.map((localization) => {
                                        return localization.visible && <Select.Option key={localization.id} value={localization.id}>{localization.name[language]} (+{localization.price}€)</Select.Option>
                                    })}
                                </StyledSelect>
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={24}>
                            <Form.Item name="return_place" rules={rules.place}>
                                <StyledSelect onChange={(e) => handlePlaceSelection("return_place", e)} bordered={false} dropdownRender={(menu) => (
                                    <>
                                        {menu}
                                        <Divider style={{ margin: '12px 0' }} />
                                        <Row type="flex" align="middle" gutter={16} style={{ padding: '0 10px 6px' }}>
                                            <Col span={12}>
                                                <Input onChange={(e) => setCustomReturn(e.target.value)} value={customReturn} size="large" placeholder={text.placeholder.return_place.placeholder} />
                                            </Col>
                                            <Col span={10}>
                                                <Radio.Group onChange={(e) => setCustomReturnTax(e.target.value)} value={customReturnTax}>
                                                    {localizations.map((localization) => {
                                                        return !localization.visible && <Radio value={localization.id}>{localization.name[language]}</Radio>
                                                    })}
                                                </Radio.Group>
                                            </Col>
                                            <Col span={2}>
                                                <AddButton active={returnCondition} type="text" onClick={(e) => handleCustomPlace("return_place", customReturn, customReturnTax, returnCondition)}>
                                                    <img alt="add" src="/icon/add_black.svg" />
                                                </AddButton>
                                            </Col>
                                        </Row>
                                    </>
                                )} placeholder={text.placeholder.return_place.label}>
                                    {localizations.map((localization) => {
                                        return localization.visible && <Select.Option key={localization.id} value={localization.id}>{localization.name[language]} (+{localization.price}€)</Select.Option>
                                    })}
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
                <DateFormItem
                    width={24}
                    text={text.placeholder.date}
                    dates={dates}
                    setDates={setDates}
                    treshold={car.treshold}
                />
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
                                            {localizations.map((localization) => (
                                                <Radio value={localization.id}>{localization.name[language]}</Radio>
                                            ))}
                                        </Radio.Group>
                                    </Col>
                                    <Col span={2}>
                                        <AddButton type="text" onClick={(e) => handleCustomPlace("pickup_place", customPickup, customPickupTax, pickupCondition)}>
                                            <img alt="add" src="/icon/add_black.svg" />
                                        </AddButton>
                                    </Col>
                                </Row>
                            </>
                        )} placeholder={text.placeholder.pickup_place.label}>
                            {localizations.map((localization) => (
                                <Select.Option key={localization.id} value={localization.name.pt}>{localization.name[language]}</Select.Option>
                            ))}

                            <Select.Option value="loja">{text.placeholder.pickup_place.options[1]}</Select.Option>
                        </StyledSelect>
                    </Form.Item>
                </Col>
                <Col xs={24} md={24}>
                    <Form.Item name="return_place" rules={rules.place}>
                        <StyledSelect bordered={false} dropdownRender={(menu) => (
                            <>
                                {menu}
                                <Divider style={{ margin: '12px 0' }} />
                                <Space style={{ padding: '0 10px 6px' }}>
                                    <StyledInput placeholder={text.placeholder.return_place.placeholder} />
                                    <Radio.Group >
                                        {localizations.map((localization) => (
                                            <Radio value={localization.id}>{localization.name[language]}</Radio>
                                        ))}
                                    </Radio.Group>
                                    <AddButton type="text" onClick={(e) => handleCustomPlace("return_place", customReturn, customReturnTax, pickupCondition)}>
                                        <img alt="add" src="/icon/add_black.svg" />
                                    </AddButton>
                                </Space>
                            </>
                        )} placeholder={text.placeholder.return_place.label}>
                            {localizations.map((localization) => (
                                <Select.Option key={localization.id} value={localization.name.pt}>{localization.name[language]}</Select.Option>
                            ))}
                        </StyledSelect>
                    </Form.Item>
                </Col>
                <Col xs={24} md={24}>
                    <Form.Item name="flight">
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
        blockedDates: state.block.selector,
        language: state.application.language,
        localizations: state.localization.data,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchLocalizations: () => dispatch(fetchLocalizations()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(GeneralInfo));