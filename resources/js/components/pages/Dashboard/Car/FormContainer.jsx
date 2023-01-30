import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Modal, Row, Form, Button, Input, Col, InputNumber, Select, Switch } from 'antd';
import { connect } from "react-redux";
import TextArea from "antd/lib/input/TextArea";
import Checkbox from "antd/es/checkbox";
import { createCar, updateCar } from "../../../../redux/car/actions";
import LevelRemoteSelectContainer from "../Level/LevelRemoteSelectContainer";
import { formWidth } from "../../../helper";


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

function FormContainer({ loading, edit, handleClose, updateCar, visible, current, createCar, handleCreateClick }) {
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
                    kms: current?.kms,
                    registration: current.registration,
                    car_category_id: current?.category?.id,
                })
            } else {
                form.setFieldsValue({
                    kms: undefined,
                    registration: undefined,
                    car_category_id: undefined,
                })
            }

        }
    }, [visible])

    return (
        <Container>
            <div>
                <Modal
                    width={formWidth}
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
                        <Instruction>{edit ? "Edite os campos do veículo" : "Introduza um novo carro na plataforma"}</Instruction>
                        <Row gutter={16}>

                            <Col span={8}>
                                <Form.Item rules={rules.registration} name="registration" label="Matrícula">
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item rules={rules.level} label="Categoria" name="car_category_id">
                                    <LevelRemoteSelectContainer />
                                </Form.Item>
                            </Col>

                            <Col span={8}>
                                <Form.Item rules={rules.people} name="kms" label="Quilometragem">
                                    <InputNumber style={{ width: "100%" }} />
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