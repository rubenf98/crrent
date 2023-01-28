import { Col, Form, Input, Row } from 'antd'
import TextArea from 'antd/lib/input/TextArea'
import React from 'react'


const rules = {
    required: [
        {
            required: true,
            message: 'O campo é obrigatório',
        },
    ],
    email: [
        {
            type: "email",
            message: 'O campo não corresponde a um email',
        },
    ],
    factor: [
        {
            required: true,
            message: 'O valor de dias máximo é obrigatório',
        },
    ],
};

function ClientFormTemplate() {
    return (
        <Row gutter={16} type="flex" align="bottom">
            <Col xs={12} md={6}>
                <Form.Item rules={rules.required} label="Nome" name="name">
                    <Input placeholder="Nome" />
                </Form.Item>
            </Col>

            <Col xs={12} md={6}>
                <Form.Item rules={rules.required} label="ID/Passaporte" name="cc">
                    <Input placeholder="ID/Passaporte" />
                </Form.Item>
            </Col>
            <Col xs={12} md={6}>
                <Form.Item rules={[...rules.required, rules.email]} label="Email" name="email">
                    <Input placeholder="Email" />
                </Form.Item>
            </Col>
            <Col xs={12} md={6}>
                <Form.Item rules={rules.required} label="Nº telemóvel" name="phone">
                    <Input placeholder="Nº telemóvel" />
                </Form.Item>
            </Col>

            <Col xs={12} md={6}>
                <Form.Item label="Número de Identificação Fiscal (NIF)" name="nif">
                    <Input placeholder="Número de Identificação Fiscal (NIF)" />
                </Form.Item>
            </Col>
            <Col xs={12} md={6}>
                <Form.Item label="Agência / Empresa" name="company">
                    <Input placeholder="Agência / Empresa" />
                </Form.Item>
            </Col>


            <Col xs={12} md={6}>
                <Form.Item label="País" name="country">
                    <Input placeholder="País" />
                </Form.Item>
            </Col>

            <Col xs={12} md={6}>
                <Form.Item label="Código Postal" name="postal_code">
                    <Input placeholder="Código Postal" />
                </Form.Item>
            </Col>

            <Col xs={24} md={12}>
                <Form.Item label="Morada" name="address">
                    <TextArea placeholder="Morada" />
                </Form.Item>
            </Col>
            <Col xs={24} md={12}>
                <Form.Item label="Notas" name="client_notes">
                    <TextArea placeholder="Detalhes sobre o cliente" min={0} />
                </Form.Item>
            </Col>
        </Row>
    )
}

export default ClientFormTemplate