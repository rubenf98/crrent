import React from 'react'
import styled, { withTheme } from "styled-components";
import { maxWidthStyle } from '../../styles';
import { Col, DatePicker, Form, Input, Row } from 'antd';
import TitleContainer from './Common/TitleContainer';
import { dimensions } from '../../helper';

const Container = styled.section`
    ${maxWidthStyle};

    @media (max-width: ${dimensions.md}) {
        padding: 0px;
    }
`;

const Section = styled.div`
    margin: 120px auto 40px auto;
`;

const rules = {
    name: [{ required: false, message: 'Please input your fullname!' }],
    date: [{ required: false, message: 'Please input the reservation date!' }],
    place: [{ required: false, message: 'Please input the pickup and return place!' }],
    flight: [{ required: false }],
};


function Driver({ theme, drivers }) {

    return (
        <Container>
            <Form.List name="drivers">
                {() => (
                    <>
                        {[...Array(drivers)].map((p, key) =>
                            <Form.List key={key} name={key}>
                                {() => (
                                    <Section>
                                        <TitleContainer title={key == 0 ? "Condutor Principal" : "Condutor Adicional"} />
                                        <Row type="flex" gutter={64}>
                                            <Col xs={24} md={12}>
                                                <Form.Item label="Nome*" name="name" rules={rules.name}>
                                                    <Input size="large" />
                                                </Form.Item>
                                            </Col>
                                            <Col xs={24} md={6}>
                                                <Form.Item label="Data de nascimento*" name="birthday" rules={rules.name}>
                                                    <DatePicker size="large" />
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                        <Row type="flex" gutter={64}>
                                            <Col xs={24} md={6}>
                                                <Form.Item label="Número Carta Condução*" name="address" rules={rules.name}>
                                                    <Input size="large" />
                                                </Form.Item>
                                            </Col>
                                            <Col xs={24} md={6}>
                                                <Form.Item label="Data de Emissão*" name="country" rules={rules.name}>
                                                    <DatePicker size="large" />
                                                </Form.Item>
                                            </Col>
                                            <Col xs={24} md={6}>
                                                <Form.Item label="Data de validade*" name="postal_code" rules={rules.name}>
                                                    <DatePicker size="large" />
                                                </Form.Item>
                                            </Col>

                                            <Col xs={24} md={6}>
                                                <Form.Item label="Local de Emissão" name="email" rules={rules.name}>
                                                    <Input size="large" />
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                    </ Section>
                                )}
                            </Form.List>

                        )}
                    </>
                )}
            </Form.List>

        </Container>
    )
}

export default withTheme(Driver)