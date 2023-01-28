import { Col, Form, Input, Row } from 'antd'
import React from 'react'

function AgencyFormTemplate() {
    return (
        <Row gutter={16} type="flex" justify="bottom">
            <Col span={8}>
                <Form.Item rules={rules.min} label="Hotel / Agência" name="min">
                    <Input />
                </Form.Item>
            </Col>
            <Col span={8}>
                <Form.Item rules={rules.max} label="Reservado por" name="max">
                    <Input />
                </Form.Item>
            </Col>
            <Col span={8}>
                <Form.Item rules={rules.factor} label="Valor comissão" name="price">
                    <Input />
                </Form.Item>
            </Col>
        </Row>
    )
}

export default AgencyFormTemplate