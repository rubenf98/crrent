import React, { useEffect } from "react";
import styled from "styled-components";
import { Modal, Row, Form, Button, Input, Col, InputNumber, Select, Checkbox } from 'antd';
import { connect } from "react-redux";
import { createLocalization, updateLocalization } from "../../../../redux/localization/actions"


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
            message: 'O título do Localization é obrigatório',
        },
    ],
};

function LocalizationFormContainer({ loading, edit, handleClose, updateLocalization, visible, current, createLocalization }) {
    const [form] = Form.useForm();

    const handleModalClose = () => {
        form.resetFields();
        handleClose();
    }

    const onFinish = () => {
        form.validateFields().then((values) => {
            if (edit) {
                updateLocalization(current.id, values);
            } else {
                createLocalization(values);
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
                    visible: current.visible,
                    nameen: current.name.en,
                })
            } else {
                form.setFieldsValue({
                    price: undefined,
                    namept: undefined,
                    visible: undefined,
                    nameen: undefined,
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
                        name="Localization"
                        onFinish={onFinish}
                        layout="vertical"
                    >
                        <Instruction>{edit ? "Altere os valores da localização" : "Introduca uma nova localização"}</Instruction>

                        <Row gutter={16}>
                            <Col span={8}>
                                <Form.Item rules={rules.name} name="namept" label="Título (PT)">
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item rules={rules.name} name="nameen" label="Título (EN)">
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item rules={rules.price} label="Preço" name="price">
                                    <InputNumber style={{ width: "100%" }} min={0} />
                                </Form.Item>
                            </Col>
                            <Col span={24}>
                                <Form.Item valuePropName="checked" name="visible">
                                    <Checkbox>Visível na listagem do formulário de reservas</Checkbox>
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
        loading: state.localization.loading,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        updateLocalization: (id, data) => dispatch(updateLocalization(id, data)),
        createLocalization: (data) => dispatch(createLocalization(data)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LocalizationFormContainer);