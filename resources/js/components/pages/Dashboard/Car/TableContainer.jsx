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
            title: 'Matrícula',
            dataIndex: 'registration',
        },
        {
            title: 'Título',
            dataIndex: 'title',
            render: (title, row) => title + ", " + row.subtitle,
        },
        {
            title: 'Gama',
            dataIndex: 'level',
            render: (level) => level.code,
        },
        {
            title: 'Valor',
            dataIndex: 'level',
            render: (level) => <div> {level.prices.map((price) => (
                <p style={{ margin: "0px" }}>{price.min}/{price.max == 10000 ? "--" : price.max} dias - {price.price}€</p>
            ))} </div>,
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
