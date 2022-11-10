import React, { useEffect, useState } from 'react'
import styled, { withTheme, keyframes, css } from "styled-components";
import { Button, maxWidthStyle } from '../../styles';
import { Form, Checkbox, Input, Row, Col, DatePicker, InputNumber } from 'antd';
import TitleContainer from './Common/TitleContainer';
import { Link } from 'react-router-dom';
import { dimensions } from '../../helper';
import { connect } from "react-redux";
import { useNavigate } from 'react-router-dom'

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

export const inputStyle = css`
    width: 100%;
    padding: 15px;
    box-sizing: border-box;
    -webkit-box-shadow: 0px 4px 31px rgba(0, 0, 0, 0.15);
    box-shadow: 0px 4px 31px rgba(0, 0, 0, 0.15);

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

const PolicyContainer = styled.section`
    font-weight: 400;
    font-size: 20px;
    margin: 100px 0px;

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
    box-shadow: 0px 4px 31px rgba(0, 0, 0, 0.25);
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
        margin: 20px 0px 80px 0px;

        @media (max-width: ${dimensions.md}) {
            margin: 20px 0px 40px 0px;

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
    name: [{
        required: true,
        message: 'Please input your fullname!',
    }],
};


function Summary({ theme, currentCar, values }) {
    let navigate = useNavigate();
    const [price, setPrice] = useState(0)

    const content = [
        { title: "CARRO", items: values.car },
        { title: "EXTRAS", items: values.extras },
        { title: "TAXAS", items: values.tax },
    ];


    useEffect(() => {
        if (!Object.values(currentCar).length) {
            navigate("/");
        } else {
            var aPrice = 0;
            content.map((section => {

                section.items.map((row) => {
                    aPrice += row[2];
                })
            }))

            setPrice(aPrice);
        }
    }, [])



    return (
        <Container>

            <Content>
                {Object.values(currentCar).length &&
                    <SummaryContainer>
                        <Car>
                            <Background background={theme.levels[currentCar.level.code]} />
                            <img src={currentCar.image} alt="" />
                        </Car>
                        <Info>
                            <TitleContainer title="Resumo" />

                            {content.map((section, key) => (
                                <>
                                    {section.items.length ?
                                        <Section>

                                            <div className='title large'>{section.title}</div>
                                            <div className='title opacity'>€/{key == 2 ? "UNI" : "DIA"}</div>
                                            <div className='title'>SUBTOTAL</div>



                                            {section.items.map((row) => (
                                                <>
                                                    <p className='large'>
                                                        {row[0]}
                                                    </p>
                                                    <p className='opacity'>
                                                        {row[1]}
                                                    </p>
                                                    <p>
                                                        {row[2]}€
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
                                    {price}€
                                </div>
                            </Price>
                        </Info>
                    </SummaryContainer>
                }
                <PolicyContainer>
                    <Form.Item name="privacy" rules={rules.name}>
                        <Checkbox>Li, compreendi e concordo com os <Link to="/privacy">Política de Privacidade</Link></Checkbox>
                    </Form.Item>
                    <Form.Item name="conditions" rules={rules.name}>
                        <Checkbox>Confirmo que li, compreendi e concordo com os <Link to="/conditions">Termos e Condições da CR Rent</Link></Checkbox>
                    </Form.Item>
                </PolicyContainer>

                <TitleContainer title="Detalhes de pagamento" />
                <PaymentContainer primary={theme.primary}>
                    <div className='column'>

                        <h3>Cartão de Crédito</h3>
                        <Form
                            layout="vertical"
                            requiredMark={false}
                        >
                            <Row>
                                <Col xs={24} md={20}>
                                    <Form.Item name="card_number" label="Número de cartão" rules={rules.name}>
                                        <StyledInput placeholder='XXXX XXXX XXXX XXXX' />
                                    </Form.Item>
                                </Col>
                            </Row>

                            <Row type="flex" gutter={16}>
                                <Col xs={24} md={10}>
                                    <Form.Item name="card_validity" label="Data de Validade" rules={rules.name}>
                                        <MonthPicker placeholder='MM/AA' />
                                    </Form.Item>
                                </Col>

                                <Col xs={24} md={10}>
                                    <Form.Item name="card_cvv" label="CVV" rules={rules.name}>
                                        <StyledInputNumber placeholder='XXX' />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Form>
                    </div>
                    <div className='column'>
                        <p className='info'>Para sua segurança, a verificação da sua identidade pode ser solicitada. Contacte o seu banco para mais informações.</p>
                        <Button background={theme.primary}>
                            pagar já
                        </Button>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                        <p>( +351 ) 964 546 324</p>
                    </div>
                </PaymentContainer>

            </Content>
        </Container>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        setCurrentReservation: (data) => dispatch(setCurrentReservation(data)),
    };
};

const mapStateToProps = (state) => {
    return {
        currentCar: state.car.current,
        loading: state.car.loading,
        values: state.reservation.values
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(Summary));