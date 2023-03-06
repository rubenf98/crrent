import { types } from "./types";

export const initialState = {
    data: [],
    loading: false,
    current: {},
}

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case `${types.DELETE_PROMOTION}_PENDING`:
        case `${types.CREATE_PROMOTION}_PENDING`:
        case `${types.UPDATE_PROMOTION}_PENDING`:
        case `${types.FETCH_PROMOTIONS}_PENDING`:
        case `${types.FETCH_PROMOTION}_PENDING`:
            return {
                ...state,
                loading: true,
            };

        case `${types.UPDATE_PROMOTION}_REJECTED`:
        case `${types.DELETE_PROMOTION}_REJECTED`:
        case `${types.CREATE_PROMOTION}_REJECTED`:
            return {
                ...state,
                loading: false,
            };


        case `${types.DELETE_PROMOTION}_FULFILLED`:
            return {
                ...state,
                loading: false,
                data: state.data.filter(
                    record => record.id !== action.meta.id
                )
            };

        case `${types.CREATE_PROMOTION}_FULFILLED`:
            return {
                ...state,
                loading: false,
                data: [action.payload.data.data, ...state.data]
            };


        case `${types.UPDATE_PROMOTION}_FULFILLED`:
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

        case `${types.FETCH_PROMOTION}_REJECTED`:
            return {
                ...state,
                loading: false,
                current: {},
            };
        case `${types.FETCH_PROMOTIONS}_REJECTED`:
            return {
                ...state,
                loading: false,
                data: []
            };
        case `${types.FETCH_PROMOTION}_FULFILLED`:
            return {
                ...state,
                loading: false,
                current: action.payload.data.data,
            };

        case `${types.FETCH_PROMOTIONS}_FULFILLED`:
            return {
                ...state,
                loading: false,
                data: action.payload.data.data,
            };

        case `${types.SET_CURRENT_PROMOTION}`:
            return {
                ...state,
                loading: false,
                current: action.payload,
            };

        default:
            return state
    }
}