import { Form } from 'antd';
import React from 'react'
import styled, { withTheme } from "styled-components";
import { maxWidth } from '../../helper';
import { Button, maxWidthStyle } from '../../styles';
import Addons from './Addons';
import Client from './Client';
import Driver from './Driver';
import GeneralInfo from './GeneralInfo';

const Container = styled.section`
    width: 100%;
    position: relative;
    margin: auto;
    padding: 180px 0px;
    
    @media (max-width: ${maxWidth}) {
        box-sizing: border-box;
        padding: 0px 20px;
    }

`;

const Title = styled.h1`
    font-size: 64px;
    text-transform: uppercase;
    font-weight: 700;
    text-align: center;
    margin: 10px auto 60px auto;
`;

const ButtonContainer = styled.div`
    ${maxWidthStyle}
`;

const Price = styled.div`
    position: fixed;
    right: 0px;
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
`;

function Checkout({ theme }) {
    const [form] = Form.useForm();

    const onFinish = (values) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <Container>
            <Title>Dados da sua reserva</Title>
            <Price background={theme.primary}>
                <h3>total</h3>
                <p>Inclui taxa de 22%</p>
                <div className='price'>
                    240€
                </div>
            </Price>
            <Form
                form={form}
                name="reservation"
                layout="vertical"
                requiredMark={false}
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <GeneralInfo />
                <Addons />
                <Client />
                <Driver />

                <ButtonContainer>
                    <Button background={theme.primary} type="primary"> reservar </Button>
                </ButtonContainer>
            </Form>
        </Container>
    )
}

export default withTheme(Checkout)