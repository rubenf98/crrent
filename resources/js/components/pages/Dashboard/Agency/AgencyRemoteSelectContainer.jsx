import { Divider, Input, Select, Space } from 'antd';
import React, { useEffect, useState } from 'react'
import { connect } from "react-redux";
import { fetchAgencies, createAgency } from '../../../../redux/agency/actions';
import { SmallSecundaryButton } from '../../../styles';

function AgencyRemoteSelectContainer({ fetchAgencies, createAgency, data, loading, value, onChange }) {
    const [name, setName] = useState(undefined);

    useEffect(() => {
        fetchAgencies()
    }, [])

    const onNameChange = (event) => {
        setName(event.target.value);
    };

    const addItem = (e) => {
        e.preventDefault();
        createAgency({ name: name });
    };

    return (
        <Select
            value={value}
            onChange={onChange}
            loading={loading}
            showSearch
            optionFilterProp="name"
            filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
            dropdownRender={(menu) => (
                <>
                    {menu}
                    <Divider
                        style={{
                            margin: '8px 0',
                        }}
                    />
                    <Space
                        style={{
                            padding: '0 8px 4px',
                        }}
                    >
                        <Input
                            placeholder="Nome da agência"
                            value={name}
                            onChange={onNameChange}
                        />
                        <SmallSecundaryButton onClick={addItem}>Criar</SmallSecundaryButton>
                    </Space>
                </>
            )}
        >
            {data.map((element) => (
                <Select.Option key={element.id} value={element.id}>{element.name}</Select.Option>
            ))}
        </Select>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchAgencies: (filters) => dispatch(fetchAgencies(filters)),
        createAgency: (data) => dispatch(createAgency(data)),
    };
};

const mapStateToProps = (state) => {
    return {
        data: state.agency.data,
        loading: state.agency.loading,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AgencyRemoteSelectContainer);