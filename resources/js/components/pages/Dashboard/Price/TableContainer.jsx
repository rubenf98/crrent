import React from "react";
import styled, { withTheme } from "styled-components";
import Table from "../../../common/TableContainer";
import RowOperation from "../../../common/RowOperation";
import StopPropagation from "../../../common/StopPropagation";
import Tag from "antd/es/tag";

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
            title: 'GRUPO',
            dataIndex: 'level',
            render: (level) => <span>{level.name} - {level.code}</span>
        },
        {
            title: 'PERIODO',
            dataIndex: 'min',
            render: (min, row) => <p>{row.max > 1000 ? <span>Mais de 15 dias</span> : <span>{min} até {row.max} dias</span>}</p>
        },

        {
            title: 'PREÇO',
            dataIndex: '_',
            render: (text, row) => row.price + "€"
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
