import { types } from "./types";

export const initialState = {
    data: [],
    availability: [],
    current: {},
    loading: false,
    selector: [],
    meta: {}
}

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case `${types.DELETE_CLIENT}_PENDING`:
        case `${types.CREATE_CLIENT}_PENDING`:
        case `${types.UPDATE_CLIENT}_PENDING`:
        case `${types.FETCH_CLIENTS_SELECTOR}_PENDING`:
        case `${types.FETCH_CLIENTS}_PENDING`:
        case `${types.FETCH_CLIENT}_PENDING`:
            return {
                ...state,
                loading: true,
            };

        case `${types.UPDATE_CLIENT}_REJECTED`:
        case `${types.DELETE_CLIENT}_REJECTED`:
        case `${types.CREATE_CLIENT}_REJECTED`:
            return {
                ...state,
                loading: false,
            };


        case `${types.CREATE_CLIENT}_FULFILLED`:
            return {
                ...state,
                loading: false,
                data: [...state.data, action.payload.data.data]
            };

        case `${types.DELETE_CLIENT}_FULFILLED`:
            return {
                ...state,
                loading: false,
                data: state.data.filter(
                    record => record.id !== action.meta.id
                )
            };

        case `${types.UPDATE_CLIENT}_FULFILLED`:
            return {
                ...state,
                loading: false,
                data: state.data.map(
                    (record) =>
                        record.id === action.payload.data.data.id
                            ? action.payload.data.data
                            : record
                ),
                current: state.current.id === action.payload.data.data.id ? action.payload.data.data : state.current,
            };

        case `${types.FETCH_CLIENT}_REJECTED`:
            return {
                ...state,
                loading: false,
                current: {},
            };


        case `${types.FETCH_CLIENTS}_REJECTED`:
            return {
                ...state,
                loading: false,
                data: []
            };

        case `${types.FETCH_CLIENTS_SELECTOR}_REJECTED`:
            return {
                ...state,
                loading: false,
                selector: []
            };

        case `${types.FETCH_CLIENT}_FULFILLED`:
            return {
                ...state,
                loading: false,
                current: action.payload.data.data,
            };

        case `${types.FETCH_CLIENTS_SELECTOR}_FULFILLED`:
            return {
                ...state,
                loading: false,
                selector: action.payload.data.data,
            };

        case `${types.FETCH_CLIENTS}_FULFILLED`:
            return {
                ...state,
                loading: false,
                data: action.payload.data.data,
                meta: action.payload.data.meta,
            };

        case `${types.SET_CURRENT_CLIENT}`:
            return {
                ...state,
                loading: false,
                current: action.payload,
            };

        default:
            return state
    }
}