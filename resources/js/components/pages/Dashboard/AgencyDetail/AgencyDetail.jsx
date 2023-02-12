import React, { useState, useEffect } from 'react'
import styled, { withTheme } from "styled-components";
import { connect } from "react-redux";
import { fetchAgency, deleteAgency, setCurrentAgency } from "../../../../redux/agency/actions";
import { deleteReservation } from "../../../../redux/reservation/actions";
import AgencyFormContainer from '../Agency/AgencyFormContainer';
import CardContainer from '../Common/CardContainer';
import { Link, useParams } from 'react-router-dom';
import TableContainer from '../Reservation/TableContainer';
import { Breadcrumb, Col, Row } from 'antd';
import { SmallSecundaryButton } from '../../../styles';
import DrawerContainer from '../Reservation/DrawerContainer';
import AgencyReservationTableContainer from './AgencyReservationTableContainer';
import { updateComission } from '../../../../redux/comission/actions';


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

function AgencyDetail(props) {
    const [visible, setVisible] = useState(false);
    const [drawerContent, setDrawerContent] = useState(undefined);
    const [drawerState, setDrawerState] = useState(false);

    const { loading, current } = props;
    let { id } = useParams();

    useEffect(() => {
        props.fetchAgency(id);
    }, [])

    const handleUpdateClick = (row) => {
        setVisible(true);
        props.setCurrentAgency(row);
    }

    const handleRowClick = (row) => {
        setDrawerState(true);
        setDrawerContent(row.id);
    }

    const handleComission = (aId, aData) => {
        props.updateComission(aId, aData).then(() => {
            props.fetchAgency(id);
        });
    }



    return (

        <Container>
            <Breadcrumb>
                <Breadcrumb.Item><Link to="/painel/">Página inicial</Link></Breadcrumb.Item>
                <Breadcrumb.Item>
                    <Link to="/painel/agencias">Listagem de agências</Link>
                </Breadcrumb.Item>
                <Breadcrumb.Item>
                    Agência
                </Breadcrumb.Item>
            </Breadcrumb>
            <br />
            <DrawerContainer currentId={drawerContent} drawerState={drawerState} setDrawerState={setDrawerState} />
            <CardContainer text="Agência">

                <Row type="flex" align='flex-start' gutter={16}>
                    <Col span={8}>
                        <Field>
                            <h4>Nome</h4>
                            <p>{current.name}</p>
                        </Field>
                    </Col>
                    <Col span={8}>
                        <Field>
                            <h4>Comissões pagas</h4>
                            <p>{current?.comissions?.paid}€</p>
                        </Field>
                    </Col>
                    <Col span={8}>
                        <Field>
                            <h4>Comissões pendentes</h4>
                            <p>{current?.comissions?.pending}€</p>
                        </Field>
                    </Col>
                </Row>
                <Row style={{ margin: "10px 0px" }} type="flex" justify='end'>
                    <SmallSecundaryButton onClick={() => setVisible(true)}>Atualizar</SmallSecundaryButton>
                </Row>
                <AgencyFormContainer
                    visible={visible}
                    handleClose={() => setVisible(false)}
                    current={current}
                />
            </CardContainer>
            <br />
            <AgencyReservationTableContainer
                data={current.reservations}
                loading={loading}
                onDelete={props.deleteReservation}
                setVisible={setVisible}
                handleUpdate={handleComission}
                handleRowClick={handleRowClick}
            />
        </Container>


    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchAgency: (id) => dispatch(fetchAgency(id)),
        deleteReservation: (id) => dispatch(deleteReservation(id)),
        updateComission: (id, data) => dispatch(updateComission(id, data)),
        setCurrentAgency: (row) => dispatch(setCurrentAgency(row)),
    };
};

const mapStateToProps = (state) => {
    return {
        loading: state.agency.loading,
        meta: state.agency.meta,
        current: state.agency.current,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(withTheme(AgencyDetail));