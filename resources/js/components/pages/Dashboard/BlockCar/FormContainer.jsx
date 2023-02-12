import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Modal, Row, Form, DatePicker, Button, Col, Alert } from 'antd';
import moment from 'moment';
import { connect } from "react-redux";
import { createBlockCar } from "../../../../redux/blockCar/actions"
import CarRemoteSelectContainer from "../Car/CarRemoteSelectContainer";
import TextArea from "antd/lib/input/TextArea";
import { hasBlock } from "../../../../redux/block/actions";

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




function FormContainer({ blockedDates, loading, handleClose, createBlockCar, visible, hasBlock }) {
    const [form] = Form.useForm();
    const [filters, setFilters] = useState({})

    const handleModalClose = () => {
        form.resetFields();
        handleClose();
    }

    useEffect(() => {
        if (filters.start && filters.end && filters.car_id) {
            hasBlock(filters);
        }
    }, [filters])



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

    console.log(blockedDates);
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
                                        onChange={(e) => setFilters({ ...filters, start: e[0].format("YYYY-MM-DD"), end: e[1].format("YYYY-MM-DD") })}
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
                                    <CarRemoteSelectContainer onChange={(e) => setFilters({ ...filters, car_id: e })} />
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

                        {blockedDates.length ? <Alert
                            showIcon
                            message="Existem reservas com o veículo bloqueado para as datas selecionadas"
                            description={blockedDates.map((record, index) => (
                                <span key={index}>{record.date}, </span>
                            ))}
                            style={{ margin: "20px 0px" }}
                            type="error"
                            closable
                        /> : <></>}


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
        blockedDates: state.block.hasBlock,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        createBlockCar: (data) => dispatch(createBlockCar(data)),
        hasBlock: (filters) => dispatch(hasBlock(filters)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FormContainer);