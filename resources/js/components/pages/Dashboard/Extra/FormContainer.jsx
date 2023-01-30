import React, { useEffect } from "react";
import styled from "styled-components";
import { Modal, Row, Form, Button, Input, Col, InputNumber, Select } from 'antd';
import { connect } from "react-redux";
import { createExtra, updateExtra } from "../../../../redux/extra/actions"


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

function FormContainer({ loading, edit, handleClose, updateExtra, visible, current, createExtra }) {
    const [form] = Form.useForm();

    const handleModalClose = () => {
        form.resetFields();
        handleClose();
    }

    const onFinish = () => {
        form.validateFields().then((values) => {
            if (edit) {
                updateExtra(current.id, values);
            } else {
                createExtra(values);
            }

            handleModalClose();
        })
    };

    useEffect(() => {
        if (visible && edit) {
            if (edit) {
                form.setFieldsValue({
                    price: current.price,
                    namept: current.name.pt,
                    nameen: current.name.en,
                    type: current.type,
                })
            } else {
                form.setFieldsValue({
                    price: undefined,
                    nameen: undefined,
                    namept: undefined,
                    type: undefined,
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
                        <Instruction>{edit ? "Altere os valores do extra" : "Introduca um novo extra"}</Instruction>


                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item rules={rules.name} name="namept" label="Título (PT)">
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item rules={rules.name} name="nameen" label="Título (EN)">
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item rules={rules.type} label="Tipologia" name="type">
                                    <Select>
                                        <Option value="day">valor por dia</Option>
                                        <Option value="uni">valor por unidade</Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item rules={rules.price} label="Preço" name="price">
                                    <InputNumber style={{ width: "100%" }} min={0} />
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
        loading: state.extra.loading,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        updateExtra: (id, data) => dispatch(updateExtra(id, data)),
        createExtra: (data) => dispatch(createExtra(data)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FormContainer);