import React from "react";
import styled, { withTheme } from "styled-components";
import Table from "../../../common/TableContainer";
import RowOperation from "../../../common/RowOperation";
import StopPropagation from "../../../common/StopPropagation";
import Tag from "antd/es/tag";
import { ActionButton } from "../../../styles";

const Container = styled.div`
    width: 100%;
`;




function TableContainer({ theme, loading, handleUpdateClick, meta, data, onDelete, handleCreateClick, handlePageChange }) {

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            render: (id) => <Tag color="purple">#{id}</Tag>,
        },
        {
            title: 'DESDE',
            dataIndex: 'start',
        },
        {
            title: 'ATÉ',
            dataIndex: 'end',
        },
        {
            title: 'FATOR',
            dataIndex: 'value',
        },
        {
            title: 'NÍVEL DE PRIORIDADE',
            dataIndex: 'priority',
        },
        {
            title: 'GAMAS',
            dataIndex: 'levels',
            render: (levels) => levels.map((level) => (
                <span key={level.id}>{level.code}, </span>
            )),
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
            <ActionButton onClick={handleCreateClick} background={theme.primary}>

                <img src="/icon/add_white.svg" alt="add" />

            </ActionButton>
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

export default withTheme(TableContainer);
