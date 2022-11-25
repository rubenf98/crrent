import React from 'react'
import styled from "styled-components";
import { Col, Drawer, Row } from 'antd';

const Section = styled.h3`
    margin-top: 30px;
    font-size: 24px;
    font-weight: bold;
`;

const Field = styled.div`
    padding: 5px 5px 5px 0px;
    box-sizing: border-box;
    font-family: "Lato";

    p {
        margin: 0px;
    }

    .value {
    }

    .name {
        opacity: .5;
    }
`;

const FieldsContainer = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    flex-wrap: wrap;

    .field-width {
        width: ${props => props.width};
    }
`;

const levelDecoder = {
    1: "A",
    2: "B",
    3: "C",
    4: "D",
}

function DrawerContainer({ data, drawerState, setDrawerState }) {

    const FieldContainer = ({ name, value }) => (
        <Field className='field-width'>
            <p className='value'>{value}</p>
            <p className='name'>{name}</p>
        </Field>
    )

    function EmptyField(field) {
        return field ? field : "---"
    }

    return (
        <Drawer closable={false} width={"60%"} open={drawerState} onClose={() => setDrawerState(0)}>
            <Row type="flex" dire>
                <Col xs={24} md={12}>
                    <Section>Informação geral</Section>
                    <FieldsContainer width="50%">
                        <FieldContainer name="Data de levantamento" value={data.pickup_date} />
                        <FieldContainer name="Data de devolução" value={data.return_date} />
                        <FieldContainer name="Local de levantamento" value={data.pickup_place} />
                        <FieldContainer name="Local de devolução" value={data.return_place} />
                        <FieldContainer name="Número de voo" value={data.flight} />
                        <FieldContainer name="Carro preferencial" value={data.car?.title} />
                        <FieldContainer name="Gama" value={levelDecoder[data.car?.level_id]} />
                        <FieldContainer name="Preço" value={data.price + "€"} />
                    </FieldsContainer>
                </Col>
                <Col xs={24} md={12}>
                    <Section>Cliente</Section>
                    <FieldsContainer width="50%">
                        <FieldContainer name="Agência" value={data.client?.company} />
                        <FieldContainer name="Nome" value={data.client?.name} />
                        <FieldContainer name="Telefone" value={data.client?.phone} />
                        <FieldContainer name="Email" value={data.client?.email} />
                        <FieldContainer name="ID/Passporte" value={data.client?.cc} />
                        <FieldContainer name="NIF" value={data.client?.nif} />
                        <FieldContainer name="País" value={data.client?.country} />
                        <FieldContainer name="Morada" value={data.client?.address} />
                        <FieldContainer name="Endereço local" value={data.client?.local_address} />
                        <FieldContainer name="Código Postal" value={data.client?.postal_code} />
                    </FieldsContainer>
                </Col>

                <Col span={24}>
                    <Section>Condutores</Section>
                    <Row type="flex" dire>

                        {data.drivers && data.drivers.map((driver, index) => (
                            <Col key={"driver-" + index} span={12}>
                                <h2>{index == 0 ? "Condutor Principal" : "Condutor Adicional"}</h2>
                                <FieldsContainer width="50%">
                                    <FieldContainer name="Nome" value={driver.name} />
                                    <FieldContainer name="Data de nascimento" value={driver.birthday} />
                                    <FieldContainer name="Número carta de condução" value={driver.license} />
                                    <FieldContainer name="Data de emissão" value={driver.emission} />
                                    <FieldContainer name="Data de validade" value={driver.validity} />
                                    <FieldContainer name="Local de emissão" value={driver.emission_place} />
                                </FieldsContainer>
                            </Col>
                        ))}
                    </Row>
                </Col>

                <Col span={24}>
                    <Section>Extras/Taxas</Section>
                    <ul>
                        {data.extras && data.extras.map((extra, index) => (
                            <li key={"extra-" + index} >
                                {extra.name}
                            </li>
                        ))}
                    </ul>
                </Col>
            </Row>
        </Drawer>
    )
}

export default DrawerContainer