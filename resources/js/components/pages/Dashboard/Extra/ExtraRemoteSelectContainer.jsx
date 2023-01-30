import { Select } from 'antd';
import React, { useEffect } from 'react'
import { connect } from "react-redux";
import { fetchExtras } from '../../../../redux/extra/actions';

function ExtraRemoteSelectContainer({ fetchExtras, data, loading, value, onChange }) {
    useEffect(() => {
        fetchExtras()
    }, [])

    return (
        <Select
            value={value}
            onChange={onChange}
            loading={loading}
            showSearch
            mode="multiple"
        >
            {data.map((element) => (
                <Select.Option key={element.id} value={element.id}>{element.name.pt} ({element.price}€ {element.type == "day" && "/dia"})</Select.Option>
            ))}
        </Select>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchExtras: (filters) => dispatch(fetchExtras(filters)),
    };
};

const mapStateToProps = (state) => {
    return {
        data: state.extra.data,
        loading: state.extra.loading,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ExtraRemoteSelectContainer);