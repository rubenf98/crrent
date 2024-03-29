import React from "react";
import styled, { withTheme } from "styled-components";
import Table from "../../../common/TableContainer";
import RowOperation from "../../../common/RowOperation";
import StopPropagation from "../../../common/StopPropagation";
import { Tag } from "antd";

const Container = styled.div`
    width: 100%;
`;


function LocalizationTableContainer({ loading, data, onDelete, handleUpdateClick, setVisible, theme }) {

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            render: (id) => <Tag color="purple">#{id}</Tag>,
        },
        {
            title: 'NOME',
            dataIndex: 'name',
            render: (record) => record.pt,
        },
        {
            title: 'PREÇO',
            dataIndex: 'price',
            render: (price) => price + "€",
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
            />
        </Container>
    )
}

export default withTheme(LocalizationTableContainer);
