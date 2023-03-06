import React, { useEffect } from "react";
import styled from "styled-components";
import { Modal, Row, Form, DatePicker, Button, Input, Checkbox, Col, InputNumber } from 'antd';
import moment from 'moment';
import { connect } from "react-redux";
import { createPromotion, updatePromotion } from "../../../../redux/promotion/actions"

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
    value: [
        {
            required: true,
            message: 'O valor promocional é obrigatório',
        },
    ]
};

const classes = [
    { id: 1, name: "Gama A" },
    { id: 2, name: "Gama B" },
    { id: 3, name: "Gama C" },
    { id: 4, name: "Gama D" },
];

function FormContainer({ loading, handleClose, edit, current, createPromotion, visible, updatePromotion }) {
    const [form] = Form.useForm();

    const handleModalClose = () => {
        form.resetFields();
        handleClose();
    }

    const onFinish = (values) => {
        form.validateFields().then((values) => {
            var dates = [];

            values.dates.map((date) => {
                dates.push(moment(date).format("YYYY-MM-DD"));
            })

            values = { ...values, dates };

            if (edit) {
                updatePromotion(current.id, values);
            } else {
                createPromotion(values);
            }
            handleModalClose();
        })
    };

    useEffect(() => {
        if (visible) {
            console.log(current);
            if (edit) {
                form.setFieldsValue({
                    dates: [moment(current.start), moment(current.end)],
                    priority: current.priority,
                    value: current.value.replace('%', ''),
                    levels: {   
                        0: null,
                        1: current.levels.find((record) => record.id == 1),
                        2: current.levels.find((record) => record.id == 2),
                        3: current.levels.find((record) => record.id == 3),
                        4: current.levels.find((record) => record.id == 4),
                    }
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
                        name="blockdate"
                        onFinish={onFinish}
                        layout="vertical"
                    >
                        <Instruction>Defina os fatores de modificação dos preços</Instruction>

                        <Form.Item
                            name="dates"
                            rules={rules.name}
                            label="Período"
                        >
                            <RangePicker
                                format="DD-MM-YYYY"
                                disabledDate={(currentDate) => {
                                    return currentDate && (
                                        (currentDate < moment().startOf('day'))
                                    );
                                }}
                                style={{ width: "100%" }}
                            />
                        </Form.Item>

                        <Row gutter={16}>
                            <Col span={12}>
                                <Form.Item rules={rules.value} label="Valor promocional (%)" name="value">
                                    <InputNumber addonAfter="%" placeholder="Ex. 50" style={{ width: "100%" }} />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="Nível de prioridade" name="priority">
                                    <InputNumber style={{ width: "100%" }} min={1} />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Form.List name="levels" >
                            {() => (
                                <Row>
                                    {classes.map((item) => (
                                        <Col xs={12} sm={6} key={item.id}>
                                            <Form.Item initialValue={true} name={item.id} valuePropName="checked">
                                                <Checkbox>{item.name}</Checkbox>
                                            </Form.Item>
                                        </Col>
                                    ))}
                                </Row>
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
        loading: state.promotion.loading,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        createPromotion: (data) => dispatch(createPromotion(data)),
        updatePromotion: (id, data) => dispatch(updatePromotion(id, data)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FormContainer);