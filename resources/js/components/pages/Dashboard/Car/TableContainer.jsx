import React from "react";
import styled from "styled-components";
import Table from "../../../common/TableContainer";
import moment from "moment";
import RowOperation from "../../../common/RowOperation";
import StopPropagation from "../../../common/StopPropagation";
import { Row, Tag } from "antd";
import CardContainer from "../Common/CardContainer";

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

function TableContainer({ loading, data, meta, handlePageChange, onDelete, handleUpdateClick, setCarStatus }) {

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            render: (id) => <Tag color="purple">#{id}</Tag>,
        },
        {
            title: 'VISIBILIDADE',
            dataIndex: 'visible',
            render: (visible, row) => <Action onClick={() => setCarStatus(row.id, { visible: !visible })} active={visible} >{visible ? "Visível" : "Escondido"}</Action>,
        },
        {
            title: 'MATRÍCULA',
            dataIndex: 'registration',
        },
        {
            title: 'TÍTULO',
            dataIndex: 'title',
        },
        {
            title: 'GRUPO',
            dataIndex: 'level',
            render: (level) => level.code,
        },
        {
            title: 'ESTADO',
            dataIndex: 'status',
            render: (status, row) => <Action onClick={() => setCarStatus(row.id, { status: !status })} active={status} >{status ? "Desbloqueado" : "Bloqueado"}</Action>,
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
