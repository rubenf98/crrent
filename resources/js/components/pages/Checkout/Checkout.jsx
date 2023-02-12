import { Form, Row } from 'antd';
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
import { setCurrentErrors, setCurrentReservation, setCurrentReservationValues } from "../../../redux/reservation/actions";
import { setCurrentPromotion } from "../../../redux/promotion/actions";
import { fetchBlocksSelector } from "../../../redux/block/actions";
import { fetchExtras } from '../../../redux/extra/actions';
import { getCarPrice, getPriceRounded, getPromotions, getDaysDifference } from '../../functions';
import AlertContainer from '../../common/AlertContainer';
import TitleContainer from './Common/TitleContainer';


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

    max-width: calc(${maxWidth} - 200px);
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
        font-size: 18px;
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
        font-size: 36px;
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

const PaymentContainer = styled.section`
    ${maxWidthStyle}
    margin: 120px auto;
    max-width: calc(${maxWidth} - 200px);

    @media (max-width: ${dimensions.md}) {
        padding: 0px;
    }

    .payment-flex {
        display: flex;
        gap: 30px; 
        align-items: flex-start;
    }
`;


const Payment = styled.div`
    padding: 20px;
    min-width: 150px;
    box-sizing: border-box;
    opacity: ${props => props.active ? 1 : .5};
    border: 1px solid;
    border-color: ${props => props.active ? props.border : "transparent"};
    box-shadow: 0px 4px 30px rgba(0, 0, 0, 0.15);
    cursor: pointer;
    display: flex;
    align-items: center;

    @media (max-width: ${dimensions.lg}) {
        width: 45%;
    }

    @media (max-width: ${dimensions.md}) {
        width: 100%;
    }

    h3 {
        font-size: 16px;
        text-align: center;
        flex: 1;
        padding-right: 20px;
        box-sizing: border-box;
        margin: 0px;
    }

    img {
        width: 40px;
    } 

`;

function Checkout({ language, fetchExtras, theme, localizations, timeTax, setCurrentErrors,
    currentCar, setCurrentReservation, setCurrentReservationValues, extrasData,
    fetchBlocksSelector, promotions, currentReservation, currentErrors }) {
    const { text } = require('../../../../assets/' + language + "/checkout");
    const [dates, setDates] = useState([undefined, undefined]);
    const [form] = Form.useForm();

    const [extras, setExtras] = useState([])
    const [extraPrice, setExtraPrice] = useState(0)

    const [tax, setTax] = useState([])
    const [taxPrice, setTaxPrice] = useState(0)

    const [localization, setLocalization] = useState([undefined, undefined])
    const [localizationPrice, setLocalizationPrice] = useState([0, 0])

    const [activeInsurance, setActiveInsurance] = useState({})
    const [activePayment, setActivePayment] = useState(1)

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
            fetchBlocksSelector({ carCategory: currentCar.id });

            if (from && to) {
                handleDate(moment(from), moment(to), true);
            }

            if (currentReservation.date) {
                handleReturn();
            }
        }
    }, [])

    const handleReturn = () => {
        if (currentReservation.date) {
            if (currentReservation.date.length == 2) {
                var newExtras = [], newTax = [], newLocalization = [undefined, undefined], newLocalizationPrice = [0, 0], newExtraPrice = 0, newTaxPrice = 0;

                currentReservation.extras.map((element) => {
                    var extra = extrasData.find((currentExtra) => currentExtra.id == element);
                    if (extra.visible) {
                        newExtras.push(extra.id);
                        newExtraPrice += extra.price;
                    } else {
                        newTax.push(extra.id);
                        newTaxPrice += extra.price;
                    }
                })

                localizations.map((currentLocalization) => {
                    if (currentReservation.localizations[0] == currentLocalization.id) {
                        newLocalization[0] = currentLocalization.id;
                        newLocalizationPrice[0] = currentLocalization.price;
                    }

                    if (currentReservation.localizations[1] == currentLocalization.id) {
                        newLocalization[1] = currentLocalization.id;
                        newLocalizationPrice[1] = currentLocalization.price;
                    }
                })
                setActivePayment(currentReservation.payment_method);
                handleDate(moment(currentReservation.date[0]), moment(currentReservation.date[1]));

                var difference = getDaysDifference(currentReservation.date[0], currentReservation.date[1]);
                setExtras(newExtras);
                setExtraPrice(newExtraPrice * difference);

                setTax(newTax);
                setTaxPrice(newTaxPrice);

                setLocalization(newLocalization);
                setLocalizationPrice(newLocalizationPrice);
            }
        }
    };

    useEffect(() => {
        if (dates[0] && dates[1]) {
            handleDate(dates[0], dates[1], false);
            getDaysDifference(dates[0], dates[1]);
        } else {
            if (price != 0) {
                setPrice(0);
            }
        }
    }, [dates])

    const handleDate = (from, to, initDate) => {
        var difference = getDaysDifference(from, to);

        var factors = getPromotions(promotions, from, difference);

        if (initDate) {
            setDates([from, to])
        }
        setDays(difference);
        var value = getCarPrice(currentCar.level.prices, difference, factors);
        setPrice(value);

        var extra = extrasData.find((element) => element.id == 6);

        var response = handleTimeTax([[...tax], taxPrice], from.hour(), 6, extra.price);
        var data = handleTimeTax(response, to.hour(), 5, extra.price);

        setTax(data[0]);
        setTaxPrice(data[1]);
    };


    const handleTimeTax = (initData, time, id, value) => {
        var taxCopy = initData[0];
        var taxPriceCopy = initData[1];

        if (time >= timeTax[0] && time <= timeTax[1]) {
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
        if (dates[0] && dates[1]) {
            form.validateFields().then((values) => {
                setCurrentReservation({ ...values, extras: [...extras, ...tax], date: dates, payment_method: activePayment, insurance_id: activeInsurance.id, localizations: localization });

                var extraArray = [], taxArray = [], localizationArray = [];

                extrasData.map((extra) => {
                    if (extras.includes(extra.id)) {
                        extraArray.push([extra.name[language], extra.price + "€", (extra.type == "uni" ? extra.price : (extra.price * days))])
                    }

                    if (tax.includes(extra.id)) {
                        taxArray.push([extra.name[language], extra.price + "€", extra.price])
                    }
                });

                if (localizationPrice[0]) {
                    localizationArray.push(["Taxa de entrega", localizationPrice[0] + "€", localizationPrice[0]])
                }

                if (localizationPrice[1]) {
                    localizationArray.push(["Taxa de devolução", localizationPrice[1] + "€", localizationPrice[1]])
                }

                setCurrentReservationValues({
                    car: [[currentCar.title, price]],
                    insurance: [[language == "pt" ? "Seguro" : "Insurance", activeInsurance.price + "€", activeInsurance.price * days]],
                    extras: extraArray,
                    tax: [...taxArray, ...localizationArray],
                });

                navigate("/summary");
            })
        }
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
                    {getPriceRounded(price + extraPrice + taxPrice + localizationPrice[0] + localizationPrice[1] + (activeInsurance.price * days))}€
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
                        <AlertContainer
                            currentErrors={currentErrors}
                            title={text.error}
                            onClose={() => setCurrentErrors([])}
                        />
                        <GeneralInfo
                            text={text}
                            form={form}
                            car={currentCar}
                            tax={tax} setTax={setTax}
                            taxPrice={taxPrice} setTaxPrice={setTaxPrice}
                            localization={localization} setLocalization={setLocalization}
                            localizationPrice={localizationPrice} setLocalizationPrice={setLocalizationPrice}
                            dates={dates} setDates={setDates}
                        />
                        <Addons
                            car={currentCar}
                            text={text}
                            days={days}
                            extras={extras} setExtras={setExtras}
                            extraPrice={extraPrice} setExtraPrice={setExtraPrice}
                            activeInsurance={activeInsurance} setActiveInsurance={setActiveInsurance}
                        />
                        <Client text={text} />
                        <Driver text={text} drivers={extras.includes(2) ? 2 : 1} />
                    </>
                }
                <PaymentContainer>
                    <TitleContainer title={text.titles[6]} />
                    <div className="payment-flex">
                        {text.payments.map((payment) => (
                            <Payment key={payment.id} border={theme.primary} active={activePayment == payment.id} onClick={() => setActivePayment(payment.id)}>
                                <h3>{payment.name}</h3>
                                <img src={payment.image} alt="" />
                            </Payment>
                        ))}
                    </div>
                </PaymentContainer>
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
        fetchBlocksSelector: (filter) => dispatch(fetchBlocksSelector(filter)),
        fetchExtras: () => dispatch(fetchExtras()),
        setCurrentErrors: (data) => dispatch(setCurrentErrors(data)),
    };
};

const mapStateToProps = (state) => {
    return {
        currentCar: state.carCategory.current,
        extrasData: state.extra.data,
        loadingExtras: state.extra.loading,
        promotions: state.promotion.data,
        language: state.application.language,
        currentReservation: state.reservation.current,
        currentErrors: state.reservation.errors,
        localizations: state.localization.data,
        timeTax: state.globalParameter.timeTax,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(Checkout));