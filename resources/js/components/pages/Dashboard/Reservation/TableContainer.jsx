import React from "react";
import styled from "styled-components";
import Table from "../../../common/TableContainer";
import moment from "moment";
import RowOperation from "../../../common/RowOperation";
import StopPropagation from "../../../common/StopPropagation";

const Container = styled.div`
    width: 100%;
`;


function TableContainer({ loading, data, meta, handlePageChange, onDelete, handleRowClick }) {

    const columns = [
        {
            title: '#',
            dataIndex: 'id',
            width: 100,
            fixed: 'left',
        },
        {
            title: 'Referência',
            dataIndex: 'token',
        },
        {
            title: 'Datas',
            dataIndex: 'pickup_date',
            render: (pickup, row) => pickup + " | " + row.return_date,
        },
        {
            title: 'Confirmado',
            dataIndex: 'confirmed_at',
            render: (confirmed_at) => confirmed_at ? confirmed_at : "Por confirmar",
        },
        {
            title: 'Carro',
            dataIndex: 'car',
            render: (car) => car.title,
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
                onRow={(record) => ({
                    onClick: () => {
                        handleRowClick(record);
                    },
                })}
            />
        </Container>
    )
}

export default TableContainer;
