import React, { useEffect } from "react";
import styled from "styled-components";
import { Modal, Row, Form, Button, Input, Col, InputNumber, Select, Switch } from 'antd';
import { connect } from "react-redux";
import TextArea from "antd/lib/input/TextArea";
import Checkbox from "antd/es/checkbox";
import { createCar, updateCar } from "../../../../redux/car/actions";
import LevelRemoteSelectContainer from "../Level/LevelRemoteSelectContainer";


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
    price: [
        {
            required: true,
            message: 'O preço é obrigatório',
        },
    ],
    name: [
        {
            required: true,
            message: 'O título do extra é obrigatório',
        },
    ],
    type: [
        {
            required: true,
            message: 'A tipologia de valor é obrigatória',
        },
    ],
};

function FormContainer({ loading, edit, handleClose, updateCar, visible, current, createCar }) {
    const [form] = Form.useForm();

    const handleModalClose = () => {
        form.resetFields();
        handleClose();
    }

    const onFinish = () => {
        form.validateFields().then((values) => {
            if (edit) {
                updateCar(current.id, values);
            } else {
                createCar(values);
            }

            handleModalClose();
        })
    };

    useEffect(() => {
        if (visible && edit) {
            if (edit) {
                form.setFieldsValue({
                    title: current.title,
                    subtitle: current.subtitle,
                    registration: current.registration,
                    description_pt: current.description?.pt,
                    description_en: current.description?.en,
                    level_id: current.level?.id,
                    gas: current.gas,
                    shift_mode: current.shift_mode,
                    people: current.people,
                    doors: current.doors,
                    air: current.air,
                })
            } else {
                form.setFieldsValue({
                    title: undefined,
                    subtitle: undefined,
                    registration: undefined,
                    description_pt: undefined,
                    description_en: undefined,
                    level_id: undefined,
                    gas: undefined,
                    shift_mode: undefined,
                    people: undefined,
                    doors: undefined,
                    checked: undefined,
                    air
                })
            }

        }
    }, [visible])

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
                    >
                        <Instruction>{edit ? "Edite os campos do carro" : "Introduza um novo carro na plataforma"}</Instruction>
                        <Row gutter={16}>
                            <Col span={8}>
                                <Form.Item rules={rules.title} name="title" label="Título do  do carro">
                                    <Input placeholder="Título do carro" />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item rules={rules.subtitle} name="subtitle" label="Subtítulo do carro">
                                    <Input placeholder="Subtítulo do carro" />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item rules={rules.registration} name="registration" label="Matrícula">
                                    <Input placeholder="Matrícula" />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item rules={rules.description} name="description_pt" label="Descrição do carro (PT)">
                                    <TextArea placeholder="Descrição do carro (PT)" />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item rules={rules.description} name="description_en" label="Descrição do carro (EN)">
                                    <TextArea placeholder="Descrição do carro (EN)" />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item rules={rules.level} label="Grupo" name="level_id">
                                    <LevelRemoteSelectContainer />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item rules={rules.gas} label="Combustível" name="gas">
                                    <Select placeholder="Sistema de combustível">
                                        <Option value="gasoline">Gasolina</Option>
                                        <Option value="diesel">Diesel</Option>
                                        <Option value="electric">Elétrico</Option>
                                        <Option value="hybrid">Híbrido</Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item rules={rules.shift_mode} label="Mudanças" name="shift_mode">
                                    <Select placeholder="Sistema de mudanças">
                                        <Option value="manual">Manuais</Option>
                                        <Option value="automatic">Automático</Option>
                                    </Select>
                                </Form.Item>
                            </Col>


                            <Col span={12}>
                                <Form.Item rules={rules.people} name="people" label="Capacidade de pessoas">
                                    <InputNumber style={{ width: "100%" }} placeholder="Capacidade de pessoas" />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item rules={rules.door} name="doors" label="Nº de portas">
                                    <InputNumber style={{ width: "100%" }} placeholder="Nº de portas" />
                                </Form.Item>
                            </Col>
                            <Col span={24}>
                                <Form.Item valuePropName="checked" rules={rules.air} name="air" label="A/C">
                                    <Switch />
                                </Form.Item>
                            </Col>

                        </Row>

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
        loading: state.car.loading,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        updateCar: (id, data) => dispatch(updateCar(id, data)),
        createCar: (data) => dispatch(createCar(data)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FormContainer);