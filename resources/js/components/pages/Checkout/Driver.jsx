import React from 'react'
import styled, { withTheme } from "styled-components";
import { maxWidthStyle } from '../../styles';
import { Col, Form, Input, Row } from 'antd';
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
    name: [{
        required: false,
        message: 'Please input your fullname!',
    }],
};


function Driver({ theme, initialValue }) {

    return (
        <Container>
            <Form.List name="drivers" initialValue={initialValue}>
                {(fields, { add }) => (
                    <>
                        {fields.map(({ key }) => (
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
                                            <Input size="large" />
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
                                            <Input size="large" />
                                        </Form.Item>
                                    </Col>
                                    <Col xs={24} md={6}>
                                        <Form.Item label="Data de validade*" name="postal_code" rules={rules.name}>
                                            <Input size="large" />
                                        </Form.Item>
                                    </Col>

                                    <Col xs={24} md={6}>
                                        <Form.Item label="Local de Emissão" name="email" rules={rules.name}>
                                            <Input size="large" />
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </ Section>
                        ))}
                    </>
                )}
            </Form.List>

        </Container>
    )
}

export default withTheme(Driver)