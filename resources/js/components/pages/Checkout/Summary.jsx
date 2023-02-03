import React, { useEffect, useState } from 'react'
import styled, { withTheme, keyframes, css } from "styled-components";
import { Button, maxWidthStyle, SecundaryButton } from '../../styles';
import { Checkbox, Input, DatePicker, InputNumber, Form, Row, Col, Alert, Tooltip, Spin } from 'antd';
import TitleContainer from './Common/TitleContainer';
import { dimensions, maxWidth } from '../../helper';
import { connect } from "react-redux";
import { useNavigate } from 'react-router-dom'
import { createReservation, setCurrentErrors } from '../../../redux/reservation/actions';
import moment from "moment";
import { getDaysDifference, getPriceRounded } from '../../functions';
import AlertContainer from '../../common/AlertContainer';

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


const Submit = styled(Button)`
    cursor: ${props => props.active ? "pointer" : "default"};
    opacity: ${props => props.active ? "1" : ".3"};

    .ant-spin-dot-item {
        background-color: white !important;
    }
`;

const SubmitSecundary = styled(SecundaryButton)`
    cursor: ${props => props.active ? "pointer" : "default"};
    opacity: ${props => props.active ? "1" : ".3"};
`;

export const inputStyle = css`
    width: 100%;
    padding: 15px;
    box-sizing: border-box;

    input::placeholder, .ant-picker-input > input::placeholder {
        color: black;
        opacity: .6;
        font-weight: 400;
        text-transform: uppercase;
        font-size: 16px;
    }
`;

const Container = styled.section`
    position: relative;
    padding: 0px 0px;
    box-sizing: border-box;
    padding: 180px 0px;

    @media (max-width: ${dimensions.md}) {
        padding: 150px 0px;
    }
    

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

    max-width: calc(${maxWidth} - 200px);
`;

const Car = styled.div`
    width: 50%;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;

    @media (max-width: ${dimensions.lg}) {
        width: 100%;
        padding: 30px 0px;
        margin-bottom: 80px;
    }

    img {
        width: 90%;
        height: auto;
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

    @media (max-width: ${dimensions.lg}) {
        width: 100%;
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

    
`;



const Section = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    flex-wrap: wrap;
    
    margin: 50px 0px 20px 0px;

    p, div {
        width: 30%;
    }

    .large {
        width: 39%;
    }

    .title {
        font-size: 20px;
        font-weight: 700;
        margin: 0px;
        text-transform: uppercase;
    }

    p {
        margin: 5px 0px;
        font-size: 20px;
        font-weight: 400;
        padding-right: 20px;
        box-sizing: border-box;
        
    }

    .opacity {
        opacity: .5;
        text-transform: uppercase;
    }

    @media (max-width: ${dimensions.md}) {
        margin: 20px 0px 10px 0px;

        .title, p {
            font-size: 16px;
        }
    }
`;


const Price = styled.div`
    width: 33%;
    float: right;
    box-sizing: border-box;
    color: ${props => props.color};

    h3 {
        color: inherit;
        opacity: 1;
        text-transform: uppercase;
        font-weight: 700;
        font-size: 20px;
        margin: 0px;
    }

    .price {
        text-transform: uppercase;
        font-weight: 700;
        font-size: 40px;
        margin: 0px;
    }
`;


const SummaryContainer = styled.section`
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
`;

const Back = styled.img`
    width: 30px;
    margin-bottom: 20px;
    cursor: pointer;
`;

const PolicyContainer = styled.section`
    font-weight: 400;
    font-size: 20px;
    margin: 100px 0px 50px 0px;
    display: flex;
    flex-direction: column;

    label {
        margin: 10px 0px !important;
    }

    @media (max-width: ${dimensions.md}) {
        margin: 80px 0px;
    }

    a {
        font-weight: 700;
    }
`;


const PaymentContainer = styled.section`
    padding: 30px;
    box-sizing: border-box;
    border: 2px solid;
    border-color: ${props => props.primary};
    box-shadow: 0px 0px 25px rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;

    .column {
        width: 50%;
        padding: 20px;
        box-sizing: border-box;

        @media (max-width: ${dimensions.md}) {
            width: 100%;
            padding: 0px;
        }
    }

    .right-side {
        display: flex;
        flex-direction: column;

        p {
            flex: 1;
        }

        .button-container {
            display: flex;
            justify-content: flex-end;
            align-items: center;
            gap: 20px;
        }
    }

    label {
        font-size: 20px;
        font-weight: 700;

        @media (max-width: ${dimensions.md}) {
            font-size: 16px;
        }

    }

    p {
        opacity: .5;
        text-align: right;
        width: 80%;
        margin-left: auto;

        @media (max-width: ${dimensions.lg}) {
            width: 100%;
        }

        @media (max-width: ${dimensions.md}) {
            text-align: left;
            margin: 5px 0px;
        }
    }

    button {
        margin: 10px 0px;
    }

    .info {
        margin: 20px 0px 80px auto;

        @media (max-width: ${dimensions.md}) {
            margin: 20px 0px 40px auto;

        }
    }
`;

const StyledInputNumber = styled(InputNumber)`
    ${inputStyle}
    padding: 10px;
`;

const StyledInput = styled(Input)`
    ${inputStyle}
`;


const MonthPicker = styled(DatePicker.MonthPicker)`
    ${inputStyle}
`;

const rules = {
    card_number: [{
        required: true,
        message: 'Please input your card number!',
    }],
    validity: [{
        required: true,
        message: 'Please input your card validity date!',
    }],
    cvv: [{
        required: true,
        message: 'Please input your CVV!',
    }],
};


function Summary({ language, theme, currentErrors, currentCar, values, currentReservation, createReservation, setCurrentErrors, loading }) {
    let navigate = useNavigate();
    const [price, setPrice] = useState(0);
    const [days, setDays] = useState(1);
    const [privacy, setPrivacy] = useState(false);
    const [conditions, setConditions] = useState(false);
    const [form] = Form.useForm();
    const { text } = require('../../../../assets/' + language + "/summary");

    const content = [
        { title: text.sections[0], items: values.car },
        { title: text.sections[1], items: values.insurance },
        { title: text.sections[2], items: values.extras },
        { title: text.sections[3], items: values.tax },
    ];

    useEffect(() => {
        if (!Object.values(currentCar).length) {
            navigate("/");
        } else {

            var aPrice = 0;
            content.map((section => {
                section.items.map((row) => {
                    aPrice += row[row.length - 1];
                })
            }))
            var difference = getDaysDifference(currentReservation.date[0], currentReservation.date[1]);
            setDays(difference);
            setPrice(aPrice);
            window.scrollTo(0, 0);
        }
    }, [])

    const handleSubmit = () => {
        form.validateFields().then((card_info) => {
            var data = { ...currentReservation, ...card_info };
            const dateFormat = "YYYY-MM-DD HH:mm";

            data.card_number = data.card_number.replace(/\s/g, "");

            data.date = [moment(data.date[0]).format(dateFormat), moment(data.date[1]).format(dateFormat)];

            createReservation({ ...data, car_category_id: currentCar.id }).then((response) => {
                navigate("/success");
            }).catch((errors) => {
                setCurrentErrors(errors.response.data.errors);
                var willNavigate = false;
                Object.keys(errors.response.data.errors).map((key) => {
                    if (key != "card_number" && key != "card_cvv") {
                        willNavigate = true;
                        navigate("/checkout?from=" + data.date[0] + "&to=" + data.date[1]);
                    }
                })
                if (!willNavigate) {
                    setCurrentErrors({
                        card_number: "Credit card number is not valid, please check for possible mistakes",
                        card_cvv: "The provided CVV value does not match with card number and card validity field"
                    });
                }

            });
        })

    }

    return (
        <Container>

            <Content>
                <Back onClick={() => navigate("/checkout?from=" + currentReservation.date[0].format("YYYY-MM-DD HH:mm") + "&to=" + currentReservation.date[1].format("YYYY-MM-DD HH:mm"))} src="/icon/back.svg" alt="return to checkout" />
                {Object.values(currentCar).length &&
                    <SummaryContainer>
                        <Car>
                            <Background background={currentCar.level.color} />
                            <img src={currentCar.image} alt="car" />
                        </Car>
                        <Info>
                            <TitleContainer title={text.title[0]} />
                            <h3 style={{ marginTop: "-40px" }}>{text.notice[0]} {days} {text.notice[1]}</h3>

                            {content.map((section, key) => (
                                <>
                                    {section.items &&
                                        section.items.length ?
                                        <Section>

                                            <div className='title large'>{section.title}</div>
                                            <div className='title opacity'>{key != 0 && ("€/" + (key == 3 ? "uni" : text.prices.day))}</div>
                                            <div className='title'>SUBTOTAL</div>

                                            {section.items.map((row) => (
                                                <>
                                                    <p className='large'>
                                                        {row[0]}
                                                    </p>
                                                    <p className='opacity'>
                                                        {key != 0 && row[1]}
                                                    </p>
                                                    <p>
                                                        {key == 0 ? getPriceRounded(row[1]) : getPriceRounded(row[2])}€
                                                    </p>
                                                </>
                                            ))}
                                        </Section> : <></>
                                    }
                                </>
                            ))}

                            <Price color={theme.primary}>
                                <h3>TOTAL</h3>
                                <div className='price'>
                                    {getPriceRounded(price)}€
                                </div>
                            </Price>
                        </Info>
                    </SummaryContainer>
                }
                <PolicyContainer>

                    <Checkbox checked={privacy} onChange={(e) => setPrivacy(e.target.checked)}>{text.privacy[0]} <a href="/privacy" target="_blank">{text.privacy[1]}</a></Checkbox>

                    <Checkbox checked={conditions} onChange={(e) => setConditions(e.target.checked)}>{text.conditions[0]} <a href="/conditions" target="_blank">{text.conditions[1]}</a></Checkbox>

                </PolicyContainer>

                <TitleContainer title={text.title[1]} />
                <PaymentContainer primary={theme.primary}>
                    <div className='column'>

                        <h3>{text.title[2]}</h3>
                        <Form
                            layout="vertical"
                            requiredMark={false}
                            form={form}
                        >
                            <Row>
                                <Col xs={24} md={20}>
                                    <Form.Item name="card_number" label={text.form.card_number} rules={rules.card_number}>
                                        <StyledInput placeholder='XXXX XXXX XXXX XXXX' />
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Row type="flex" gutter={16}>
                                <Col xs={24} md={10}>
                                    <Form.Item name="card_validity" label={text.form.validity} rules={rules.validity}>
                                        <MonthPicker placeholder='YYYY-MM' />
                                    </Form.Item>
                                </Col>

                                <Col xs={24} md={10}>
                                    <Form.Item name="card_cvv" label={text.form.cvv} rules={rules.cvv}>
                                        <StyledInputNumber placeholder='XXX' />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Form>
                    </div>
                    <div className='column right-side'>
                        <p className='info'>{text.info}</p>
                        <Tooltip title={text.disabled}>
                            <div className='button-container'>

                                <Submit disabled={!privacy || !conditions} active={privacy && conditions} onClick={handleSubmit} background={theme.primary}>
                                    {loading ? <Spin /> : text.button[0]}
                                </Submit>

                                {/* <Submit disabled={!privacy || !conditions} active={privacy && conditions} onClick={handleSubmit} background={theme.primary}>
                                {text.button[1]}
                            </Submit> */}
                            </div>
                        </Tooltip>
                    </div>
                </PaymentContainer>

                <AlertContainer
                    currentErrors={currentErrors}
                    title="Ocorreu os seguintes erros com a reserva"
                    onClose={() => setCurrentErrors([])}
                />

            </Content>
        </Container>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        createReservation: (data) => dispatch(createReservation(data)),
        setCurrentErrors: (data) => dispatch(setCurrentErrors(data)),
    };
};

const mapStateToProps = (state) => {
    return {
        currentCar: state.carCategory.current,
        loading: state.reservation.loading,
        values: state.reservation.values,
        currentReservation: state.reservation.current,
        language: state.application.language,
        currentErrors: state.reservation.errors,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(Summary));