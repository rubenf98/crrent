import { types } from "./types";

export const initialState = {
    data: [],
    loading: false,
    current: [],
    selector: [],
    meta: {}
}

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case `${types.FETCH_BLOCKS}_PENDING`:
        case `${types.FETCH_BLOCKS_SELECTOR}_PENDING`:
        case `${types.CREATE_BLOCK}_PENDING`:
        case `${types.DELETE_BLOCK}_PENDING`:
            return {
                ...state,
                loading: true,
            };


        case `${types.CREATE_BLOCK}_REJECTED`:
            return {
                ...state,
                loading: false,
            };


        case `${types.DELETE_BLOCK}_REJECTED`:
        case `${types.FETCH_BLOCKS}_REJECTED`:
            return {
                ...state,
                loading: false,
                data: [],
                meta: {}
            };

        case `${types.CREATE_BLOCK}_FULFILLED`:
            return {
                ...state,
                loading: false,
                data: [...action.payload.data.data, ...state.data]
            };

        case `${types.DELETE_BLOCK}_FULFILLED`:
            return {
                ...state,
                loading: false,
                data: state.data.filter(
                    record => record.id !== action.meta.id
                )
            };

        case `${types.FETCH_BLOCKS_SELECTOR}_REJECTED`:
            return {
                ...state,
                loading: false,
                selector: []
            };

        case `${types.FETCH_BLOCKS_SELECTOR}_FULFILLED`:
            return {
                ...state,
                loading: false,
                selector: action.payload.data,
            };

        case `${types.FETCH_BLOCKS}_FULFILLED`:
            return {
                ...state,
                loading: false,
                data: action.payload.data.data,
                meta: action.payload.data.meta,
            };

        default:
            return state
    }
}