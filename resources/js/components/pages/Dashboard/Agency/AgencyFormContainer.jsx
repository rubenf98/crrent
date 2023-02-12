import React, { useEffect } from "react";
import styled from "styled-components";
import { Modal, Row, Form, Button, Input, Col } from 'antd';
import { connect } from "react-redux";
import { updateAgency } from "../../../../redux/agency/actions"


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
    min: [
        {
            required: true,
            message: 'O campo é obrigatório',
        },
    ],
};

function AgencyFormContainer({ loading, handleClose, updateAgency, visible, current }) {
    const [form] = Form.useForm();

    const handleModalClose = () => {
        form.resetFields();
        handleClose();
    }

    const onFinish = () => {
        form.validateFields().then((values) => {
            updateAgency(current.id, values);
            handleModalClose();
        })
    };

    useEffect(() => {
        if (visible) {
            form.setFieldsValue({
                name: current.name,
                intermediary: current.intermediary,
                comission: current.comission,
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
                        <Instruction>Detalhes da agência de comissão</Instruction>

                        <Col span={24}>
                            <Form.Item rules={rules.min} label="Nome do hotel / agência" name="name">
                                <Input />
                            </Form.Item>
                        </Col>


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
        loading: state.price.loading,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        updateAgency: (id, data) => dispatch(updateAgency(id, data)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AgencyFormContainer);