import React, { useEffect } from "react";
import styled from "styled-components";
import { Modal, Row, Form, Button, Input, Col } from 'antd';
import { connect } from "react-redux";
import { updatePrice } from "../../../../redux/agency/actions"


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
    factor: [
        {
            required: true,
            message: 'O preço é obrigatório',
        },
    ],
    min: [
        {
            required: true,
            message: 'O valor de dias mínimo é obrigatório',
        },
    ],
    factor: [
        {
            required: true,
            message: 'O valor de dias máximo é obrigatório',
        },
    ],
};

function AgencyFormContainer({ loading, handleClose, updatePrice, visible, current }) {
    const [form] = Form.useForm();

    const handleModalClose = () => {
        form.resetFields();
        handleClose();
    }

    const onFinish = () => {
        form.validateFields().then((values) => {
            console.log(current.id)
            updatePrice(current.id, values);
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
        updatePrice: (id, data) => dispatch(updatePrice(id, data)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AgencyFormContainer);