import React, { useState } from "react";
import styled, { withTheme } from "styled-components";
import Table from "../../../common/TableContainer";
import RowOperation from "../../../common/RowOperation";
import StopPropagation from "../../../common/StopPropagation";
import Tag from "antd/es/tag";
import { Button, Col, Input, Row } from "antd";
import { SearchIcon, UserIcon } from "../../../../icons";
import { Link } from "react-router-dom";

const Container = styled.div`
    width: 100%;
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


function TableContainer(props) {
    const [filters, setFilters] = useState({ id: undefined, name: undefined, email: undefined });
    const { loading, data, meta } = props;


    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            render: (id) => <Tag color="purple">#{id}</Tag>,
        },
        {
            title: 'NOME',
            dataIndex: 'name',
        },
        {
            title: 'EMAIL',
            dataIndex: 'email',
        },
        {
            title: 'Nº TELEMÓVEL',
            dataIndex: 'phone',
        },
        {
            title: 'PAÍS',
            dataIndex: 'country',
        },
        {
            title: 'Nº RESERVAS',
            dataIndex: 'reservations',
            render: (reservations) => reservations.length
        },
        {
            title: '',
            dataIndex: 'id',
            render: (id) => <Link to={"/painel/clientes/" + id}>ver detalhes</Link>
        },
        {
            title: 'AÇÕES',
            dataIndex: 'id',
            render: (text, row) => (
                <StopPropagation>
                    <RowOperation
                        onDeleteConfirm={() => props.onDelete(row.id)} onUpdateClick={() => props.handleUpdateClick(row)}
                    />
                </StopPropagation>
            ),
        },
    ];

    return (
        <Container>
            <FilterContainer style={{ margin: "30px 0px" }} gutter={16}>
                <Col md={6}>
                    <Input allowClear value={filters.id} onChange={(e) => setFilters({ ...filters, id: e.target.value })} placeholder="ID de cliente" suffix={<SearchIcon />} />
                </Col>
                <Col md={6}>
                    <Input allowClear value={filters.name} onChange={(e) => setFilters({ ...filters, name: e.target.value })} placeholder="Nome do cliente" suffix={<UserIcon />} />
                </Col>
                <Col md={6}>
                    <Input allowClear value={filters.email} onChange={(e) => setFilters({ ...filters, email: e.target.value })} placeholder="Email do cliente" suffix={<UserIcon />} />
                </Col>
                <Col md={6}>
                    <Button
                        onClick={() => props.handleFilters(filters)}
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
                columns={columns}
                meta={meta}
                handlePageChange={props.handlePageChange}
            />
        </Container>
    )
}

export default withTheme(TableContainer);
