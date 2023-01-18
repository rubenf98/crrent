import { Select } from 'antd';
import React, { useEffect } from 'react'
import { connect } from "react-redux";
import { fetchLevels } from '../../../../redux/level/actions';

function LevelRemoteSelectContainer({ fetchLevels, data, loading, value, onChange }) {
    useEffect(() => {
        fetchLevels()
    }, [])

    return (
        <Select
            value={value}
            onChange={onChange}
            loading={loading}
            showSearch
            placeholder="Grupo / Gama de viaturas"
            optionFilterProp="name"
            filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
        >
            {data.map((element) => (
                <Select.Option key={element.id} value={element.id}>{element.name} ({element.code})</Select.Option>
            ))}
        </Select>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchLevels: (filters) => dispatch(fetchLevels(filters)),
    };
};

const mapStateToProps = (state) => {
    return {
        data: state.level.data,
        loading: state.level.loading,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LevelRemoteSelectContainer);