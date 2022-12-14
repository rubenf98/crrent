import React from 'react'
import styled, { withTheme } from "styled-components";
import { maxWidthStyle } from '../../styles';
import { Col, Form, Input, Row } from 'antd';
import TitleContainer from './Common/TitleContainer';
import { dimensions, maxWidth } from '../../helper';

const Container = styled.section`
    ${maxWidthStyle}
    margin: 120px auto;
    max-width: calc(${maxWidth} - 200px);

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
};


function Client({ text }) {
    var placeholder = text.placeholder.client;
    return (
        <Container>
            <TitleContainer title={text.titles[3]} />
            <Row type="flex" gutter={64}>
                <Col xs={24} md={12}>
                    <Form.Item label={placeholder.name} name="name" rules={rules.name}>
                        <Input size="large" />
                    </Form.Item>
                </Col>
                <Col xs={24} md={6}>
                    <Form.Item label={placeholder.cc} name="cc" rules={rules.cc}>
                        <Input size="large" />
                    </Form.Item>
                </Col>
                <Col xs={24} md={6}>
                    <Form.Item label={placeholder.nif} name="nif" rules={rules.nif}>
                        <Input size="large" />
                    </Form.Item>
                </Col>

                <Col xs={24} md={12}>
                    <Form.Item label={placeholder.address} name="address" rules={rules.address}>
                        <Input size="large" />
                    </Form.Item>
                </Col>
                <Col xs={24} md={6}>
                    <Form.Item label={placeholder.country} name="country" rules={rules.country}>
                        <Input size="large" />
                    </Form.Item>
                </Col>
                <Col xs={24} md={6}>
                    <Form.Item label={placeholder.postal_code} name="postal_code" rules={rules.postal_code}>
                        <Input size="large" />
                    </Form.Item>
                </Col>

                <Col xs={24} md={12}>
                    <Form.Item label={placeholder.email} name="email" rules={rules.email}>
                        <Input size="large" />
                    </Form.Item>
                </Col>
                <Col xs={24} md={6}>
                    <Form.Item label={placeholder.phone} name="phone" rules={rules.name}>
                        <Input size="large" />
                    </Form.Item>
                </Col>

                <Col xs={24} md={12}>
                    <Form.Item label={placeholder.local_address} name="local_address" rules={rules.local_address}>
                        <Input size="large" />
                    </Form.Item>
                </Col>

            </Row>
        </Container>
    )
}

export default withTheme(Client)