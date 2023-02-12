import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Table from "../../../common/TableContainer";
import moment from "moment";
import RowOperation from "../../../common/RowOperation";
import StopPropagation from "../../../common/StopPropagation";
import CardContainer from "../Common/CardContainer";
import { Row, Tag } from "antd";

const Container = styled.div`
    width: 100%;
    margin-bottom: 50px;
`;

function ClientReservationTableContainer({ handleUpdateClick, loading, data, meta, handlePageChange, onDelete, handleRowClick, handleFilters, aFilters = { id: undefined, name: undefined, date: undefined, car: undefined } }) {
    const [filters, setFilters] = useState({});

    useEffect(() => {
        setFilters(aFilters);
    }, [])


    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            sorter: true,
            render: (id) => <Tag color="purple">#{id}</Tag>,
        },
        {
            title: 'CLIENTE',
            dataIndex: 'client',
            sorter: true,
            render: (client) => client?.name,

        },
        {
            title: 'LEVANTAMENTO',
            dataIndex: 'pickup_date',
            sorter: true,
            render: (pickup, row) => moment(pickup).format("DD/MM/YYYY HH:mm") + "h, " + row.pickup_place,
        },
        {
            title: 'ENTREGA',
            dataIndex: 'return_date',
            sorter: true,
            render: (return_date, row) => moment(return_date).format("DD/MM/YYYY HH:mm") + "h, " + row.return_place,
        },
        {
            title: 'VEÍCULO',
            dataIndex: 'car',
            render: (car) => car.category.title + " (" + car.registration + ")",
        },
        {
            title: 'ESTADO',
            dataIndex: 'status',
            render: (status) => <Tag color={status == "pendente" ? "warning" : status == "confirmado" ? "success" : "error"}>{status}</Tag>,
        },
    ];

    return (
        <Container>
            <CardContainer text="Reservas">
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
            </CardContainer>
        </Container >
    )
}

export default ClientReservationTableContainer;
