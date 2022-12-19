import React from "react";
import styled from "styled-components";
import { Modal, Row, Form, DatePicker, Button, Input, Checkbox, Col, InputNumber } from 'antd';
import moment from 'moment';
import { connect } from "react-redux";
import { createPromotion } from "../../../../redux/promotion/actions"

const { RangePicker } = DatePicker;


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
    name: [
        {
            required: true,
            message: 'Selecione as datas que pretende bloquear',
        },
    ],
    factor: [
        {
            required: true,
            message: 'O factor de multiplicação é obrigatório',
        },
    ],
    value: [
        {
            required: true,
            message: 'O valor promocional é obrigatório',
        },
    ]
};

function FormContainer({ loading, handleClose, createPromotion, visible }) {
    const [form] = Form.useForm();

    const handleModalClose = () => {
        form.resetFields();
        handleClose();
    }

    const onFinish = (values) => {
        form.validateFields().then((values) => {
            var dates = [];

            values.dates.map((date) => {
                dates.push(moment(date).format("DD-MM-YYYY"));
            })

            values = { ...values, dates };

            createPromotion(values);
            handleModalClose();
        })
    };

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
                        <Instruction>Defina os fatores de multiplicação dos preços</Instruction>

                        <Form.Item
                            name="dates"
                            rules={rules.name}
                        >
                            <RangePicker
                                format="DD-MM-YYYY"
                                disabledDate={(currentDate) => {
                                    return currentDate && (
                                        (currentDate < moment())
                                    );
                                }}
                                style={{ width: "100%" }}
                            />
                        </Form.Item>

                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item rules={rules.value} label="Valor promocional" name="value">
                                    <Input placeholder="Ex. 40%" />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item rules={rules.factor} label="Factor de multiplicação" name="factor">
                                    <InputNumber placeholder="Ex. 0.6" style={{ width: "100%" }} max={10} min={0} />
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
        loading: state.promotion.loading,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        createPromotion: (data) => dispatch(createPromotion(data)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FormContainer);