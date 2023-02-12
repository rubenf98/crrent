import { Select } from 'antd';
import React, { useEffect } from 'react'
import { connect } from "react-redux";
import { fetchCarCategoryRemoteSelector } from '../../../../redux/carCategory/actions';

function CarCategoryRemoteSelectContainer({ fetchCarCategoryRemoteSelector, data, loading, value, onChange }) {
    useEffect(() => {
        fetchCarCategoryRemoteSelector()
    }, [])

    return (
        <Select
            value={value}
            onChange={onChange}
            loading={loading}
            showSearch
            placeholder="Categoria de viaturas"
            optionFilterProp="name"
            filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
        >
            {data.map((element) => (
                <Select.Option key={element.id} value={element.id}>{element.title}</Select.Option>
            ))}
        </Select>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchCarCategoryRemoteSelector: (filters) => dispatch(fetchCarCategoryRemoteSelector(filters)),
    };
};

const mapStateToProps = (state) => {
    return {
        data: state.carCategory.list,
        loading: state.carCategory.loading,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CarCategoryRemoteSelectContainer);