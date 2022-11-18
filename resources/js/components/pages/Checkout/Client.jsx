import React from 'react'
import styled, { withTheme } from "styled-components";
import { maxWidthStyle } from '../../styles';
import { Col, Form, Input, Row } from 'antd';
import TitleContainer from './Common/TitleContainer';
import { dimensions } from '../../helper';

const Container = styled.section`
    ${maxWidthStyle}
    margin: 120px auto;

    @media (max-width: ${dimensions.md}) {
        padding: 0px;
    }
`;

const rules = {
    name: [{ required: true, message: 'Please input your fullname!' }],
    cc: [{ required: true, message: 'Please input your ID or passport!' }],
    nif: [{ required: true, message: 'Please input your Tax Identification Number!' }],
    address: [{ required: true, message: 'Please input your Address!' }],
    country: [{ required: true, message: 'Please input your origin Country!' }],
    postal_code: [{ required: true, message: 'Please input your Postal Code!' }],
    email: [{ required: true, message: 'Please input your Email!' }, { type: "email" }],
    local_address: [{ required: true, message: 'Please input your Local Address!' }],
    company: [{ required: true }],
};


function Client({ theme }) {

    return (
        <Container>
            <TitleContainer title="Informação do Cliente" />
            <Row type="flex" gutter={64}>
                <Col xs={24} md={12}>
                    <Form.Item label="Nome*" name="name" rules={rules.name}>
                        <Input size="large" />
                    </Form.Item>
                </Col>
                <Col xs={24} md={6}>
                    <Form.Item label="ID/Passaporte*" name="cc" rules={rules.cc}>
                        <Input size="large" />
                    </Form.Item>
                </Col>
                <Col xs={24} md={6}>
                    <Form.Item label="NIF*" name="nif" rules={rules.nif}>
                        <Input size="large" />
                    </Form.Item>
                </Col>

                <Col xs={24} md={12}>
                    <Form.Item label="Morada*" name="address" rules={rules.address}>
                        <Input size="large" />
                    </Form.Item>
                </Col>
                <Col xs={24} md={6}>
                    <Form.Item label="País*" name="country" rules={rules.country}>
                        <Input size="large" />
                    </Form.Item>
                </Col>
                <Col xs={24} md={6}>
                    <Form.Item label="Código Postal*" name="postal_code" rules={rules.postal_code}>
                        <Input size="large" />
                    </Form.Item>
                </Col>

                <Col xs={24} md={12}>
                    <Form.Item label="Email*" name="email" rules={rules.email}>
                        <Input size="large" />
                    </Form.Item>
                </Col>
                <Col xs={24} md={6}>
                    <Form.Item label="Número de telemóvel*" name="phone" rules={rules.name}>
                        <Input size="large" />
                    </Form.Item>
                </Col>

                <Col xs={24} md={12}>
                    <Form.Item label="Endereço local*" name="local_address" rules={rules.local_address}>
                        <Input size="large" />
                    </Form.Item>
                </Col>
                <Col xs={24} md={6}>
                    <Form.Item label="Companhia" name="company" rules={rules.company}>
                        <Input size="large" />
                    </Form.Item>
                </Col>

            </Row>
        </Container>
    )
}

export default withTheme(Client)