import { Form, message } from 'antd';
import React, { useEffect, useState } from 'react'
import styled, { withTheme } from "styled-components";
import { dimensions, maxWidth } from '../../helper';
import { Button, maxWidthStyle } from '../../styles';
import Addons from './Addons';
import Client from './Client';
import Driver from './Driver';
import { useNavigate, useSearchParams } from 'react-router-dom'
import GeneralInfo from './GeneralInfo';
import { connect } from "react-redux";
import moment from "moment";
import { setCurrentReservation, setCurrentReservationValues } from "../../../redux/reservation/actions";
import { setCurrentPromotion } from "../../../redux/promotion/actions";
import { fetchBlocksSelector } from "../../../redux/block/actions";
import { fetchExtras } from '../../../redux/extra/actions';
import { getCarPrice, getPromotions } from '../../functions';

const Container = styled.section`
    width: 100%;
    position: relative;
    margin: auto;
    padding: 180px 0px;
    
    @media (max-width: ${maxWidth}) {
        box-sizing: border-box;
        padding: 0px 20px;
    }

    @media (max-width: ${dimensions.md}) {
        margin: 100px 0px;
    }

`;

const Title = styled.h1`
    font-size: 64px;
    text-transform: uppercase;
    font-weight: 700;
    text-align: center;
    margin: 10px auto 60px auto;

    @media (max-width: ${dimensions.md}) {
        font-size: 40px;
    }
`;

const ButtonContainer = styled.div`
    ${maxWidthStyle}
`;

const Price = styled.div`
    position: fixed;
    right: ${props => props.visible ? "0px" : "-200px"};
    transition: right .3s ease-in-out;
    top: 300px;
    padding: 10px 20px;
    box-sizing: border-box;
    max-width: 200px;
    color: white;
    z-index: 2;
    background-color: ${props => props.background};

    h3 {
        color: inherit;
        text-transform: uppercase;
        font-weight: 700;
        font-size: 20px;
        margin-bottom: 0px;
    }
    p {
        margin-top: 0px;
        font-weight: 400;
        font-size: 16px;
        opacity: .8;
    }
    .price {
        text-transform: uppercase;
        font-weight: 700;
        font-size: 40px;
        margin-bottom: 0px;
    }

    @media (max-width: ${dimensions.lg}) {
        top: auto;
        bottom: 0;

        h3 {
            font-size: 18px;
        }

        .price {
            font-size: 36px;
        }
    }
`;

function Checkout({ language, fetchExtras, theme,
    currentCar, setCurrentReservation, setCurrentReservationValues, extrasData,
    fetchBlocksSelector, promotions, currentReservation, currentErrors }) {
    const { text } = require('../../../../assets/' + language + "/checkout");

    const [form] = Form.useForm();

    const [extras, setExtras] = useState([])
    const [extraPrice, setExtraPrice] = useState(0)

    const [tax, setTax] = useState([])
    const [taxPrice, setTaxPrice] = useState(0)

    const [price, setPrice] = useState(0)

    const [days, setDays] = useState(1)

    let navigate = useNavigate();
    const [searchParams] = useSearchParams();

    useEffect(() => {
        if (!Object.values(currentCar).length) {
            navigate("/");
        } else {
            var from = searchParams.get("from");
            var to = searchParams.get("to");
            fetchExtras();
            fetchBlocksSelector(currentCar.level.id);

            if (from && to) {
                handleDate(moment(from), moment(to), true);
            }
        }
    }, [])

    useEffect(() => {
        if (Object.values(currentErrors).length) {
            let messages = [];

            Object.values(currentErrors).map(function (message) {
                messages.push(message[0])
            })
            message.error(messages.map((message) => (
                <span>{message}</span>
            )));

            handleDate(moment(currentReservation.pickup_date), moment(currentReservation.return_date), false);

            currentReservation.extras.map((element) => {
                console.log(element);
            })
        }
    }, [currentErrors])



    const onDateChange = (e) => {
        handleDate(e[0], e[1], false);
    };

    const handleDate = (from, to, initDate) => {
        var difference = moment(to).diff(moment(from), 'days');

        var factors = getPromotions(promotions, from, difference);

        if (initDate) {
            form.setFieldValue('date', [from, to])
        }
        setDays(difference);
        var value = getCarPrice(currentCar.level.prices, difference, factors);
        setPrice(value);

        var extra = extrasData.find((element) => element.id == 8);

        var response = handleTimeTax([[...tax], taxPrice], from.hour(), 8, extra.price);
        var data = handleTimeTax(response, to.hour(), 6, extra.price);

        setTax(data[0]);
        setTaxPrice(data[1]);
    };


    const handleTimeTax = (initData, time, id, value) => {
        var taxCopy = initData[0];
        var taxPriceCopy = initData[1];

        if (time >= 9 && time <= 19) {

            if (taxCopy.includes(id)) {
                const index = taxCopy.indexOf(id);
                taxCopy.splice(index, 1);
                taxPriceCopy = initData[1] - value;
            }
        } else {
            if (!taxCopy.includes(id)) {

                taxCopy.push(id)
                taxPriceCopy = initData[1] + value;
            }
        }

        return [taxCopy, taxPriceCopy]
    }


    const onFinish = () => {
        form.validateFields().then((values) => {
            setCurrentReservation({ ...values, extras: [...extras, ...tax] });

            var extraArray = [], taxArray = [];

            extrasData.map((extra) => {
                if (extras.includes(extra.id)) {
                    extraArray.push([extra.name, extra.price + "€", (extra.type == "uni" ? extra.price : (extra.price * days))])
                }

                if (tax.includes(extra.id)) {
                    taxArray.push([extra.name, extra.price + "€", extra.price])
                }
            });

            setCurrentReservationValues({
                car: [[currentCar.title, price + 15]],
                extras: extraArray,
                tax: taxArray,
            });

            navigate("/summary");
        })
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Container>

            <Title>{text.titles[0]}</Title>
            <Price visible={price} background={theme.primary}>
                <h3>total</h3>
                <p>{text.notice}</p>
                <div className='price'>
                    {price + extraPrice + taxPrice + 15}€
                </div>
            </Price>
            <Form
                form={form}
                scrollToFirstError
                name="reservation"
                layout="vertical"
                requiredMark={false}
                initialValues={currentReservation}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                {Object.values(currentCar).length &&
                    <>
                        <GeneralInfo text={text} form={form} handleDateChange={onDateChange} car={currentCar}
                            tax={tax}
                            setTax={setTax}
                            taxPrice={taxPrice}
                            setTaxPrice={setTaxPrice} />
                        <Addons text={text} days={days} extras={extras} setExtras={setExtras} extraPrice={extraPrice} setExtraPrice={setExtraPrice} />
                        <Client text={text} />
                        <Driver text={text} drivers={extras.includes(2) ? 2 : 1} />
                    </>
                }

                <ButtonContainer>
                    <Button background={theme.primary} type="primary"> {text.button} </Button>
                </ButtonContainer>
            </Form>

        </Container>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        setCurrentReservation: (data) => dispatch(setCurrentReservation(data)),
        setCurrentReservationValues: (data) => dispatch(setCurrentReservationValues(data)),
        setCurrentPromotion: (data) => dispatch(setCurrentPromotion(data)),
        fetchBlocksSelector: (level) => dispatch(fetchBlocksSelector(level)),
        fetchExtras: () => dispatch(fetchExtras()),
    };
};

const mapStateToProps = (state) => {
    return {
        currentCar: state.car.current,
        extrasData: state.extra.data,
        loadingExtras: state.extra.loading,
        promotions: state.promotion.data,
        language: state.application.language,
        currentReservation: state.reservation.current,
        currentErrors: state.reservation.errors,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(Checkout));