import React from 'react'
import styled, { withTheme, keyframes } from "styled-components";
import { DoorsIcon, GasIcon, PeopleIcon, ShiftIcon, PlaceIcon, FlightIcon } from '../../../icons';
import { Button, maxWidthStyle } from '../../styles';
import { Col, DatePicker, Form, Input, Row } from 'antd';
import { dimensions } from '../../helper';

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
        font-size: 40px;
        font-weight: 700;
        margin-bottom: 0px;
    }

    h3 {
        margin-top: 0px;
        font-size: 20px;
        font-weight: 400;
        opacity: .5;
        
    }

    @media (max-width: ${dimensions.lg}) {
        h2 {
            font-size: 18px;
        }

        h3 {
            font-size: 16px;
        }
    }
`;

const IconContainer = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
    gap: 35px;
    margin: 60px 0px;

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

const StyledInputGroup = styled(Input.Group)`
    width: 100%;
    margin: 20px 0px;
    -webkit-box-shadow: -8px 0px 30px 0px #0000002f; 
    box-shadow: -8px 0px 30px 0px #0000002f;

    .ant-input-affix-wrapper {
        border: 0px;
        padding: 20px;
        box-sizing: border-box;
    }

    input {
        padding-left: 25px !important;
    }

    @media (max-width: ${dimensions.md}) {
        margin: 10px 0px;
    }
`;


const StyledInput = styled(Input)`
    width: 100%;
    margin: 20px 0px;
    padding: 20px;
    box-sizing: border-box;
    -webkit-box-shadow: -8px 0px 30px 0px #0000002f; 
    box-shadow: -8px 0px 30px 0px #0000002f;

    input {
        padding-left: 25px !important;
    }

    @media (max-width: ${dimensions.md}) {
        margin: 10px 0px;
    }
`;


const RangePicker = styled(DatePicker.RangePicker)`
    width: 100%;
    margin: 20px 0px;
    padding: 20px;
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

const rules = {
    name: [{
        required: false,
        message: 'Please input your fullname!',
    }],
};


function GeneralInfo({ theme }) {
    const current = { id: 1, level: "A", image: "/image/garage/template.png", title: "Peugeot 308", subtitle: "Allure", price: 30 };


    return (
        <Container>

            <Content>
                <Car>
                    <Background background={theme.levels[current.level]} />
                    <img src={current.image} alt="" />
                </Car>
                <Info>
                    <h2>{current.title}</h2>
                    <h3>{current.subtitle}</h3>
                    <IconContainer border={theme.primary}>
                        <Icon><div className='border'><ShiftIcon /></div> <p>Manual</p></Icon>
                        <Icon><div className='border'><GasIcon /></div> <p>Gasolina</p></Icon>
                        <Icon><div className='border'><PeopleIcon /></div> <p>5</p></Icon>
                        <Icon><div className='border'><DoorsIcon /></div> <p>5</p></Icon>
                    </IconContainer>
                    <DesktopContainer>
                        <Col xs={24} md={24}>
                            <Form.Item name="date" rules={rules.name}>
                                <RangePicker showTime={{
                                    format: "HH:mm"
                                }}
                                    format="YYYY-MM-DD HH:mm"
                                    placeholder={["data levantamento", "data devolução"]}
                                    suffixIcon={(<></>)}
                                />
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={24}>
                            <Form.Item name="pickup" rules={rules.name}>
                                <StyledInputGroup size="large">
                                    <Row>
                                        <Col span={12}>
                                            <Input prefix={<PlaceIcon />} placeholder='Local Levantamento' />
                                        </Col>
                                        <Col span={12}>
                                            <Input prefix={<PlaceIcon />} placeholder='Local Devolução' />
                                        </Col>
                                    </Row>
                                </StyledInputGroup>
                            </Form.Item>
                        </Col>
                        <Col xs={24} md={24}>
                            <Form.Item name="flight" rules={rules.name}>
                                <StyledInput prefix={<FlightIcon />} size="large" placeholder='Número de Voo' />
                            </Form.Item>
                        </Col>
                    </DesktopContainer>
                </Info>


            </Content>
            <MobileContainer>
                <Col xs={24} md={24}>
                    <Form.Item name="date" rules={rules.name}>
                        <RangePicker showTime={{
                            format: "HH:mm"
                        }}
                            format="YYYY-MM-DD HH:mm"
                            placeholder={["data levantamento", "data devolução"]}
                            suffixIcon={(<></>)}
                        />
                    </Form.Item>
                </Col>
                <Col xs={24} md={24}>
                    <Form.Item name="pickup" rules={rules.name}>
                        <StyledInputGroup size="large">
                            <Row>
                                <Col span={12}>
                                    <Input prefix={<PlaceIcon />} placeholder='Local Levantamento' />
                                </Col>
                                <Col span={12}>
                                    <Input prefix={<PlaceIcon />} placeholder='Local Devolução' />
                                </Col>
                            </Row>
                        </StyledInputGroup>
                    </Form.Item>
                </Col>
                <Col xs={24} md={24}>
                    <Form.Item name="flight" rules={rules.name}>
                        <StyledInput prefix={<FlightIcon />} size="large" placeholder='Número de Voo' />
                    </Form.Item>
                </Col>
            </MobileContainer>
        </Container>
    )
}

export default withTheme(GeneralInfo)