import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Table from "../../../common/TableContainer";
import moment from "moment";
import RowOperation from "../../../common/RowOperation";
import StopPropagation from "../../../common/StopPropagation";
import CardContainer from "../Common/CardContainer";
import { Button, Col, DatePicker, Input, Row, Select, Tag } from "antd";
import { SearchIcon, UserIcon } from "../../../../icons";
import { SmallPrimaryButton, SmallSecundaryButton } from "../../../styles";

const Container = styled.div`
    width: 100%;
    margin-bottom: 50px;
`;

const FilterContainer = styled(Row)`
    width: 100%;

    input::placeholder {
        color: #000;

        
    }

    svg {
        height: 15px;
        width: auto;
    }
`;

const Status = styled.div`
    width: 16px;
    height: 16px;
    border-radius: 16px;
    margin-right: 5px;
    background-color: ${props => props.status == "confirmado" ? "green" : (props.status == "pendente" ? "orange" : "red")};
`;


function TableContainer({ handleUpdateClick, handleStatusChange, handleCreateClick, loading, data, meta, handlePageChange, onDelete, handleRowClick, handleFilters, aFilters = { id: undefined, name: undefined, date: undefined, car: undefined } }) {
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
            render: (status, row) => <Row type="flex" align="middle">
                <Status status={status} />
                <StopPropagation>
                    <Select onChange={(e) => handleStatusChange(row.id, e)} defaultValue={status}>
                        <Option value="pendente">Pendente</Option>
                        <Option value="confirmado">Confirmado</Option>
                        <Option value="cancelado">Cancelado</Option>
                    </Select>
                </StopPropagation>
            </Row>,
        },
        {
            title: 'AÇÕES',
            dataIndex: 'id',
            render: (text, row) => (
                <StopPropagation>
                    <RowOperation
                        onDeleteConfirm={() => onDelete(row.id)}
                        onUpdateClick={() => handleUpdateClick(row)}
                    />
                </StopPropagation>
            ),
        },
    ];

    return (
        <Container>
            <CardContainer text="Reservas">
                {handleFilters &&
                    <FilterContainer style={{ margin: "30px 0px" }} gutter={16}>
                        <Col md={4}>
                            <Input allowClear value={filters.id} onChange={(e) => setFilters({ ...filters, id: e.target.value })} placeholder="Referência/ID de reserva" suffix={<SearchIcon />} />
                        </Col>
                        <Col md={4}>
                            <Input allowClear value={filters.name} onChange={(e) => setFilters({ ...filters, name: e.target.value })} placeholder="Nome do cliente" suffix={<UserIcon />} />
                        </Col>
                        <Col md={4}>
                            <DatePicker value={filters.date} onChange={(e) => setFilters({ ...filters, date: e })} style={{ width: "100%" }} format="DD-MM-YYYY" placeholder="Data de reserva" suffix={<UserIcon />} />
                        </Col>
                        <Col md={4}>
                            <Input allowClear value={filters.car} onChange={(e) => setFilters({ ...filters, car: e.target.value })} placeholder="Veículo" suffix={<SearchIcon />} />
                        </Col>
                        <Col md={8}>
                            <SmallPrimaryButton
                                onClick={handleCreateClick}
                                style={{ float: "right", marginLeft: "10px" }} type="primary"
                                loading={loading}
                            >
                                Adicionar
                            </SmallPrimaryButton>

                            <SmallSecundaryButton
                                onClick={() => handleFilters({ ...filters, date: filters.date && moment(filters.date).format('YYYY-MM-DD') })}
                                style={{ float: "right" }} type="primary"
                                loading={loading}
                            >
                                Pesquisar
                            </SmallSecundaryButton>


                        </Col>
                    </FilterContainer>
                }

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

export default TableContainer;
