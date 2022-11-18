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
    name: [{ required: true, message: 'Please input your fullname!' }],
    birthday: [{ required: true, message: 'Please input your birthday!' }],
    license_id: [{ required: true, message: 'Please input your driver license id!' }],
    emission_date: [{ required: true, message: 'Please input your driver license emission date!' }],
    validity_date: [{ required: true, message: 'Please input your driver license validity date!' }],
    emission_place: [{ required: true, message: 'Please input your driver license emission place!' }],
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
                                                <Form.Item label="Data de nascimento*" name="birthday" rules={rules.birthday}>
                                                    <DatePicker size="large" />
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                        <Row type="flex" gutter={64}>
                                            <Col xs={24} md={6}>
                                                <Form.Item label="Número Carta Condução*" name="license" rules={rules.license_id}>
                                                    <Input size="large" />
                                                </Form.Item>
                                            </Col>
                                            <Col xs={24} md={6}>
                                                <Form.Item label="Data de Emissão*" name="emission" rules={rules.emission_date}>
                                                    <DatePicker size="large" />
                                                </Form.Item>
                                            </Col>
                                            <Col xs={24} md={6}>
                                                <Form.Item label="Data de validade*" name="validity" rules={rules.validity_date}>
                                                    <DatePicker size="large" />
                                                </Form.Item>
                                            </Col>

                                            <Col xs={24} md={6}>
                                                <Form.Item label="Local de Emissão" name="emission_place" rules={rules.emission_place}>
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