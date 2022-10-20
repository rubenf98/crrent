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
    padding: 120px 0px;
    
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