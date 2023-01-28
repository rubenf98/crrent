import React, { useEffect } from "react";
import styled from "styled-components";
import { Modal, Row, Form, Button, Input, Col, InputNumber } from 'antd';
import { connect } from "react-redux";
import { updateComission, createComission } from "../../../../redux/comission/actions"
import AgencyRemoteSelectContainer from "../Agency/AgencyRemoteSelectContainer";
import ComissionFormTemplate from "./ComissionFormTemplate";


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



function ComissionFormContainer(props) {
    const [form] = Form.useForm();
    const { edit, visible, current, loading } = props;

    const handleModalClose = () => {
        form.resetFields();
        props.handleClose();
    }

    const onFinish = () => {
        form.validateFields().then((values) => {
            if (edit) {
                props.updateComission(current.id, values);
            } else {
                props.createComission(values);
            }
            handleModalClose();
        })
    };

    useEffect(() => {
        if (visible) {
            form.setFieldsValue({
                agency_id: current?.agency_id,
                intermediary: current?.intermediary,
                value: current?.value,
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
                        <Instruction>Detalhes de comissão</Instruction>

                        <ComissionFormTemplate />


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
        loading: state.comission.loading,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        updateComission: (id, data) => dispatch(updateComission(id, data)),
        createComission: (data) => dispatch(createComission(data)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ComissionFormContainer);