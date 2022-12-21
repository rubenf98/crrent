import React from "react";
import styled from "styled-components";
import Table from "../../../common/TableContainer";
import { Tag } from 'antd';
import moment from "moment";

const Container = styled.div`
    width: 50%;
    padding: 10px 20px;
    box-sizing: border-box;
    background-color: white;
    border-radius: 6px;
    box-shadow: 0px 0px 5px 0px #c6c6c6;

    .ant-empty {
        margin: 0px !important;
    }

    .title {
        border-bottom: 1px solid #00000040;
        padding: 10px 0px;
        opacity: .7;

        h2 {
            display: inline-block;
            font-weight: bold;
        }

        span {
            border: 1px solid #00000040;
            font-size: 18px;
            margin-left: 5px;
            padding: 0px 5px;
        }
    }

    th {
        font-weight: bold !important;
        opacity: .7;
    }
`;


function TodayTableContainer({ title, loading, data, meta, handlePageChange, handleRowClick }) {
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            render: (id) => <Tag color="purple">#{id}</Tag>,
        },
        {
            title: 'VEÍCULO',
            dataIndex: 'car_pref',
            render: (car) => car.title,
        },
        {
            title: 'CLIENTE',
            dataIndex: 'client',
            render: (client) => client?.name,
        },
        {
            title: 'LEVANTAMENTO',
            dataIndex: 'pickup_date',
            render: (pickup, row) => row.pickup_place + " " + moment(pickup).format("HH:mm") + "h",
        },
        {
            title: 'ENTREGA',
            dataIndex: 'return_date',
            render: (return_date, row) => row.return_place + " " + moment(return_date).format("HH:mm") + "h",
        },
        {
            title: 'ESTADO',
            dataIndex: 'confirmed_at',
            render: (confirmed_at) => confirmed_at ? <Tag color="success">Confirmado</Tag>
                : <Tag color="warning">Pendente</Tag>,
        },

    ];

    return (
        <Container>
            <div className="title">
                <h2>{title} </h2><span>{data ? data.length : 0}</span>
            </div>
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

export default TodayTableContainer;
