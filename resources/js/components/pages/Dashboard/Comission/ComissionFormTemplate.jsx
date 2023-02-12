import { Col, Form, Input, InputNumber, Row, Switch } from 'antd'
import React from 'react'
import AgencyRemoteSelectContainer from '../Agency/AgencyRemoteSelectContainer'

const rules = {
    required: [
        {
            required: true,
            message: 'O campo é obrigatório',
        },
    ],
};

function ComissionFormTemplate() {
    return (
        <Row gutter={16} type="flex" justify="bottom">
            <Col span={6}>
                <Form.Item rules={rules.min} label="Hotel / Agência" name="agency_id">
                    <AgencyRemoteSelectContainer />
                </Form.Item>
            </Col>
            <Col span={6}>
                <Form.Item rules={rules.max} label="Reservado por" name="intermediary">
                    <Input />
                </Form.Item>
            </Col>
            <Col span={6}>
                <Form.Item rules={rules.factor} label="Valor comissão (em euros)" name="value">
                    <InputNumber addonAfter="€" style={{ width: "100%" }} />
                </Form.Item>
            </Col>
            <Col span={6}>
                <Form.Item valuePropName="checked" label="Valor pago" name="paid">
                    <Switch />
                </Form.Item>
            </Col>
        </Row>
    )
}

export default ComissionFormTemplate