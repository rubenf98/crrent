import React, { useState } from "react";
import styled, { withTheme } from "styled-components";
import Table from "../../../common/TableContainer";
import RowOperation from "../../../common/RowOperation";
import StopPropagation from "../../../common/StopPropagation";
import Tag from "antd/es/tag";
import { Col, Input, Row } from "antd";
import { SearchIcon } from "../../../../icons";
import { SmallSecundaryButton, SmallPrimaryButton } from "../../../styles";

const Container = styled.div`
    width: 100%;
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


function CarCategoryTableContainer(props) {
    const [filters, setFilters] = useState({ level: undefined, name: undefined });
    const { loading, data, meta } = props;


    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            render: (id) => <Tag color="purple">#{id}</Tag>,
        },
        {
            title: 'NOME',
            dataIndex: 'title',
        },
        {
            title: 'GAMA',
            dataIndex: 'level',
            render: (level) => level?.code,
        },
        {
            title: 'DESCRIÇÃO',
            dataIndex: 'description',
            render: (description) => description?.pt,
        },
        {
            title: 'AÇÕES',
            dataIndex: 'id',
            render: (text, row) => (
                <StopPropagation>
                    <RowOperation
                        onDeleteConfirm={() => props.onDelete(row.id)} onUpdateClick={() => props.handleUpdateClick(row)}
                    />
                </StopPropagation>
            ),
        },
    ];

    return (
        <Container>
            <FilterContainer type="flex" justify="space-between" style={{ margin: "30px 0px" }} gutter={16}>
                <Col span={6}>
                    <Input allowClear value={filters.name} onChange={(e) => setFilters({ ...filters, name: e.target.value })} placeholder="Nome / título da categoria" suffix={<SearchIcon />} />
                </Col>
                <Col span={6}>
                    <Input allowClear value={filters.level} onChange={(e) => setFilters({ ...filters, level: e.target.value })} placeholder="Título ou código da gama de veículos" suffix={<SearchIcon />} />
                </Col>
                <Col span={12}>
                    <SmallPrimaryButton
                        onClick={props.handleCreateClick}
                        style={{ float: "right", marginLeft: "10px" }} type="primary"
                        loading={loading}
                    >
                        Adicionar
                    </SmallPrimaryButton>

                    <SmallSecundaryButton
                        onClick={() => props.handleFilters(filters)}
                        style={{ float: "right" }}
                        loading={loading}
                    >
                        Pesquisar
                    </SmallSecundaryButton>
                </Col>
            </FilterContainer>


            <Table
                loading={loading}
                data={data}
                columns={columns}
                meta={meta}
                handlePageChange={props.handlePageChange}
            />
        </Container>
    )
}

export default withTheme(CarCategoryTableContainer);
