import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Table from "../../../common/TableContainer";
import moment from "moment";
import RowOperation from "../../../common/RowOperation";
import StopPropagation from "../../../common/StopPropagation";
import CardContainer from "../Common/CardContainer";
import { Button, Col, DatePicker, Input, Row, Tag } from "antd";
import { SearchIcon, UserIcon } from "../../../../icons";

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


function TableContainer({ loading, data, meta, handlePageChange, onDelete, handleRowClick, handleFilters, aFilters = { id: undefined, name: undefined, date: undefined, car: undefined } }) {
    const [filters, setFilters] = useState({});

    useEffect(() => {
        console.log(aFilters);
        setFilters(aFilters);
    }, [])


    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            render: (id) => <Tag color="purple">#{id}</Tag>,
        },
        {
            title: 'CLIENTE',
            dataIndex: 'client',
            render: (client) => client?.name,
        },
        {
            title: 'LEVANTAMENTO',
            dataIndex: 'pickup_date',
            render: (pickup, row) => row.pickup_place + " " + moment(pickup).format("DD/MM/YYYY HH:mm") + "h",
        },
        {
            title: 'ENTREGA',
            dataIndex: 'return_date',
            render: (return_date, row) => row.return_place + " " + moment(return_date).format("DD/MM/YYYY HH:mm") + "h",
        },
        {
            title: 'VEÍCULO',
            dataIndex: 'car',
            render: (car) => car.category.title + " (" + car.registration + ")",
        },
        {
            title: 'ESTADO',
            dataIndex: 'confirmed_at',
            render: (confirmed_at, row) => confirmed_at ? <Tag color="success">Confirmado</Tag>
                : moment().diff(moment(row.pickup_date)) > 0 ? <Tag color="error">Cancelado</Tag> : <Tag color="warning">Pendente</Tag>,
        },
        {
            title: 'AÇÕES',
            dataIndex: 'id',
            render: (text, row) => (
                <StopPropagation>
                    <RowOperation
                        onDeleteConfirm={() => onDelete(row.id)}
                    />
                </StopPropagation>
            ),
        },
    ];

    return (
        <Container>
            <CardContainer text="Tabela de Reservas">
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
                    <Col md={6}>
                        <Button
                            onClick={() => handleFilters({ ...filters, date: filters.date && moment(filters.date).format('YYYY-MM-DD') })}
                            style={{ float: "right" }} type="primary"
                            loading={loading}
                        >
                            Pesquisar
                        </Button>
                    </Col>


                </FilterContainer>
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

export default TableContainer;
