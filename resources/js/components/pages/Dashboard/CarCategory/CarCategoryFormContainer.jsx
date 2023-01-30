import React, { useEffect } from "react";
import styled from "styled-components";
import { Modal, Row, Form, Button, Switch, InputNumber, Select, Col, Input } from 'antd';
import { connect } from "react-redux";
import { updateCarCategory } from "../../../../redux/carCategory/actions"
import LevelRemoteSelectContainer from "../Level/LevelRemoteSelectContainer";
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

function CarCategoryFormContainer({ loading, handleClose, updateCarCategory, visible, current }) {
    const [form] = Form.useForm();

    const handleModalClose = () => {
        form.resetFields();
        handleClose();
    }

    const onFinish = () => {
        form.validateFields().then((values) => {
            updateCarCategory(current.id, values);
            handleModalClose();
        })
    };

    useEffect(() => {
        if (visible) {
            form.setFieldsValue({
                title: current.title,
                descriptionpt: current?.description?.pt,
                descriptionpen: current?.description?.en,
                level_id: current.level?.id,
                gas: current.charateristics.find((e) => { return e.name == "gas" }).pivot?.value,
                shift_mode: current.charateristics.find((e) => { return e.name == "shift_mode" }).pivot?.value,
                people: current.charateristics.find((e) => { return e.name == "people" }).pivot?.value,
                doors: current.charateristics.find((e) => { return e.name == "doors" }).pivot?.value,
                air: current.charateristics.filter((e) => { return e.name == "doors" }).length > 0,
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
                        <Instruction>Detalhes da categoria</Instruction>

                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item rules={rules.title} name="title" label="Nome da categoria">
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item rules={rules.level} label="Grupo" name="level_id">
                                    <LevelRemoteSelectContainer />
                                </Form.Item>
                            </Col>

                            <Col span={12}>
                                <Form.Item rules={rules.description} name="descriptionpt" label="Descrição do carro (PT)">
                                    <TextArea />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item rules={rules.description} name="descriptionpen" label="Descrição do carro (EN)">
                                    <TextArea />
                                </Form.Item>
                            </Col>

                            <Col span={6}>
                                <Form.Item rules={rules.gas} label="Sistema de combustível" name="gas">
                                    <Select>
                                        <Option value="gasoline">Gasolina</Option>
                                        <Option value="diesel">Diesel</Option>
                                        <Option value="electric">Elétrico</Option>
                                        <Option value="hybrid">Híbrido</Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item rules={rules.shift_mode} label="Sistema de mudanças" name="shift_mode">
                                    <Select>
                                        <Option value="manual">Manuais</Option>
                                        <Option value="automatic">Automático</Option>
                                    </Select>
                                </Form.Item>
                            </Col>


                            <Col span={6}>
                                <Form.Item rules={rules.people} name="people" label="Capacidade de pessoas">
                                    <InputNumber style={{ width: "100%" }} />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item rules={rules.door} name="doors" label="Nº de portas">
                                    <InputNumber style={{ width: "100%" }} />
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
        updateCarCategory: (id, data) => dispatch(updateCarCategory(id, data)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CarCategoryFormContainer);