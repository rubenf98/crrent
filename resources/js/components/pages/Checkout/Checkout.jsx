import { Form } from 'antd';
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
import { fetchBlocks } from "../../../redux/block/actions";

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

function Checkout({ theme, currentCar, setCurrentReservation, setCurrentReservationValues, extrasData, fetchBlocks, promotions }) {
    const [form] = Form.useForm();

    const [extras, setExtras] = useState([])
    const [extraPrice, setExtraPrice] = useState(0)

    const [tax, setTax] = useState([])
    const [taxPrice, setTaxPrice] = useState(0)

    const [price, setPrice] = useState(0)

    const [pricePerDay, setPricePerDay] = useState(0)

    const [days, setDays] = useState(1)

    let navigate = useNavigate();
    const [searchParams] = useSearchParams();

    useEffect(() => {
        if (!Object.values(currentCar).length) {
            navigate("/");
        } else {
            var from = searchParams.get("from");
            var to = searchParams.get("to");

            fetchBlocks(currentCar.level.id);

            if (from && to) {
                handleDate(moment(from), moment(to), true);
            }
        }
    }, [])


    const onDateChange = (e) => {
        handleDate(e[0], e[1], false);
    };

    const handleDate = (from, to, initDate) => {
        var difference = moment(to).diff(moment(from), 'days');
        var factors = getPromotions(from, difference);

        if (initDate) {
            form.setFieldValue('date', [from, to])
            setDays(difference);
        }

        var value = retrievePrice(currentCar.level.prices, difference, factors);
        setPrice(value);

        var response = handleTimeTax([[...tax], taxPrice], from.hour(), 9, 15);
        var data = handleTimeTax(response, to.hour(), 7, 15);

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

    function retrievePrice(prices, difference, factors) {
        var value = prices[2].price;
        prices.map((price) => {
            if (difference >= price.min && difference <= price.max) {
                value = price.price;
            }
        })

        setPricePerDay(value);

        var array = Array(difference).fill(value);
        var carPrice = 0;

        array.map((day, index) => {
            carPrice += day * factors[index];
        });

        return carPrice + extraPrice;
    }

    function getPromotions(start, days) {

        var init = moment(start);
        var min = undefined;
        var max = undefined;
        var factors = Array(days).fill(1);
        var index = 0;
        while (index < factors.length) {

            promotions.map((promotion) => {
                min = moment(promotion.start).startOf('day');
                max = moment(promotion.end).endOf('day');

                if (init.isBetween(min, max)) {
                    factors[index] = promotion.factor;
                }
            })

            init.add(1, 'days');
            index++;
            if (index > 365) {
                break;
            }
        }

        return factors;
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
            })
            setCurrentReservationValues({
                car: [
                    [currentCar.title, pricePerDay + "€", price]
                ],
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
            <Title>Dados da sua reserva</Title>
            <Price visible={price} background={theme.primary}>
                <h3>total</h3>
                <p>Inclui taxa de 22%</p>
                <div className='price'>
                    {price + extraPrice + taxPrice}€
                </div>
            </Price>
            <Form
                form={form}
                scrollToFirstError
                name="reservation"
                layout="vertical"
                requiredMark={false}
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                {Object.values(currentCar).length &&
                    <>
                        <GeneralInfo form={form} handleDateChange={onDateChange} car={currentCar}
                            tax={tax}
                            setTax={setTax}
                            taxPrice={taxPrice}
                            setTaxPrice={setTaxPrice} />
                        <Addons days={days} extras={extras} setExtras={setExtras} extraPrice={extraPrice} setExtraPrice={setExtraPrice} />
                        <Client />
                        <Driver drivers={extras.includes(3) ? 2 : 1} />
                    </>
                }

                <ButtonContainer>
                    <Button background={theme.primary} type="primary"> reservar </Button>
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
        fetchBlocks: (level) => dispatch(fetchBlocks(level)),
    };
};

const mapStateToProps = (state) => {
    return {
        currentCar: state.car.current,
        loading: state.car.loading,
        extrasData: state.extra.data,
        promotions: state.promotion.data
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(Checkout));