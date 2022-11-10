import { types } from "./types";

export const initialState = {
    data: [],
    loading: false,
}

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case `${types.DELETE_EXTRA}_PENDING`:
        case `${types.UPDATE_EXTRA}_PENDING`:
        case `${types.FETCH_EXTRAS}_PENDING`:
        case `${types.FETCH_EXTRA}_PENDING`:
            return {
                ...state,
                loading: true,
            };

        case `${types.UPDATE_EXTRA}_REJECTED`:
        case `${types.DELETE_EXTRA}_REJECTED`:
            return {
                ...state,
                loading: false,
            };


        case `${types.DELETE_EXTRA}_FULFILLED`:
            return {
                ...state,
                loading: false,
                data: state.data.filter(
                    record => record.id !== action.meta.id
                )
            };

        case `${types.UPDATE_EXTRA}_FULFILLED`:
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

        case `${types.FETCH_EXTRA}_REJECTED`:
            return {
                ...state,
                loading: false,
                current: {},
            };
        case `${types.FETCH_EXTRAS}_REJECTED`:
            return {
                ...state,
                loading: false,
                data: []
            };
        case `${types.FETCH_EXTRA}_FULFILLED`:
            return {
                ...state,
                loading: false,
                current: action.payload.data.data,
            };

        case `${types.FETCH_EXTRAS}_FULFILLED`:
            return {
                ...state,
                loading: false,
                data: action.payload.data.data,
            };

        default:
            return state
    }
}