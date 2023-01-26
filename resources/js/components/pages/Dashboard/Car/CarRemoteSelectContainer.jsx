import { Select } from 'antd';
import React, { useEffect } from 'react'
import { connect } from "react-redux";
import { fetchCars } from '../../../../redux/car/actions';

function LevelRemoteSelectContainer({ fetchCars, data, loading, value, onChange }) {
    useEffect(() => {
        fetchCars()
    }, [])

    return (
        <Select
            value={value}
            onChange={onChange}
            loading={loading}
            showSearch
            optionFilterProp="registration"
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
        fetchCars: (filters) => dispatch(fetchCars(filters)),
    };
};

const mapStateToProps = (state) => {
    return {
        data: state.car.data,
        loading: state.car.loading,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LevelRemoteSelectContainer);