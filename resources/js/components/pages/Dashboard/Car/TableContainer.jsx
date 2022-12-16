import React from "react";
import styled from "styled-components";
import Table from "../../../common/TableContainer";
import moment from "moment";
import RowOperation from "../../../common/RowOperation";
import StopPropagation from "../../../common/StopPropagation";
import { Tag } from "antd";

const Container = styled.div`
    width: 100%;
    padding: 20px;
    box-sizing: border-box;
    background-color: white;
    border-radius: 6px;
    box-shadow: 0px 0px 5px 0px #c6c6c6;
`;


function TableContainer({ loading, data, meta, handlePageChange, onDelete }) {

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            width: 100,
            fixed: 'left',
            render: (id) => <Tag color="purple">#{id}</Tag>,
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
            title: 'VALORES',
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
