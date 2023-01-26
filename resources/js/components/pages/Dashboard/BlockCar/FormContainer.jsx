import React from "react";
import styled from "styled-components";
import { Modal, Row, Form, DatePicker, Button, Col } from 'antd';
import moment from 'moment';
import { connect } from "react-redux";
import { createBlockCar } from "../../../../redux/blockCar/actions"
import CarRemoteSelectContainer from "../Car/CarRemoteSelectContainer";
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
    ],
    car: [
        {
            required: true,
            message: 'Selecione o carro pretende bloquear',
        },
    ]
};




function FormContainer({ loading, handleClose, createBlockCar, visible }) {
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

            createBlockCar(values);
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
                        <Row gutter={12}>
                            <Col xs={24} md={12}>
                                <Form.Item
                                    name="dates"
                                    rules={rules.name}
                                    label="Data(s)"
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
                            </Col>
                            <Col xs={24} md={12}>
                                <Form.Item
                                    name="car_id"
                                    rules={rules.car}
                                    label="Veículo"
                                >
                                    <CarRemoteSelectContainer />
                                </Form.Item>
                            </Col>

                            <Col xs={24} md={24}>
                                <Form.Item
                                    name="notes"
                                    label="Notas e/ou observações"
                                >
                                    <TextArea />
                                </Form.Item>
                            </Col>
                        </Row>

                        <ButtonContainer type="flex" justify="end">
                            <Button loading={loading} size="large" width="150px" type="primary" htmlType="submit">
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
        loading: state.blockCar.loading,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        createBlockCar: (data) => dispatch(createBlockCar(data)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FormContainer);