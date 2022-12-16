import React from "react";
import styled from "styled-components";
import Table from "../../../common/TableContainer";
import moment from "moment";
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



function TableContainer({ loading, data, onDelete }) {

    const columns = [
        {
            title: '#',
            dataIndex: 'id',
            width: 100,
            fixed: 'left',
        },
        {
            title: 'Nome',
            dataIndex: 'name',
        },
        {
            title: 'Tipo',
            dataIndex: 'type',
            render: (type) => type == "day" ? "valor por dia" : "valor unitário",
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
                columns={columns}
            />
        </Container>
    )
}

export default TableContainer;
