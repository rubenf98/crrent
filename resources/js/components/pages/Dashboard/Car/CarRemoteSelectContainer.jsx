import { Select } from 'antd';
import React, { useEffect, useState } from 'react'
import { connect } from "react-redux";
import { fetchCarsSelector } from '../../../../redux/car/actions';
import moment from "moment";

function CarRemoteSelectContainer({ fetchCarsSelector, exclude, visible, data, loading, value, onChange, dates }) {
    const [filters, setFilters] = useState({})

    useEffect(() => {
        var excludeFilter = {};

        if (exclude) {
            excludeFilter = { exclude: exclude };
        }

        fetchCarsSelector({ ...filters, ...excludeFilter })
    }, [filters])

    useEffect(() => {
        if (dates) {
            if (dates.pickup_date && dates.return_date) {
                setFilters({ from: moment(dates.pickup_date).format('YYYY-MM-DD HH:mm'), to: moment(dates.return_date).format('YYYY-MM-DD HH:mm') })
            } else {
                setFilters({})
            }
        } else {
            setFilters({})
        }
    }, [dates, visible])

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
        fetchCarsSelector: (filters) => dispatch(fetchCarsSelector(filters)),
    };
};

const mapStateToProps = (state) => {
    return {
        data: state.car.selector,
        loading: state.car.loading,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CarRemoteSelectContainer);