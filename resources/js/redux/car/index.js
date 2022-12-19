import { types } from "./types";

export const initialState = {
    data: [],
    current: {},
    loading: false,
    selector: [],
    meta: {}
}

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case `${types.DELETE_CAR}_PENDING`:
        case `${types.CREATE_CAR}_PENDING`:
        case `${types.UPDATE_CAR}_PENDING`:
        case `${types.FETCH_CARS_SELECTOR}_PENDING`:
        case `${types.FETCH_CARS}_PENDING`:
        case `${types.FETCH_CAR}_PENDING`:
        case `${types.SET_CAR_STATUS}_PENDING`:
            return {
                ...state,
                loading: true,
            };

        case `${types.UPDATE_CAR}_REJECTED`:
        case `${types.DELETE_CAR}_REJECTED`:
        case `${types.CREATE_CAR}_REJECTED`:
        case `${types.SET_CAR_STATUS}_REJECTED`:
            return {
                ...state,
                loading: false,
            };


        case `${types.CREATE_CAR}_FULFILLED`:
            return {
                ...state,
                loading: false,
                data: [...state.data, action.payload.data.data]
            };

        case `${types.DELETE_CAR}_FULFILLED`:
            return {
                ...state,
                loading: false,
                data: state.data.filter(
                    record => record.id !== action.meta.id
                )
            };

        case `${types.UPDATE_CAR}_FULFILLED`:
        case `${types.SET_CAR_STATUS}_FULFILLED`:
            return {
                ...state,
                loading: false,
                data: state.data.map(
                    (record) =>
                        record.id === action.payload.data.data.id
                            ? action.payload.data.data
                            : record
                )
            };

        case `${types.FETCH_CAR}_REJECTED`:
            return {
                ...state,
                loading: false,
                current: {},
            };
        case `${types.FETCH_CARS}_REJECTED`:
            return {
                ...state,
                loading: false,
                data: []
            };

        case `${types.FETCH_CARS_SELECTOR}_REJECTED`:
            return {
                ...state,
                loading: false,
                selector: []
            };

        case `${types.FETCH_CAR}_FULFILLED`:
            return {
                ...state,
                loading: false,
                current: action.payload.data.data,
            };

        case `${types.FETCH_CARS_SELECTOR}_FULFILLED`:
            return {
                ...state,
                loading: false,
                selector: action.payload.data.data,
            };

        case `${types.FETCH_CARS}_FULFILLED`:
            return {
                ...state,
                loading: false,
                data: action.payload.data.data,
                meta: action.payload.data.meta,
            };

        case `${types.SET_CURRENT_CAR}`:
            return {
                ...state,
                loading: false,
                current: action.payload,
            };

        default:
            return state
    }
}