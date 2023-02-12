import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Table from "../../../common/TableContainer";
import moment from "moment";
import RowOperation from "../../../common/RowOperation";
import StopPropagation from "../../../common/StopPropagation";
import CardContainer from "../Common/CardContainer";
import { Button, Col, DatePicker, Input, Row, Select, Tag } from "antd";
import { SearchIcon, UserIcon } from "../../../../icons";
import { SmallPrimaryButton, SmallSecundaryButton } from "../../../styles";

const Container = styled.div`
    width: 100%;
    margin-bottom: 50px;
`;

const FilterContainer = styled(Row)`
    width: 100%;

    input::placeholder {
        color: #000;

        
    }

    svg {
        height: 15px;
        width: auto;
    }
`;

const Action = styled.button`
    padding: 6px 12px;
    color: white;
    font-weight: bold;
    box-shadow: none;
    border: 0px;
    cursor: pointer;
    background-color: ${props => props.active ? "green" : "orange"};
    
    &:nth-child(2) {
        margin-left: 5px;
    }

`;

function AgencyReservationTableContainer({ handleUpdate, handleCreateClick, loading, data, meta, handlePageChange, onDelete, handleRowClick, handleFilters, aFilters = { id: undefined, name: undefined, date: undefined, car: undefined } }) {
    const [filters, setFilters] = useState({});

    useEffect(() => {
        setFilters(aFilters);
    }, [])


    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            sorter: true,
            render: (id) => <Tag color="purple">#{id}</Tag>,
        },
        {
            title: 'CLIENTE',
            dataIndex: 'client',
            sorter: true,
            render: (client) => client?.name,

        },
        {
            title: 'DATA DE CRIAÇÃO',
            dataIndex: 'created_at',
            sorter: true,
            render: (date) => moment(date).format("DD/MM/YYYY HH:mm"),
        },
        {
            title: 'INTERMEDIÁRIO',
            dataIndex: 'comission',
            sorter: true,
            render: (comission) => comission.intermediary,
        },
        {
            title: 'COMISSÃO',
            dataIndex: 'comission',
            sorter: true,
            render: (comission) => comission.value + "€",
        },
        {
            title: 'PREÇO',
            dataIndex: 'price',
            render: (price) => price + "€",
        },
        {
            title: 'ESTADO',
            dataIndex: 'comission',
            render: (comission, row) =>
                <StopPropagation>
                    <Action onClick={() => handleUpdate(comission.id, { status: comission.paid ? 0 : 1 })} active={comission.paid} >{comission.paid ? "Pago" : "Pendente"}</Action>
                </StopPropagation>,
        },
    ];

    return (
        <Container>
            <CardContainer text="Reservas">
                {handleFilters &&
                    <FilterContainer style={{ margin: "30px 0px" }} gutter={16}>
                        <Col md={4}>
                            <Input allowClear value={filters.id} onChange={(e) => setFilters({ ...filters, id: e.target.value })} placeholder="Referência/ID de reserva" suffix={<SearchIcon />} />
                        </Col>
                        <Col md={4}>
                            <Input allowClear value={filters.name} onChange={(e) => setFilters({ ...filters, name: e.target.value })} placeholder="Nome do cliente" suffix={<UserIcon />} />
                        </Col>
                        <Col md={4}>
                            <DatePicker value={filters.date} onChange={(e) => setFilters({ ...filters, date: e })} style={{ width: "100%" }} format="DD-MM-YYYY" placeholder="Data de reserva" suffix={<UserIcon />} />
                        </Col>
                        <Col md={4}>
                            <Input allowClear value={filters.car} onChange={(e) => setFilters({ ...filters, car: e.target.value })} placeholder="Veículo" suffix={<SearchIcon />} />
                        </Col>
                        <Col md={8}>
                            <SmallPrimaryButton
                                onClick={handleCreateClick}
                                style={{ float: "right", marginLeft: "10px" }} type="primary"
                                loading={loading}
                            >
                                Adicionar
                            </SmallPrimaryButton>

                            <SmallSecundaryButton
                                onClick={() => handleFilters({ ...filters, date: filters.date && moment(filters.date).format('YYYY-MM-DD') })}
                                style={{ float: "right" }} type="primary"
                                loading={loading}
                            >
                                Pesquisar
                            </SmallSecundaryButton>


                        </Col>
                    </FilterContainer>
                }

                <Table
                    loading={loading}
                    data={data}
                    meta={meta}
                    columns={columns}
                    handlePageChange={handlePageChange}
                    onRow={(record) => ({
                        onClick: () => {
                            handleRowClick(record);
                        },
                    })}
                />
            </CardContainer>
        </Container >
    )
}

export default AgencyReservationTableContainer;
