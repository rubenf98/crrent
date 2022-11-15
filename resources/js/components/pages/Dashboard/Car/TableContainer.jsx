import React from "react";
import styled from "styled-components";
import Table from "../../../common/TableContainer";
import moment from "moment";
import RowOperation from "../../../common/RowOperation";
import StopPropagation from "../../../common/StopPropagation";

const Container = styled.div`
    width: 100%;
`;


function TableContainer({ loading, data, meta, handlePageChange, onDelete }) {

    const columns = [
        {
            title: '#',
            dataIndex: 'id',
            width: 100,
            fixed: 'left',
        },
        {
            title: 'Marca',
            dataIndex: 'title',
        },
        {
            title: 'Submarca',
            dataIndex: 'subtitle',
        },
        {
            title: 'Gama',
            dataIndex: 'level',
            render: (level) => level.code,
        },
        {
            title: 'Combustível',
            dataIndex: 'gas',
        },
        {
            title: 'Capacidade',
            dataIndex: 'people',
        },
        {
            title: 'Portas',
            dataIndex: 'doors',
        },
        {
            title: 'Mudanças',
            dataIndex: 'shift_mode',
        },
        {
            title: 'Tipo',
            dataIndex: 'type',

        },
        {
            title: 'Valor',
            dataIndex: 'price',
            render: (price) => price + "€",
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
