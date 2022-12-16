import React from "react";
import styled, { withTheme } from "styled-components";
import Table from "../../../common/TableContainer";
import RowOperation from "../../../common/RowOperation";
import StopPropagation from "../../../common/StopPropagation";

const Container = styled.div`
    width: 100%;
    padding: 20px;
    box-sizing: border-box;
    background-color: white;
    border-radius: 6px;
    box-shadow: 0px 0px 5px 0px #c6c6c6;
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


function TableContainer({ theme, loading, meta, data, onDelete, setVisible, handlePageChange }) {

    const columns = [
        {
            title: '#',
            dataIndex: 'id',
            width: 100,
            fixed: 'left',
        },
        {
            title: 'Desde',
            dataIndex: 'start',
        },
        {
            title: 'Até',
            dataIndex: 'end',
        },
        {
            title: 'Valor promocional',
            dataIndex: 'value',
        },
        {
            title: 'Factor de multiplicação',
            dataIndex: 'factor',
        },
        {
            title: 'Ações',
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
            <ActionButton onClick={() => setVisible(true)} background={theme.primary}>

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
