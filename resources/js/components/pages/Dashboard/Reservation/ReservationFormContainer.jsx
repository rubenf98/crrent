import React, { useEffect } from "react";
import styled from "styled-components";
import { Modal, Row, Form, Button, Input, Col, DatePicker, InputNumber } from 'antd';
import { connect } from "react-redux";
import { updateReservation } from "../../../../redux/reservation/actions"
import { fetchExtras } from "../../../../redux/extra/actions"
import TextArea from "antd/lib/input/TextArea";
import moment from "moment";
import ExtraRemoteSelectContainer from "../Extra/ExtraRemoteSelectContainer";
import CarRemoteSelectContainer from "../Car/CarRemoteSelectContainer";
import { getDaysDifference } from "../../../functions";

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
    required: [
        {
            required: true,
            message: 'O campo é obrigatório',
        },
    ],
    email: [
        {
            type: "email",
            message: 'O campo não corresponde a um email',
        },
    ],
    factor: [
        {
            required: true,
            message: 'O valor de dias máximo é obrigatório',
        },
    ],
};

function ReservationFormContainer(props) {
    const [form] = Form.useForm();
    const { loading,
        visible,
        current, extras } = props;

    const handleModalClose = () => {
        form.resetFields();
        props.handleClose();
    }

    const onFinish = () => {
        form.validateFields().then((values) => {
            props.updateReservation(current.id, values);
            handleModalClose();
        })
    };

    const handleDateChange = (value, field) => {
        var dates = form.getFieldsValue(['pickup_date', 'return_date']);
        dates[field] = value;
        var days = getDaysDifference(dates.pickup_date, dates.return_date);
        form.setFieldValue('days', days);
    }

    useEffect(() => {
        if (visible) {
            var initExtras = [];
            extras.map((extra) => {
                if (current.extras.some(e => e.id === extra.id)) {
                    initExtras.push(extra.id);
                }
            })
            form.setFieldsValue({
                pickup_date: moment(current.pickup_date),
                return_date: moment(current.return_date),
                pickup_place: current.pickup_place,
                return_place: current.return_place,
                car_price: current.car_price,
                car_price_per_day: current.car_price_per_day,
                flight: current.flight,
                address: current.address,
                price: current.price,
                notes: current.notes,
                days: current.days,
                car_id: current.car.id,
                kms_pickup: current.kms_pickup,
                kms_return: current.kms_return,
                gas_pickup: current.gas_pickup,
                gas_return: current.gas_return,
                extras: initExtras
            })
        }
    }, [visible, extras])

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
                        <Instruction>Detalhes da reserva</Instruction>

                        <Row gutter={16} type="flex" align="bottom">
                            <Col span={6}>
                                <Form.Item rules={rules.required} label="Data de entrega" name="pickup_date">
                                    <DatePicker minuteStep={15} showTime format="DD-MM-YYYY HH:mm" onChange={(e) => handleDateChange(e, "pickup_date")} allowClear={false} style={{ width: "100%" }} />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item rules={rules.required} label="Local de entrega" name="pickup_place">
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item rules={rules.required} label="Data de devolução" name="return_date">
                                    <DatePicker minuteStep={15} showTime format="DD-MM-YYYY HH:mm" onChange={(e) => handleDateChange(e, "return_date")} allowClear={false} style={{ width: "100%" }} />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item rules={rules.required} label="Local de devolução" name="return_place">
                                    <Input />
                                </Form.Item>
                            </Col>

                            <Col span={6}>
                                <Form.Item rules={rules.required} label="Nº de dias" name="days">
                                    <InputNumber disabled style={{ width: "100%" }} />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item rules={rules.required} label="Valor aluguer" name="car_price">
                                    <InputNumber addonAfter="€" style={{ width: "100%" }} />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item rules={rules.required} label="Preço unitário" name="car_price_per_day">
                                    <InputNumber addonAfter="€" style={{ width: "100%" }} />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item rules={rules.required} label="Total" name="price">
                                    <InputNumber addonAfter="€" style={{ width: "100%" }} />
                                </Form.Item>
                            </Col>

                            <Col span={6}>
                                <Form.Item label="KM entrada" name="kms_pickup">
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item label="KM saída" name="kms_return">
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item label="Combustível entrada" name="gas_pickup">
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item label="Combustível saída" name="gas_return">
                                    <Input />
                                </Form.Item>
                            </Col>


                            <Col span={12}>
                                <Form.Item rules={rules.required} label="Morada da estadia" name="address">
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="Nº de voo" name="flight">
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="Extras" name="extras">
                                    <ExtraRemoteSelectContainer />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item rules={rules.required} label="Veículo" name="car_id">
                                    <CarRemoteSelectContainer />
                                </Form.Item>
                            </Col>


                            <Col span={24}>
                                <Form.Item label="Notas" name="notes">
                                    <TextArea />
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
        extras: state.extra.data,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        updateReservation: (id, data) => dispatch(updateReservation(id, data)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ReservationFormContainer);