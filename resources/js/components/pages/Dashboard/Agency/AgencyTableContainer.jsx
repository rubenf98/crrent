import React from "react";
import styled, { withTheme } from "styled-components";
import Table from "../../../common/TableContainer";
import RowOperation from "../../../common/RowOperation";
import StopPropagation from "../../../common/StopPropagation";
import Tag from "antd/es/tag";
import { Link } from "react-router-dom";

const Container = styled.div`
    width: 100%;
`;

const ActionButton = styled.div`

        width: 80px;
        height: 40px;
        flex: 1;
        float: right;
        background: ${props => props.background};
        cursor: pointer;
        padding: 10px;

        &:hover {
        }

        img {
            height: 100%;
            margin: auto;
            display: block;
        }
    
    
`;


function TableContainer({ theme, loading, handleUpdateClick, data, onDelete, setVisible, handlePageChange }) {

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            render: (id) => <Tag color="purple">#{id}</Tag>,
        },
        {
            title: 'AGÊNCIA',
            dataIndex: 'name',
        },
        {
            title: 'Nº RESERVAS',
            dataIndex: 'reservations',
            render: (reservations) => reservations.length,
        },
        {
            title: 'COMISSÕES PAGAS',
            dataIndex: 'comissions',
            render: (comissions) => comissions.paid + "€",
        },
        {
            title: 'COMISSÕES PENDENTES',
            dataIndex: 'comissions',
            render: (comissions) => comissions.pending + "€",
        },
        {
            title: 'COMISSÕES CANCELADAS',
            dataIndex: 'comissions',
            render: (comissions) => comissions.cancelled,
        },
        {
            title: '',
            dataIndex: 'id',
            render: (id) => <Link to={"/painel/agencias/" + id}>ver detalhes</Link>
        },
        {
            title: 'AÇÕES',
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
            <Table
                loading={loading}
                data={data}
                columns={columns}
                handlePageChange={handlePageChange}
            />
        </Container>
    )
}

export default withTheme(TableContainer);
