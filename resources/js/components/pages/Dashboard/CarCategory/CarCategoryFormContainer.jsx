import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Modal, Row, Form, Button, Switch, InputNumber, Select, Col, Input, Upload, message } from 'antd';
import { connect } from "react-redux";
import { createCarCategory, updateCarCategory } from "../../../../redux/carCategory/actions"
import LevelRemoteSelectContainer from "../Level/LevelRemoteSelectContainer";
import TextArea from "antd/lib/input/TextArea";


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
    price: [
        {
            required: true,
            message: 'O preço é obrigatório',
        },
    ],
    name: [
        {
            required: true,
            message: 'O título do extra é obrigatório',
        },
    ],
    type: [
        {
            required: true,
            message: 'A tipologia de valor é obrigatória',
        },
    ],
};

function CarCategoryFormContainer({ loading, edit, handleClose, createCarCategory, updateCarCategory, visible, current }) {
    const [form] = Form.useForm();
    const [loadingImage, setLoadingImage] = useState(false);
    const [imageUrl, setImageUrl] = useState();
    const [imageObj, setImageObj] = useState();

    const handleModalClose = () => {
        form.resetFields();
        setImageUrl();
        setImageObj();
        handleClose();
    }

    const onFinish = () => {
        form.validateFields().then((values) => {
            var formData = values;
            if (imageObj && !edit) {
                var formData = new FormData();

                for (var key in values) {

                    if (values[key]) {
                        formData.append(key, values[key]);
                    }

                }
                formData.append('image', imageObj);
            }

            if (edit) {
                updateCarCategory(current.id, values);
            } else {
                createCarCategory(formData);
            }


            handleModalClose();
        })
    };

    useEffect(() => {
        if (visible) {
            if (edit) {
                setImageUrl(current.image);
                form.setFieldsValue({
                    title: current.title,
                    descriptionpt: current?.description?.pt,
                    descriptionen: current?.description?.en,
                    level_id: current.level?.id,
                    gas: current.charateristics.find((e) => { return e.name == "gas" }).pivot?.value,
                    shift_mode: current.charateristics.find((e) => { return e.name == "shift_mode" }).pivot?.value,
                    people: current.charateristics.find((e) => { return e.name == "people" }).pivot?.value,
                    doors: current.charateristics.find((e) => { return e.name == "doors" }).pivot?.value,
                    air: parseInt(current.charateristics.find((e) => { return e.name == "air" }).pivot?.value),
                })
            } else {
                form.setFieldsValue({
                    title: undefined,
                    descriptionpt: undefined,
                    descriptionen: undefined,
                    level_id: undefined,
                    gas: undefined,
                    shift_mode: undefined,
                    people: undefined,
                    doors: undefined,
                    air: undefined,
                })
            }


        }
    }, [visible])

    const getBase64 = (img, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    };

    const beforeUpload = (file) => {
        const isPng = file.type === 'image/png';
        if (!isPng) {
            message.error('Apenas suporta ficheiros PNG!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Imagem deverá ser inferior a 2MB');
        }
        return isPng && isLt2M;
    };

    const handleChange = (info) => {
        getBase64(info.file.originFileObj, (url) => {
            setLoadingImage(false);
            setImageUrl(url);
            setImageObj(info.file.originFileObj);
        });

    };

    const dummyRequest = (file, onSuccess) => {
        setTimeout(() => {
            onSuccess("ok");
        }, 0);
    };

    const uploadButton = (
        <div>
            {loadingImage ? "loading" : "+"}
            <div
                style={{
                    marginTop: 8,
                }}
            >
                Upload
            </div>
        </div>
    );

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
                        <Instruction>Detalhes da categoria</Instruction>

                        <Row gutter={16}>
                            {!edit &&
                                <Col span={24}>
                                    <Upload
                                        name="avatar"
                                        listType="picture-card"
                                        className="avatar-uploader"
                                        showUploadList={false}
                                        beforeUpload={beforeUpload}
                                        onChange={handleChange}
                                        customRequest={dummyRequest}
                                    >
                                        {imageUrl ? (
                                            <img
                                                src={imageUrl}
                                                alt="avatar"
                                                style={{
                                                    width: '100%',
                                                }}
                                            />
                                        ) : (
                                            uploadButton
                                        )}
                                    </Upload>
                                </Col>
                            }
                            <Col span={12}>
                                <Form.Item rules={rules.title} name="title" label="Nome da categoria">
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item rules={rules.level} label="Grupo" name="level_id">
                                    <LevelRemoteSelectContainer />
                                </Form.Item>
                            </Col>

                            <Col span={12}>
                                <Form.Item rules={rules.description} name="descriptionpt" label="Descrição do carro (PT)">
                                    <TextArea />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item rules={rules.description} name="descriptionen" label="Descrição do carro (EN)">
                                    <TextArea />
                                </Form.Item>
                            </Col>

                            <Col span={6}>
                                <Form.Item rules={rules.gas} label="Sistema de combustível" name="gas">
                                    <Select>
                                        <Option value="gasoline">Gasolina</Option>
                                        <Option value="diesel">Diesel</Option>
                                        <Option value="electric">Elétrico</Option>
                                        <Option value="hybrid">Híbrido</Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item rules={rules.shift_mode} label="Sistema de mudanças" name="shift_mode">
                                    <Select>
                                        <Option value="manual">Manuais</Option>
                                        <Option value="automatic">Automático</Option>
                                    </Select>
                                </Form.Item>
                            </Col>


                            <Col span={6}>
                                <Form.Item rules={rules.people} name="people" label="Capacidade de pessoas">
                                    <InputNumber style={{ width: "100%" }} />
                                </Form.Item>
                            </Col>
                            <Col span={6}>
                                <Form.Item rules={rules.door} name="doors" label="Nº de portas">
                                    <InputNumber style={{ width: "100%" }} />
                                </Form.Item>
                            </Col>
                            <Col span={24}>
                                <Form.Item valuePropName="checked" rules={rules.air} name="air" label="A/C">
                                    <Switch />
                                </Form.Item>
                            </Col>

                        </Row>

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
        loading: state.car.loading,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        createCarCategory: (data) => dispatch(createCarCategory(data)),
        updateCarCategory: (id, data) => dispatch(updateCarCategory(id, data)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CarCategoryFormContainer);