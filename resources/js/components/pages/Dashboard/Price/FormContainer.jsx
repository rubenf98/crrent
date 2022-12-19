import React, { useEffect } from "react";
import styled from "styled-components";
import { Modal, Row, Form, Button, Input, Col, InputNumber } from 'antd';
import { connect } from "react-redux";
import { updatePrice } from "../../../../redux/price/actions"


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
    factor: [
        {
            required: true,
            message: 'O preço é obrigatório',
        },
    ],
    min: [
        {
            required: true,
            message: 'O valor de dias mínimo é obrigatório',
        },
    ],
    factor: [
        {
            required: true,
            message: 'O valor de dias máximo é obrigatório',
        },
    ],
};

function FormContainer({ loading, handleClose, updatePrice, visible, current }) {
    const [form] = Form.useForm();

    const handleModalClose = () => {
        form.resetFields();
        handleClose();
    }

    const onFinish = () => {
        form.validateFields().then((values) => {
            console.log(current.id)
            updatePrice(current.id, values);
            handleModalClose();
        })
    };

    useEffect(() => {
        if (visible) {
            form.setFieldsValue({
                price: current.price,
                min: current.min,
                max: current.max,
                level: current.level?.name + " - " + current.level?.code
            })
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
                        name="blockdate"
                        onFinish={onFinish}
                        layout="vertical"
                    >
                        <Instruction>Redefina os preços base</Instruction>

                        <Form.Item name="level" label="Grupo de viaturas">
                            <Input disabled />
                        </Form.Item>

                        <Row gutter={16}>
                            <Col span={8}>
                                <Form.Item rules={rules.min} label="Desde" name="min">
                                    <Input placeholder="Ex. 2" />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item rules={rules.max} label="Até" name="max">
                                    <Input placeholder="Ex. 6" />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item rules={rules.factor} label="Preço" name="price">
                                    <InputNumber placeholder="Ex. 0.6" style={{ width: "100%" }} min={0} />
                                </Form.Item>
                            </Col>
                        </Row>

                        <p>Para o caso "mais de 15 dias", definir o valor máximo para 10000 dias, caso contrário algumas funcionalidades deixarão de funcionar.</p>

                        <ButtonContainer type="flex" justify="end">
                            <Button disabled={loading} loading={loading} size="large" width="150px" type="primary" htmlType="submit">
                                Alterar Preço
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
        loading: state.price.loading,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        updatePrice: (id, data) => dispatch(updatePrice(id, data)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FormContainer);