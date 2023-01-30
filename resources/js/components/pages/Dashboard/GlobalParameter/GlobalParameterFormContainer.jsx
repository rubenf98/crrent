import React, { useEffect } from "react";
import styled from "styled-components";
import { Row, Form, DatePicker, Button, Input, Checkbox, Col, InputNumber, Radio, Switch } from 'antd';
import moment from 'moment';
import { connect } from "react-redux";
import { updateGlobalParameter } from "../../../../redux/globalParameter/actions"
import { SmallPrimaryButton } from "../../../styles";

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
    required: [
        {
            required: true,
            message: 'O campo é obrigatório',
        },
    ],
};

function FormContainer({ loading, handleClose, updateGlobalParameter, data }) {
    const [form] = Form.useForm();

    const handleModalClose = () => {
        form.resetFields();
        handleClose();
    }

    const onFinish = (values) => {
        updateGlobalParameter({ ...values, max_date: moment(values.max_date).format("DD-MM-YYYY") });
        handleModalClose();
    };
    useEffect(() => {
        if (data.length) {
            var init = {};
            data.map((parameter) => {
                var newEntry = parameter.value;
                if (parameter.code == "max_date") {
                    newEntry = moment(newEntry, "DD-MM-YYYY");
                } else if (parameter.code == "enable_reservations") {
                    newEntry = parseInt(parameter.value);
                }
                init[parameter.code] = newEntry;
            })
            console.log(init);
            form.setFieldsValue(init);
        }
    }, [data])


    return (
        <Container>
            {data.length &&
                <Form
                    form={form}
                    name="blockdate"
                    onFinish={onFinish}
                    layout="vertical"
                >
                    <Row gutter={16}>
                        <Col span={24}>
                            <Form.Item valuePropName="checked" label={data.find((e) => { return e.code == "enable_reservations" }).name} name="enable_reservations">
                                <Switch />
                            </Form.Item>
                        </Col>

                        <Col span={6}>
                            <Form.Item rules={rules.required} label={data.find((e) => { return e.code == "min_time" }).name} name="min_time">
                                <InputNumber style={{ width: "100%" }} min={0} max={23} />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item rules={rules.required} label={data.find((e) => { return e.code == "max_time" }).name} name="max_time">
                                <InputNumber style={{ width: "100%" }} min={0} max={23} />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item rules={rules.required} label={data.find((e) => { return e.code == "min_tax_time" }).name} name="min_tax_time">
                                <InputNumber style={{ width: "100%" }} min={0} max={23} />
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item rules={rules.required} label={data.find((e) => { return e.code == "max_tax_time" }).name} name="max_tax_time">
                                <InputNumber style={{ width: "100%" }} min={0} max={23} />
                            </Form.Item>
                        </Col>


                        <Col span={12}>
                            <Form.Item
                                name="max_date"
                                rules={rules.required}
                                label={data.find((e) => { return e.code == "max_date" }).name}
                            >
                                <DatePicker
                                    format="DD-MM-YYYY"
                                    style={{ width: "100%" }}
                                />
                            </Form.Item>
                        </Col>

                        <Col span={12}>
                            <Form.Item rules={rules.required} label={data.find((e) => { return e.code == "max_days" }).name} name="max_days">
                                <InputNumber style={{ width: "100%" }} min={0} />
                            </Form.Item>
                        </Col>



                    </Row>

                    <ButtonContainer type="flex" justify="end">
                        <SmallPrimaryButton disabled={loading} loading={loading}>
                            Atualizar
                        </SmallPrimaryButton>
                    </ButtonContainer>
                </Form>}




        </Container >
    )
}

const mapStateToProps = (state) => {
    return {
        loading: state.globalParameter.loading,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        updateGlobalParameter: (data) => dispatch(updateGlobalParameter(data)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FormContainer);