import React, { useState } from "react";
import styled from "styled-components";
import Table from "../../../common/TableContainer";
import moment from "moment";
import RowOperation from "../../../common/RowOperation";
import StopPropagation from "../../../common/StopPropagation";
import { Col, Input, Row, Tag } from "antd";
import CardContainer from "../Common/CardContainer";
import { Link } from "react-router-dom";
import { SmallPrimaryButton, SmallSecundaryButton } from "../../../styles";
import { SearchIcon } from "../../../../icons";

const Container = styled.section`
    width: 100%;
`;

const Action = styled.button`
    padding: 6px 12px;
    color: white;
    font-weight: bold;
    box-shadow: none;
    border: 0px;
    cursor: pointer;
    background-color: ${props => props.active ? "green" : "red"};
    
    &:nth-child(2) {
        margin-left: 5px;
    }

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

function TableContainer({ loading, data, meta, handlePageChange, onDelete, handleUpdateClick, setCarStatus, handleCreateClick, handleFilters }) {
    const [filters, setFilters] = useState({ registration: undefined, level: undefined, category: undefined });

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            render: (id) => <Tag color="purple">#{id}</Tag>,
        },
        {
            title: 'MATRÍCULA',
            dataIndex: 'registration',
        },
        {
            title: 'CATEGORIA',
            dataIndex: 'category',
            render: (record) => record?.title,
        },
        {
            title: 'GRUPO',
            dataIndex: 'category',
            render: (category) => category?.level?.code,
        },
        {
            title: 'ESTADO',
            dataIndex: 'status',
            render: (status, row) => <Action onClick={() => setCarStatus(row.id, { status: !status })} active={status} >{status ? "Desbloqueado" : "Bloqueado"}</Action>,
        },
        {
            title: '',
            dataIndex: 'id',
            render: (id) => <Link to={"/painel/carros/" + id}>ver detalhes</Link>
        },
        {
            title: 'Ações',
            dataIndex: 'id',
            render: (text, row) => (
                <StopPropagation>
                    <RowOperation
                        onDeleteConfirm={() => onDelete(row.id)} onUpdateClick={() => handleUpdateClick(row)}
                    />
                </StopPropagation>
            ),
        },
    ];

    return (
        <Container>
            <FilterContainer type="flex" justify="space-between" style={{ margin: "30px 0px" }} gutter={16}>
                <Col md={6}>
                    <Input allowClear value={filters.registration} onChange={(e) => setFilters({ ...filters, registration: e.target.value })} placeholder="Matrícula" suffix={<SearchIcon />} />
                </Col>
                <Col md={6}>
                    <Input allowClear value={filters.category} onChange={(e) => setFilters({ ...filters, category: e.target.value })} placeholder="Categoria" suffix={<SearchIcon />} />
                </Col>
                <Col md={6}>
                    <Input allowClear value={filters.level} onChange={(e) => setFilters({ ...filters, level: e.target.value })} placeholder="Gama" suffix={<SearchIcon />} />
                </Col>

                <Col md={6}>
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

            <Table
                loading={loading}
                data={data}
                meta={meta}
                columns={columns}
                handlePageChange={handlePageChange}
            />
        </Container>
    )
}

export default TableContainer;
