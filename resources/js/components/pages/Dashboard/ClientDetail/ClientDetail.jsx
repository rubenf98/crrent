import React, { useState, useEffect } from 'react'
import styled, { withTheme } from "styled-components";
import { connect } from "react-redux";
import { fetchClient, deleteClient, setCurrentClient } from "../../../../redux/client/actions";
import { deleteReservation } from "../../../../redux/reservation/actions";
import { dimensions } from '../../../helper';
import ClientFormContainer from '../Client/ClientFormContainer';
import CardContainer from '../Common/CardContainer';
import { Link, useParams } from 'react-router-dom';
import TableContainer from '../Reservation/TableContainer';
import { Breadcrumb, Col, Row } from 'antd';
import { SmallSecundaryButton } from '../../../styles';
import DrawerContainer from '../Reservation/DrawerContainer';


const Container = styled.div`
    width: 100%;
`;


const Field = styled.div`
    margin-bottom: 10px;
    
    h4 {
        opacity: .7;
        
        &::after {
            content: ":";
        }
    }

    p, h4 {
        margin: 0px;
        font-size: 14px;
    }

`;

function ClientDetail(props) {
    const [visible, setVisible] = useState(false);
    const [drawerContent, setDrawerContent] = useState(undefined);
    const [drawerState, setDrawerState] = useState(false);

    const { loading, current } = props;
    let { id } = useParams();

    useEffect(() => {
        props.fetchClient(id);
    }, [])

    const handleUpdateClick = (row) => {
        setVisible(true);
        props.setCurrentClient(row);
    }

    const handleRowClick = (row) => {
        setDrawerState(true);
        setDrawerContent(row.id);
    }


    return (

        <Container>
            <Breadcrumb>
                <Breadcrumb.Item><Link to="/painel/">Página inicial</Link></Breadcrumb.Item>
                <Breadcrumb.Item>
                    <Link to="/painel/clientes">Listagem de clientes</Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    Cliente
                </Breadcrumb.Item>
            </Breadcrumb>
            <br />
            <DrawerContainer currentId={drawerContent} drawerState={drawerState} setDrawerState={setDrawerState} />
            <CardContainer text="Cliente">

                <Row type="flex" align='flex-start' gutter={16}>
                    <Col span={8}>
                        <Field>
                            <h4>Nome</h4>
                            <p>{current.name}</p>
                        </Field>
                    </Col>
                    <Col span={8}>
                        <Field>
                            <h4>Email</h4>
                            <p>{current.email}</p>
                        </Field>
                    </Col>
                    <Col span={8}>
                        <Field>
                            <h4>Nº telemóvel</h4>
                            <p>{current.phone}</p>
                        </Field>
                    </Col>

                    <Col span={8}>
                        <Field>
                            <h4>Agência / Empresa</h4>
                            <p>{current.company ? current.company : "N/A"}</p>
                        </Field>
                    </Col>
                    <Col span={8}>
                        <Field>
                            <h4>ID / Passaporte</h4>
                            <p>{current.cc}</p>
                        </Field>
                    </Col>
                    <Col span={8}>
                        <Field>
                            <h4>NIF</h4>
                            <p>{current.nif}</p>
                        </Field>
                    </Col>

                    <Col span={8}>
                        <Field>
                            <h4>País</h4>
                            <p>{current.country}</p>
                        </Field>
                    </Col>
                    <Col span={8}>
                        <Field>
                            <h4>Morada</h4>
                            <p>{current.address}</p>
                        </Field>
                    </Col>
                    <Col span={8}>
                        <Field>
                            <h4>Código postal</h4>
                            <p>{current.postal_code}</p>
                        </Field>
                    </Col>

                    <Col span={24}>
                        <Field>
                            <h4>Notas</h4>
                            <p>{current.notes ? current.notes : "N/A"}</p>
                        </Field>
                    </Col>
                </Row>
                <Row style={{ margin: "10px 0px" }} type="flex" justify='end'>
                    <SmallSecundaryButton onClick={() => setVisible(true)}>Atualizar</SmallSecundaryButton>
                </Row>
                <ClientFormContainer
                    visible={visible}
                    handleClose={() => setVisible(false)}
                    current={current}
                />
            </CardContainer>
            <br />
            <TableContainer
                data={current.reservations}
                loading={loading}
                onDelete={props.deleteReservation}
                setVisible={setVisible}
                handleUpdateClick={handleUpdateClick}
                handleRowClick={handleRowClick}
            />
        </Container>


    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchClient: (id) => dispatch(fetchClient(id)),
        deleteReservation: (id) => dispatch(deleteReservation(id)),
        setCurrentClient: (row) => dispatch(setCurrentClient(row)),
    };
};

const mapStateToProps = (state) => {
    return {
        loading: state.client.loading,
        meta: state.client.meta,
        current: state.client.current,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(ClientDetail));