import React, { useEffect } from "react";
import styled from "styled-components";
import { Modal, Row, Form, Button, Input, Col } from 'antd';
import { connect } from "react-redux";
import { updateClient } from "../../../../redux/client/actions"
import TextArea from "antd/lib/input/TextArea";


const ButtonContainer = styled(Row)`
    padding: 30px 0px 10px 0;
`;

const Container = styled.div`
    background: white;
    border-radius: 5px;
    width: 100%;
`;

const Instruction = styled.h2`
    font-weight: bold;
    margin-top: 50px;
`;

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

function ClientFormContainer({ loading, handleClose, updateClient, visible, current }) {
    const [form] = Form.useForm();

    const handleModalClose = () => {
        form.resetFields();
        handleClose();
    }

    const onFinish = () => {
        form.validateFields().then((values) => {
            updateClient(current.id, values);
            handleModalClose();
        })
    };

    useEffect(() => {
        if (visible) {
            form.setFieldsValue({
                name: current.name,
                email: current.email,
                phone: current.phone,
                company: current.company,
                nif: current.nif,
                cc: current.cc,
                country: current.country,
                address: current.address,
                postal_code: current.postal_code,
                notes: current.notes
            })
        }
    }, [visible])

    return (
        <Container>
            <div>
                <Modal
                    width={1280}
                    onCancel={handleModalClose}
                    open={visible}
                    footer={null}
                >
                    <Form
                        form={form}
                        name="blockdate"
                        onFinish={onFinish}
                        layout="vertical"
                    >
                        <Instruction>Detalhes do cliente</Instruction>

                        <Row gutter={16} type="flex" align="bottom">
                            <Col span={12}>
                                <Form.Item rules={rules.required} label="Nome" name="name">
                                    <Input placeholder="Nome" />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="Agência / Empresa" name="company">
                                    <Input placeholder="Agência / Empresa" />
                                </Form.Item>
                            </Col>

                            <Col span={12}>
                                <Form.Item rules={[...rules.required, rules.email]} label="Email" name="email">
                                    <Input placeholder="Email" />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item rules={rules.required} label="Nº telemóvel" name="phone">
                                    <Input placeholder="Nº telemóvel" />
                                </Form.Item>
                            </Col>

                            <Col span={12}>
                                <Form.Item rules={rules.required} label="Número de Identificação Fiscal (NIF)" name="nif">
                                    <Input placeholder="Número de Identificação Fiscal (NIF)" />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item rules={rules.required} label="ID/Passaporte" name="cc">
                                    <Input placeholder="ID/Passaporte" />
                                </Form.Item>
                            </Col>

                            <Col span={8}>
                                <Form.Item rules={rules.required} label="País" name="country">
                                    <Input placeholder="País" />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item rules={rules.required} label="Morada" name="address">
                                    <Input placeholder="Morada" />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item rules={rules.required} label="Código Postal" name="postal_code">
                                    <Input placeholder="Código Postal" />
                                </Form.Item>
                            </Col>

                            <Col span={24}>
                                <Form.Item label="Notas" name="notes">
                                    <TextArea placeholder="Detalhes sobre o cliente" min={0} />
                                </Form.Item>
                            </Col>
                        </Row>


                        <ButtonContainer type="flex" justify="end">
                            <Button disabled={loading} loading={loading} size="large" width="150px" type="primary" htmlType="submit">
                                Atualizar
                            </Button>
                        </ButtonContainer>
                    </Form>

                </Modal>
            </div>
        </Container >
    )
}

const mapStateToProps = (state) => {
    return {
        loading: state.car.loading,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        updateClient: (id, data) => dispatch(updateClient(id, data)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ClientFormContainer);