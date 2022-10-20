import React from 'react'
import styled, { withTheme } from "styled-components";
import { DoorsIcon, GasIcon, PeopleIcon, ShiftIcon } from '../../../icons';
import { Button, maxWidthStyle } from '../../styles';
import { Col, DatePicker, Form, Input, Row } from 'antd';
import TitleContainer from './Common/TitleContainer';

const Container = styled.section`
    ${maxWidthStyle}
    margin: 120px auto;
`;



const rules = {
    name: [{
        required: true,
        message: 'Please input your fullname!',
    }],
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
                    <Form.Item label="ID/Passaporte*" name="cc" rules={rules.name}>
                        <Input size="large" />
                    </Form.Item>
                </Col>
                <Col xs={24} md={6}>
                    <Form.Item label="NIF*" name="nif" rules={rules.name}>
                        <Input size="large" />
                    </Form.Item>
                </Col>

                <Col xs={24} md={12}>
                    <Form.Item label="Morada*" name="address" rules={rules.name}>
                        <Input size="large" />
                    </Form.Item>
                </Col>
                <Col xs={24} md={6}>
                    <Form.Item label="País*" name="country" rules={rules.name}>
                        <Input size="large" />
                    </Form.Item>
                </Col>
                <Col xs={24} md={6}>
                    <Form.Item label="Código Postal*" name="postal_code" rules={rules.name}>
                        <Input size="large" />
                    </Form.Item>
                </Col>

                <Col xs={24} md={12}>
                    <Form.Item label="Email*" name="email" rules={rules.name}>
                        <Input size="large" />
                    </Form.Item>
                </Col>
                <Col xs={24} md={6}>
                    <Form.Item label="Número de telemóvel*" name="phone" rules={rules.name}>
                        <Input size="large" />
                    </Form.Item>
                </Col>

                <Col xs={24} md={12}>
                    <Form.Item label="Endereço local*" name="local_address" rules={rules.name}>
                        <Input size="large" />
                    </Form.Item>
                </Col>
                <Col xs={24} md={6}>
                    <Form.Item label="Companhia" name="company" rules={rules.name}>
                        <Input size="large" />
                    </Form.Item>
                </Col>

            </Row>
        </Container>
    )
}

export default withTheme(Client)