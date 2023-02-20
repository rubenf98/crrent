import React, { useEffect, useState } from 'react'
import styled from "styled-components";
import { Col, Drawer, Row, Tag } from 'antd';
import { DownloadIcon } from '../../../../icons';
import { connect } from 'react-redux';
import { downloadContract, fetchReservation, downloadInvoice } from '../../../../redux/reservation/actions';
import moment from "moment";
import { SmallPrimaryButton, SmallSecundaryButton } from '../../../styles';
import { Link } from 'react-router-dom';

const Section = styled.div`
    margin-top: 30px;

    h3 {
        font-size: 24px;
        font-weight: bold;
        margin-bottom: 0px;
    }
    
    .underline {
        width: 60px;
        height: 4px;
        background-color: ${({ theme }) => theme.primary} ;
        margin-bottom: 30px;
    }
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
    border-bottom: 1px solid #e6e6e6;
    padding-bottom: 35px;
    box-sizing: border-box;

    .field-width {
        width: ${props => props.width};
    }
`;

const Download = styled.div`
    font-weight: bold;
    display: flex;
    justify-content: center;
    gap: 5px;
    align-items: center;
    font-size: 16px;
    box-sizing: border-box;

    svg {
        width: 16px;
        fill: ${props => props.primary ? "#fff" : "#7b2cbf"} ;
    }

    p {
        margin: 0px;
        color: ${props => props.primary ? "#fff" : "#7b2cbf"} ;
    }

    &:hover {
        p {
            color: ${props => props.primary ? "#fff" : "#7b2cbf"} ;
        }  
    }
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-top: 10px;
    gap: 15px;
    width: 100%;

    
`;

const Url = styled(Link)`
    img {
        width: 15px;
        height: 15px;
    }
    
`;

function DrawerContainer(props) {
    const { currentId, drawerState, data } = props;

    useEffect(() => {
        if (currentId && drawerState) {
            props.fetchReservation(currentId);
        }
    }, [currentId, drawerState])


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
        <Drawer destroyOnClose closable={false} width={"60%"} open={drawerState} onClose={() => props.setDrawerState(0)}>
            <Row type="flex" dire>
                <Col xs={24}>

                    <Section><h3>Informação geral</h3> <div className='underline' /></Section>

                    <FieldsContainer width="25%">
                        <FieldContainer name="Identificador" value={"#" + data.id} />
                        <FieldContainer name="Número de confirmação" value={data.token} />
                        <FieldContainer width="50%" name="Estado" value={<Tag color={data.status == "confirmado" ? "success" : data.status == "pendente" ? "warning" : "error"}>{data.status}</Tag>} />
                        
                        <FieldContainer name="Data da reserva" value={moment(data.created_at).format('DD-MM-YYYY HH:mm')} />
                        <FieldContainer name="Levantamento" value={moment(data.pickup_date).format('DD-MM-YYYY HH:mm') + ", " + data.pickup_place} />
                        <FieldContainer name="Entrega" value={moment(data.return_date).format('DD-MM-YYYY HH:mm') + ", " + data.return_place} />
                        <FieldContainer name="Número de dias" value={data.days} />

                        <FieldContainer name="Check in" value={EmptyField(data.checkin)} />
                        <FieldContainer name="Check out" value={EmptyField(data.checkout)} />

                        <FieldContainer name="KM entrega" value={EmptyField(data.kms_pickup)} />
                        <FieldContainer name="KM devolução" value={EmptyField(data.kms_return)} />
                        <FieldContainer name="Combustível entrega" value={EmptyField(data.gas_pickup)} />
                        <FieldContainer name="Combustível devolução" value={EmptyField(data.gas_return)} />

                        <Field className='field-width' >
                            <p>
                                <span className='name'>Viatura:</span> <span className='value'>{data.car?.category?.title + " (" + data.car?.registration + ")"}</span> <Url to={"/painel/carros/" + data.car?.id}><img src='/icon/dashboard/link.svg' /></Url>
                            </p>

                        </Field>

                        <FieldContainer name="Método de pagamento" value={EmptyField(data.payment_method)} />
                        <FieldContainer name="Pagamento" value={<Tag color={data.payed_at ? "success" : "warning"}>{data.payed_at ? "Pago" : "Pendente"}</Tag>} />
                        <FieldContainer name="Seguro" value={data?.insurance?.name?.pt} />
                        <FieldContainer width="100%" name="Notas" value={EmptyField(data.notes)} />

                    </FieldsContainer>
                </Col>
                <Col xs={12}>
                    <Section><h3>Preçário</h3> <div className='underline' /></Section>
                    <FieldsContainer width="50%">
                        <FieldContainer name="Valor aluguer" value={data.car_price + "€"} />
                        <FieldContainer name="Preço unitário" value={data.car_price_per_day + "€"} />
                        <FieldContainer name="Valor extras/seguro" value={(Math.round((data.price - data.car_price) * 100 + Number.EPSILON) / 100) + "€"} />
                        <FieldContainer name="Total" value={data.price + "€"} />
                    </FieldsContainer>
                </Col>

                <Col xs={12}>
                    <Section><h3>Comissão {data?.comission?.agency?.id && <Url to={"/painel/agencias/" + data?.comission?.agency?.id}><img src='/icon/dashboard/link.svg' /></Url>}</h3> <div className='underline' /></Section>
                    <FieldsContainer width="50%">
                        <FieldContainer name="Agência" value={EmptyField(data?.comission?.agency?.name)} />
                        <FieldContainer name="Reservado por" value={EmptyField(data?.comission?.intermediary)} />
                        <FieldContainer name="Comissão" value={data?.comission?.value ? data?.comission?.value + "€" : EmptyField(false)} />
                        <FieldContainer name="Estado" value={data?.comission?.paid ? "Pago" : "Pendente"} />
                    </FieldsContainer>
                </Col>
                <Col xs={24}>
                    <Section><h3>Cliente <Url to={"/painel/clientes/" + data.client?.id}><img src='/icon/dashboard/link.svg' /></Url></h3> <div className='underline' /></Section>
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
                    <Section><h3>Condutor(es)</h3> <div className='underline' /></Section>
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
                    <Section><h3>Extras e/ou taxas</h3> <div className='underline' /></Section>
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
                <ButtonContainer>
                    <SmallSecundaryButton>
                        <Download primary={false} onClick={() => props.downloadContract(data.token)}><p>Contrato</p><DownloadIcon /></Download>
                    </SmallSecundaryButton>
                    <SmallPrimaryButton>
                        <Download primary={true} onClick={() => props.downloadInvoice(data.token)}><p>Resumo</p><DownloadIcon /></Download>
                    </SmallPrimaryButton>
                </ButtonContainer>
            </Row>
        </Drawer >
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