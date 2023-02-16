import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Modal, Row, Form, Button, Input, Col, DatePicker, InputNumber } from 'antd';
import { connect } from "react-redux";
import { createExternalReservation, updateReservation } from "../../../../redux/reservation/actions"
import TextArea from "antd/lib/input/TextArea";
import moment from "moment";
import ExtraRemoteSelectContainer from "../Extra/ExtraRemoteSelectContainer";
import CarRemoteSelectContainer from "../Car/CarRemoteSelectContainer";
import InsuranceRemoteSelectContainer from "../Insurance/InsuranceRemoteSelectContainer";
import { getDaysDifference } from "../../../functions";
import ClientFormTemplate from "../Client/ClientFormTemplate";
import ComissionFormTemplate from "../Comission/ComissionFormTemplate";
import DriverFormTemplate from "../Driver/DriverFormTemplate";
import LocalizationRemoteSelectContainer from "../Localization/LocalizationRemoteSelectContainer";
import { formWidth } from "../../../helper";

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
    const [currentDates, setCurrentDates] = useState({})
    const { loading,
        visible,
        current, extras, edit, localizations } = props;

    const handleModalClose = () => {
        form.resetFields();
        setCurrentDates({});
        props.handleClose();
    }

    const onFinish = () => {
        form.validateFields().then((values) => {
            edit ?
                props.updateReservation(current.id, values)
                : props.createExternalReservation(values);
            handleModalClose();
            location.reload();
        })
    };

    const handleDateChange = (value, field) => {
        var dates = form.getFieldsValue(['pickup_date', 'return_date']);
        setCurrentDates(dates);
        dates[field] = value;
        var days = getDaysDifference(dates.pickup_date, dates.return_date);
        form.setFieldsValue({ days: days, car_id: undefined });
    }

    useEffect(() => {
        if (visible && edit) {
            var initExtras = [];
            extras.map((extra) => {
                if (current.extras.some(e => e.id === extra.id)) {
                    initExtras.push(extra.id);
                }
            })

            var initDrivers = [];
            current.drivers.map((driver) => {

                initDrivers.push({
                    ...driver,
                    birthday: driver.birthday ? moment(driver.birthday) : undefined,
                    emission: driver.emission ? moment(driver.emission) : undefined,
                    validity: driver.validity ? moment(driver.validity) : undefined
                });

            })
            form.setFieldsValue({
                pickup_date: moment(current.pickup_date),
                return_date: moment(current.return_date),
                pickup_place: current.pickup_place,
                return_place: current.return_place,
                car_price: current.car_price,
                car_price_per_day: current.car_price_per_day,
                flight: current.flight,
                local_address: current.local_address,
                insurance_id: current?.insurance.id,
                price: current.price,
                notes: current.notes,
                payment_method: current.payment_method,
                days: current.days,
                car_id: current.car.id,
                kms_pickup: current.kms_pickup,
                kms_return: current.kms_return,
                gas_pickup: current.gas_pickup,
                gas_return: current.gas_return,
                extras: initExtras,
                drivers: initDrivers,
                localizations_0: current?.localizations[0]?.id,
                localizations_1: current?.localizations[1]?.id,

                agency_id: current?.comission?.agency_id,
                intermediary: current?.comission?.intermediary,
                value: current?.comission?.value,
                paid: current?.comission?.paid,

                name: current?.client?.name,
                cc: current?.client?.cc,
                email: current?.client?.email,
                phone: current?.client?.phone,
                nif: current?.client?.nif,
                company: current?.client?.company,
                country: current?.client?.country,
                postal_code: current?.client?.postal_code,
                address: current?.client?.address,
                client_notes: current?.client?.notes,
            })
        }
    }, [visible, extras])

    return (
        <Container>
            <div>
                <Modal
                    width={formWidth}
                    onCancel={handleModalClose}
                    open={visible}
                    footer={null}
                >
                    <Form
                        form={form}
                        name="reservation"
                        onFinish={onFinish}
                        layout="vertical"
                    >
                        <Instruction>Detalhes da reserva</Instruction>

                        <Row gutter={16} type="flex" align="bottom">
                            <Col span={12}>
                                <Form.Item rules={rules.required} label="Data de entrega" name="pickup_date">
                                    <DatePicker minuteStep={15} showTime format="DD-MM-YYYY HH:mm" onChange={(e) => handleDateChange(e, "pickup_date")} allowClear={false} style={{ width: "100%" }} />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item rules={rules.required} label="Data de devolução" name="return_date">
                                    <DatePicker
                                        minuteStep={15}
                                        showTime
                                        format="DD-MM-YYYY HH:mm"
                                        onChange={(e) => handleDateChange(e, "return_date")}
                                        allowClear={false}
                                        style={{ width: "100%" }}
                                        disabledDate={(current) => {
                                            var date = form.getFieldValue(['pickup_date']);

                                            if (date) {
                                                return current && current < date;
                                            }
                                            return false;
                                        }}
                                    />
                                </Form.Item>
                            </Col>

                            <Col span={6}>
                                <Form.Item rules={rules.required} label="Local de entrega" name="pickup_place">
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item rules={rules.required} label="Taxa de entrega" name="localizations_0">
                                    <LocalizationRemoteSelectContainer />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item rules={rules.required} label="Local de devolução" name="return_place">
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item rules={rules.required} label="Taxa de devolução" name="localizations_1">
                                    <LocalizationRemoteSelectContainer />
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

                            {edit ? <>
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
                            </>
                                : <></>}

                            <Col span={24}>
                                <Form.Item rules={rules.required} label="Método de pagamento" name="payment_method">
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item label="Nº de voo" name="flight">
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item label="Extras" name="extras">
                                    <ExtraRemoteSelectContainer />
                                </Form.Item>
                            </Col>

                            <Col span={6}>
                                <Form.Item rules={rules.required} label="Veículo" name="car_id">
                                    <CarRemoteSelectContainer dates={currentDates} visible={visible} />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item rules={rules.required} label="Seguro" name="insurance_id">
                                    <InsuranceRemoteSelectContainer />
                                </Form.Item>
                            </Col>


                            <Col span={12}>
                                <Form.Item rules={rules.required} label="Morada da estadia" name="local_address">
                                    <TextArea />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item label="Notas" name="notes">
                                    <TextArea />
                                </Form.Item>
                            </Col>
                        </Row>

                        <Instruction>Detalhes de comissão</Instruction>
                        <ComissionFormTemplate />

                        <Instruction>Detalhes do cliente</Instruction>
                        <ClientFormTemplate />

                        <Instruction>Detalhes do(s) condutore(s)</Instruction>
                        <DriverFormTemplate init={current.drivers ? current.drivers.length : 0} />

                        <ButtonContainer type="flex" justify="end">
                            <Button disabled={loading} loading={loading} size="large" width="150px" type="primary" htmlType="submit">
                                {edit ? "Atualizar" : "Criar"}
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
        createExternalReservation: (data) => dispatch(createExternalReservation(data)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ReservationFormContainer);