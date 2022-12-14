import React from 'react'
import styled, { withTheme } from "styled-components";
import { maxWidthStyle } from '../../styles';
import { Col, DatePicker, Form, Input, Row } from 'antd';
import TitleContainer from './Common/TitleContainer';
import { dimensions, maxWidth } from '../../helper';
import moment from "moment";

const Container = styled.section`
    ${maxWidthStyle};
    max-width: calc(${maxWidth} - 200px);
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

function Driver({ text, drivers }) {
    var placeholder = text.placeholder.driver;
    return (
        <Container>
            <Form.List name="drivers">
                {() => (
                    <>
                        {[...Array(drivers)].map((p, key) =>
                            <Form.List key={key} name={key}>
                                {() => (
                                    <Section>
                                        <TitleContainer title={key == 0 ? text.titles[4] : text.titles[5]} />
                                        <Row type="flex" gutter={64}>
                                            <Col xs={24} md={12}>
                                                <Form.Item label={placeholder.name} name="name" rules={rules.name}>
                                                    <Input size="large" />
                                                </Form.Item>
                                            </Col>
                                            <Col xs={24} md={6}>
                                                <Form.Item label={placeholder.birthday} name="birthday" rules={rules.birthday}>
                                                    <DatePicker format="DD-MM-YYYY" size="large" maxDate={moment().subtract(21, "years")} />
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                        <Row type="flex" gutter={64}>
                                            <Col xs={24} md={6}>
                                                <Form.Item label={placeholder.license} name="license" rules={rules.license_id}>
                                                    <Input size="large" />
                                                </Form.Item>
                                            </Col>
                                            <Col xs={24} md={6}>
                                                <Form.Item label={placeholder.emission} name="emission" rules={rules.emission_date}>
                                                    <DatePicker format="DD-MM-YYYY" size="large" />
                                                </Form.Item>
                                            </Col>
                                            <Col xs={24} md={6}>
                                                <Form.Item label={placeholder.validity} name="validity" rules={rules.validity_date}>
                                                    <DatePicker format="DD-MM-YYYY" size="large" />
                                                </Form.Item>
                                            </Col>

                                            <Col xs={24} md={6}>
                                                <Form.Item label={placeholder.emission_place} name="emission_place" rules={rules.emission_place}>
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