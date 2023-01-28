import React, { useEffect } from "react";
import styled from "styled-components";
import { Modal, Row, Form, Button } from 'antd';
import { connect } from "react-redux";
import { updateClient } from "../../../../redux/client/actions"
import ClientFormTemplate from "./ClientFormTemplate";


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


function ClientFormContainer({ loading, handleClose, updateClient, visible, current }) {
    const [form] = Form.useForm();

    const handleModalClose = () => {
        form.resetFields();
        handleClose();
    }

    const onFinish = () => {
        form.validateFields().then((values) => {
            updateClient(current.id, values);
            handleModalClose();
        })
    };

    useEffect(() => {
        if (visible) {
            form.setFieldsValue({
                name: current.name,
                email: current.email,
                phone: current.phone,
                company: current.company,
                nif: current.nif,
                cc: current.cc,
                country: current.country,
                address: current.address,
                postal_code: current.postal_code,
                client_notes: current.notes
            })
        }
    }, [visible])

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
                        <Instruction>Detalhes do cliente</Instruction>

                        <ClientFormTemplate />

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
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        updateClient: (id, data) => dispatch(updateClient(id, data)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ClientFormContainer);