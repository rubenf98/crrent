import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Modal, Row, Form, Button, Input, Col, InputNumber } from 'antd';
import { connect } from "react-redux";
import { createLevel, updateLevel } from "../../../../redux/level/actions";
import { SwatchesPicker } from 'react-color';

const ButtonContainer = styled(Row)`
    padding: 30px 0px 10px 0;
`;

const Container = styled.div`
    background: white;
    border-radius: 5px;
    width: 100%;
`;

const Minus = styled.img`
    width: 15px;
    height: 15px;
    cursor: pointer;
`;


const Instruction = styled.h2`
    font-weight: bold;
    margin-top: 50px;
`;

const rules = {
    required: [
        {
            required: true,
            message: 'Campo obrigatório',
        },
    ],
};

function FormContainer({ loading, edit, handleClose, updateLevel, visible, current, createLevel }) {
    const [form] = Form.useForm();
    const [hex, setHex] = useState(undefined);

    const handleModalClose = () => {
        form.resetFields();
        handleClose();
    }

    useEffect(() => {
        if (Object.values(current).length) {
            setHex(current.color)
        }

    }, [current])


    const onFinish = () => {
        form.validateFields().then((values) => {
            if (edit) {
                updateLevel(current.id, { ...values, color: hex });
            } else {
                createLevel({ ...values, color: hex });
            }

            handleModalClose();
        })
    };

    useEffect(() => {
        if (visible && edit) {
            if (edit) {
                setHex(current.color);
                form.setFieldsValue({
                    name: current.name,
                    code: current.code,
                    color: current.color,
                    prices: current.prices
                })
            } else {
                setHex(undefined);
                form.setFieldsValue({
                    name: undefined,
                    code: undefined,
                    color: undefined,
                    prices: [
                        { min: 2, max: 6, price: undefined },
                        { min: 7, max: 14, price: undefined },
                        { min: 15, max: 10000, price: undefined }
                    ]
                })
            }

        }
    }, [visible])
    console.log(hex);
    return (
        <Container>
            <div>
                <Modal
                    width={720}
                    onCancel={handleModalClose}
                    open={visible}
                    footer={null}
                >
                    <Form
                        form={form}
                        name="extra"
                        onFinish={onFinish}
                        layout="vertical"
                        initialValues={{
                            prices: [
                                { min: 2, max: 6, price: undefined },
                                { min: 7, max: 14, price: undefined },
                                { min: 15, max: 10000, price: undefined }
                            ]
                        }}
                    >
                        <Instruction>{edit ? "Edite os campos da gama" : "Introduza uma nova gama de veículos na plataforma"}</Instruction>
                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item rules={rules.required} name="name" label="Título da gama">
                                    <Input placeholder="Ex.: Citadino 3P" />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item rules={rules.required} name="code" label="Código de referência">
                                    <Input placeholder="Ex.: A" />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item rules={rules.required} name="color" label="Cor na página">

                                    <SwatchesPicker onChange={(e) => setHex(e.hex)} />
                                </Form.Item>
                            </Col>
                            <Col span={12} style={{ backgroundColor: hex }} />

                        </Row>
                        <Instruction>Preços da gama</Instruction>
                        <Form.List name="prices">
                            {(fields, { add, remove }) => (
                                <>
                                    {fields.map(({ key, name }) => (

                                        <Row key={key} justify="space-between" align="middle" gutter={16}>
                                            <Col span={8}>
                                                <Form.Item rules={rules.required} label="Mínimo de dias" name={[name, 'min']}>
                                                    <InputNumber placeholder="Ex. 2" style={{ width: "100%" }} min={2} />
                                                </Form.Item>
                                            </Col>
                                            <Col span={8}>
                                                <Form.Item rules={rules.required} label="Máximo de dias" name={[name, 'max']}>
                                                    <InputNumber placeholder="Ex. 6" style={{ width: "100%" }} min={2} />
                                                </Form.Item>
                                            </Col>
                                            <Col span={8}>
                                                <Form.Item rules={rules.required} label="Preço" name={[name, 'price']}>
                                                    <InputNumber placeholder="Ex. 35" style={{ width: "100%" }} min={0} />
                                                </Form.Item>
                                            </Col>
                                        </Row>


                                    ))}
                                </>
                            )}
                        </Form.List>

                        <ButtonContainer type="flex" justify="end">
                            <Button disabled={loading} loading={loading} size="large" width="150px" type="primary" htmlType="submit">
                                Submeter
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
        loading: state.level.loading,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        updateLevel: (id, data) => dispatch(updateLevel(id, data)),
        createLevel: (data) => dispatch(createLevel(data)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FormContainer);