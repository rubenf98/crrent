import { Select } from 'antd';
import React, { useEffect } from 'react'
import { connect } from "react-redux";
import { fetchAgencies } from '../../../../redux/agency/actions';

function AgencyRemoteSelectContainer({ fetchAgencies, data, loading, value, onChange }) {
    useEffect(() => {
        fetchAgencies()
    }, [])

    return (
        <Select
            value={value}
            onChange={onChange}
            loading={loading}
            showSearch
            optionFilterProp="name"
            filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
        >
            {data.map((element) => (
                <Select.Option key={element.id} value={element.id}>{element?.category?.title} ({element.registration})</Select.Option>
            ))}
        </Select>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchAgencies: (filters) => dispatch(fetchAgencies(filters)),
    };
};

const mapStateToProps = (state) => {
    return {
        data: state.agency.data,
        loading: state.agency.loading,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AgencyRemoteSelectContainer);