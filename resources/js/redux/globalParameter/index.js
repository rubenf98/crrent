import { types } from "./types";

export const initialState = {
    data: [],
    loading: false,
    current: {},
    time: [],
    timeTax: [],
    dates: [],
    enableReservations: undefined,
}

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case `${types.FETCH_GLOBAL_PARAMETERS}_PENDING`:
        case `${types.DELETE_GLOBAL_PARAMETER}_PENDING`:
        case `${types.CREATE_GLOBAL_PARAMETER}_PENDING`:
        case `${types.UPDATE_GLOBAL_PARAMETER}_PENDING`:
            return {
                ...state,
                loading: true,
            };

        case `${types.FETCH_GLOBAL_PARAMETERS}_REJECTED`:
        case `${types.DELETE_GLOBAL_PARAMETER}_REJECTED`:
        case `${types.CREATE_GLOBAL_PARAMETER}_REJECTED`:
        case `${types.UPDATE_GLOBAL_PARAMETER}_REJECTED`:
            return {
                ...state,
                loading: false,
                data: [],
            };

        case `${types.UPDATE_GLOBAL_PARAMETER}_FULFILLED`:
            return {
                ...state,
                loading: false,
                data: action.payload.data.data,
                time: [
                    action.payload.data.data.find((e) => { return e.code === 'min_time' }).value,
                    action.payload.data.data.find((e) => { return e.code === 'max_time' }).value,
                ],
                timeTax: [
                    action.payload.data.data.find((e) => { return e.code === 'min_tax_time' }).value,
                    action.payload.data.data.find((e) => { return e.code === 'max_tax_time' }).value,
                ],
                dates: [
                    action.payload.data.data.find((e) => { return e.code === 'max_days' }).value,
                    action.payload.data.data.find((e) => { return e.code === 'max_date' }).value,
                ],
                enableReservations: action.payload.data.data.find((e) => { return e.code === 'enable_reservations' }).value,
            };

        case `${types.CREATE_GLOBAL_PARAMETER}_FULFILLED`:
            return {
                ...state,
                loading: false,
                data: [action.payload.data.data, ...state.data]
            };

        case `${types.DELETE_GLOBAL_PARAMETER}_FULFILLED`:
            return {
                ...state,
                loading: false,
                data: state.data.filter(
                    record => record.id !== action.meta.id
                )
            };

        case `${types.FETCH_GLOBAL_PARAMETERS}_FULFILLED`:
            return {
                ...state,
                loading: false,
                data: action.payload.data.data,
                time: [
                    parseInt(action.payload.data.data.find((e) => { return e.code === 'min_time' }).value),
                    parseInt(action.payload.data.data.find((e) => { return e.code === 'max_time' }).value),
                ],
                timeTax: [
                    parseInt(action.payload.data.data.find((e) => { return e.code === 'min_tax_time' }).value),
                    parseInt(action.payload.data.data.find((e) => { return e.code === 'max_tax_time' }).value),
                ],
                dates: [
                    parseInt(action.payload.data.data.find((e) => { return e.code === 'max_days' }).value),
                    action.payload.data.data.find((e) => { return e.code === 'max_date' }).value,
                ],
                enableReservations: parseInt(action.payload.data.data.find((e) => { return e.code === 'enable_reservations' }).value),
            };

        default:
            return state
    }
}