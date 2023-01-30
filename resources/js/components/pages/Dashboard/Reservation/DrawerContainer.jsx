import React, { useEffect, useState } from 'react'
import styled from "styled-components";
import { Col, Drawer, Row } from 'antd';
import { DownloadIcon } from '../../../../icons';
import { connect } from 'react-redux';
import { downloadContract, fetchReservation, downloadInvoice } from '../../../../redux/reservation/actions';
import moment from "moment";

const Section = styled.h3`
    margin-top: 30px;
    font-size: 24px;
    font-weight: bold;
`;

const Field = styled.div`
    padding: 5px 5px 5px 0px;
    box-sizing: border-box;
    display: inline;
    width: ${props => props.width && props.width + " !important"};

    p {
        margin: 0px;
    }

    .value {
        opacity: .7;
    }

    .name {
        
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

const Download = styled.button`
    font-weight: bold;
    display: flex;
    justify-content: center;
    margin-top: 20px;
    gap: 5px;
    cursor: pointer;
    align-items: center;
    font-size: 16px;
    padding: 6px 12px;
    box-sizing: border-box;

    svg {
        width: 16px;
    }

    p {
        margin: 0px;
    }
`;

const levelDecoder = {
    1: "A",
    2: "B",
    3: "C",
    4: "D",
}

function DrawerContainer(props) {
    const { currentId, drawerState, data } = props;

    useEffect(() => {
        if (currentId) {
            props.fetchReservation(currentId);
        }
    }, [currentId])


    const FieldContainer = ({ name, value, width }) => (
        <Field className='field-width' width={width}>
            <p>
                <span className='name'>{name}:</span> <span className='value'>{value}</span>
            </p>

        </Field>
    )

    function EmptyField(field) {
        return field ? field : "N/A"
    }


    return (
        <Drawer closable={false} width={"60%"} open={drawerState} onClose={() => props.setDrawerState(0)}>
            <Row type="flex" dire>
                <Col xs={24}>
                    <Section>Informação geral</Section>
                    <FieldsContainer width="25%">
                        <FieldContainer name="Data da reserva" value={moment(data.created_at).format('DD-MM-YYYY HH:mm')} />
                        <FieldContainer name="Levantamento" value={moment(data.pickup_date).format('DD-MM-YYYY HH:mm') + ", " + data.pickup_place} />
                        <FieldContainer name="Entrega" value={moment(data.return_date).format('DD-MM-YYYY HH:mm') + ", " + data.return_place} />
                        <FieldContainer name="Número de dias" value={data.days} />

                        <FieldContainer name="KM entrega" value={EmptyField(data.kms_pickup)} />
                        <FieldContainer name="KM devolução" value={EmptyField(data.kms_return)} />
                        <FieldContainer name="Combustível entrega" value={EmptyField(data.gas_pickup)} />
                        <FieldContainer name="Combustível devolução" value={EmptyField(data.gas_return)} />

                        <FieldContainer name="Viatura" value={data.car?.category?.title + " (" + data.car?.registration + ")"} />

                        <FieldContainer width="100%" name="Notas" value={EmptyField(data.notes)} />

                    </FieldsContainer>
                </Col>
                <Col xs={12}>
                    <Section>Preçário</Section>
                    <FieldsContainer width="50%">
                        <FieldContainer name="Valor aluguer" value={data.car_price + "€"} />
                        <FieldContainer name="Preço unitário" value={data.car_price_per_day + "€"} />
                        <FieldContainer name="Valor extras/seguro" value={data.price - data.car_price + "€"} />
                        <FieldContainer name="Total" value={data.price + "€"} />
                    </FieldsContainer>
                </Col>

                <Col xs={12}>
                    <Section>Comissão</Section>
                    <FieldsContainer width="50%">
                        <FieldContainer name="Agência" value={EmptyField(data?.comission?.agency?.name)} />
                        <FieldContainer name="Reservado por" value={EmptyField(data?.comission?.intermediary)} />
                        <FieldContainer name="Valor comissão" value={EmptyField(data?.comission?.value)} />
                    </FieldsContainer>
                </Col>
                <Col xs={24}>
                    <Section>Cliente</Section>
                    <FieldsContainer width="25%">
                        <FieldContainer name="Agência" value={EmptyField(data.client?.company)} />
                        <FieldContainer name="Nome" value={data.client?.name} />
                        <FieldContainer name="Telefone" value={data.client?.phone} />
                        <FieldContainer name="Email" value={data.client?.email} />

                        <FieldContainer name="ID/Passporte" value={EmptyField(data.client?.cc)} />
                        <FieldContainer name="NIF" value={EmptyField(data.client?.nif)} />
                        <FieldContainer name="País" value={EmptyField(data.client?.country)} />
                        <FieldContainer name="Morada" value={EmptyField(data.client?.address)} />

                        <FieldContainer name="Código Postal" value={EmptyField(data.client?.postal_code)} />
                        <FieldContainer name="Número de voo" value={EmptyField(data.flight)} />
                        <FieldContainer width="50%" name="Morada de estadia" value={EmptyField(data.address)} />
                    </FieldsContainer>
                </Col>

                <Col span={24}>
                    <Section>Condutor(es)</Section>
                    <Row type="flex" dire>

                        {data.drivers && data.drivers.map((driver, index) => (
                            <Col key={"driver-" + index} span={12}>
                                <h2>{index == 0 ? "Principal" : "Adicional"}</h2>
                                <FieldsContainer width="50%">
                                    <FieldContainer name="Nome" value={EmptyField(driver.name)} />
                                    <FieldContainer name="Data de nascimento" value={EmptyField(driver.birthday)} />
                                    <FieldContainer name="Número carta de condução" value={EmptyField(driver.license)} />
                                    <FieldContainer name="Data de emissão" value={EmptyField(driver.emission)} />
                                    <FieldContainer name="Data de validade" value={EmptyField(driver.validity)} />
                                    <FieldContainer name="Local de emissão" value={EmptyField(driver.emission_place)} />
                                </FieldsContainer>
                            </Col>
                        ))}
                    </Row>
                </Col>

                <Col style={{ marginBottom: "50px" }} span={24}>
                    <Section>Extras e/ou taxas</Section>
                    {data.extras && data.extras.length ?
                        <ul>
                            {data.extras.map((extra, index) => (
                                <li key={"extra-" + index} >
                                    {extra.name.pt}
                                </li>
                            ))}
                        </ul>
                        : <p>N/A</p>
                    }
                </Col>
                <Download onClick={() => props.downloadContract(data.token)}><p>Contrato</p><DownloadIcon /></Download>
                <Download onClick={() => props.downloadInvoice(data.token)}><p>Resumo</p><DownloadIcon /></Download>

            </Row>
        </Drawer>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        downloadInvoice: (token) => dispatch(downloadInvoice(token)),
        downloadContract: (token) => dispatch(downloadContract(token)),
        fetchReservation: (id) => dispatch(fetchReservation(id)),
    };
};

const mapStateToProps = (state) => {
    return {
        loadingDownload: state.reservation.loadingDownload,
        loading: state.reservation.loading,
        data: state.reservation.current,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DrawerContainer);