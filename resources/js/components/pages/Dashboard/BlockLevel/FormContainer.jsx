import React, { Component } from "react";
import styled from "styled-components";
import { Modal, Row, Form, DatePicker, Button, Input, Checkbox, Col } from 'antd';
import moment from 'moment';
import { connect } from "react-redux";
import { createBlockPeriod } from "../../../../redux/blockPeriod/actions"
import TextArea from "antd/lib/input/TextArea";

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
    ]
};

const classes = [
    { id: 1, name: "Gama A" },
    { id: 2, name: "Gama B" },
    { id: 3, name: "Gama C" },
    { id: 4, name: "Gama D" },
];



function FormContainer(props) {
    const [form] = Form.useForm();
    const { loading, visible } = props;
    const handleModalClose = () => {
        form.resetFields();
        props.handleClose();
    }

    const onFinish = (values) => {
        form.validateFields().then((values) => {
            var dates = [];
            values.dates.map((date) => {
                dates.push(moment(date).format("YYYY-MM-DD"));
            })

            values = { ...values, dates };

            props.createBlockPeriod(values);
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
                        <Instruction>Bloqueie uma data ou um conjunto de datas</Instruction>

                        <Form.Item
                            name="dates"
                            label="Período"
                            rules={rules.name}
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

                        <Form.Item
                            name="notes"
                            label="Observações e/ou notas"
                        >
                            <TextArea style={{ width: "100%" }} />
                        </Form.Item>

                        <ButtonContainer type="flex" justify="end">
                            <Button loading={loading} size="large" width="150px" type="primary" htmlType="submit">
                                Bloquear Data(s)
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
        loading: state.blockPeriod.loading,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        createBlockPeriod: (data) => dispatch(createBlockPeriod(data)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FormContainer);