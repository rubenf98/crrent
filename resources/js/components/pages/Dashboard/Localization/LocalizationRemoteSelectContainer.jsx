import { Select } from 'antd';
import React, { useEffect } from 'react'
import { connect } from "react-redux";
import { fetchLocalizations } from '../../../../redux/localization/actions';

function LocalizationRemoteSelectContainer({ fetchLocalizations, data, loading, value, onChange }) {
    useEffect(() => {
        fetchLocalizations()
    }, [])

    return (
        <Select
            value={value}
            onChange={onChange}
            loading={loading}
            allowClear
        >
            {data.map((element) => (
                <Select.Option key={element.id} value={element.id}>{element?.name?.pt} ({element.price}€)</Select.Option>
            ))}
        </Select>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetchLocalizations: (filters) => dispatch(fetchLocalizations(filters)),
    };
};

const mapStateToProps = (state) => {
    return {
        data: state.localization.data,
        loading: state.localization.loading,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LocalizationRemoteSelectContainer);