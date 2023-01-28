import { Col, Form, Input, Row, DatePicker } from 'antd'
import React, { useState, useEffect } from 'react'
import styled from "styled-components";

export const Add = styled.div`
    background-color: white;
    border: 2px solid;
    border-color: ${({ theme }) => theme.primary};
    cursor: pointer;
    color:  ${({ theme }) => theme.primary};
    box-sizing: border-box;
    font-weight: bold;
    cursor: pointer;
    transition: all .3s ease;
    padding: 6px 12px;
    font-size: 14px;
    text-transform: capitalize;
    cursor: pointer;

    &:hover {
        color: ${({ theme }) => theme.primaryHover};
        border-color: ${({ theme }) => theme.primaryHover};

        p, a {
            margin: 0px;
            color: white
        }
    }

`;

function DriverFormTemplate({ init }) {
    const [drivers, setDrivers] = useState(0);

    useEffect(() => {
        setDrivers(init);
    }, [init])

    return (
        <>
            <Form.List name="drivers">
                {() => (
                    <>
                        {[...Array(drivers)].map((p, key) =>
                            <Form.List key={key} name={key}>
                                {() => (
                                    <Row type="flex" gutter={16}>
                                        <Col xs={24} md={8}>
                                            <Form.Item label="Nome" name='name'>
                                                <Input />
                                            </Form.Item>
                                        </Col>
                                        <Col xs={24} md={8}>
                                            <Form.Item label="Data de nascimento" name='birthday'>
                                                <DatePicker style={{ width: "100%" }} format="DD-MM-YYYY" />
                                            </Form.Item>
                                        </Col>
                                        <Col xs={24} md={8}>
                                            <Form.Item label="Número Carta Condução" name='license'>
                                                <Input />
                                            </Form.Item>
                                        </Col>
                                        <Col xs={24} md={8}>
                                            <Form.Item label="Data de Emissão" name='emission'>
                                                <DatePicker style={{ width: "100%" }} format="DD-MM-YYYY" />
                                            </Form.Item>
                                        </Col>
                                        <Col xs={24} md={8}>
                                            <Form.Item label="Data de validade" name='validity'>
                                                <DatePicker style={{ width: "100%" }} format="DD-MM-YYYY" />
                                            </Form.Item>
                                        </Col>
                                        <Col xs={24} md={8}>
                                            <Form.Item label="Local de Emissão" name='emission_place'>
                                                <Input />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                )}
                            </Form.List>

                        )}
                    </>
                )}
            </Form.List>
            <Row>
                <Add onClick={() => setDrivers(drivers + 1)} >
                    Adicionar condutor
                </Add>
            </Row>
        </>
    )
}

export default DriverFormTemplate