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
        case `${types.DELETE_LEVEL}_PENDING`:
        case `${types.CREATE_LEVEL}_PENDING`:
        case `${types.UPDATE_LEVEL}_PENDING`:
        case `${types.FETCH_LEVELS_SELECTOR}_PENDING`:
        case `${types.FETCH_LEVELS}_PENDING`:
        case `${types.FETCH_LEVEL}_PENDING`:
        case `${types.SET_LEVEL_STATUS}_PENDING`:
        case `${types.FETCH_LEVELS_AVAILABILITY}_PENDING`:
            return {
                ...state,
                loading: true,
            };

        case `${types.UPDATE_LEVEL}_REJECTED`:
        case `${types.DELETE_LEVEL}_REJECTED`:
        case `${types.CREATE_LEVEL}_REJECTED`:
        case `${types.SET_LEVEL_STATUS}_REJECTED`:
        case `${types.FETCH_LEVELS_AVAILABILITY}_REJECTED`:
            return {
                ...state,
                loading: false,
            };


        case `${types.CREATE_LEVEL}_FULFILLED`:
            return {
                ...state,
                loading: false,
                data: [...state.data, action.payload.data.data]
            };

        case `${types.DELETE_LEVEL}_FULFILLED`:
            return {
                ...state,
                loading: false,
                data: state.data.filter(
                    record => record.id !== action.meta.id
                )
            };

        case `${types.UPDATE_LEVEL}_FULFILLED`:
        case `${types.SET_LEVEL_STATUS}_FULFILLED`:
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

        case `${types.FETCH_LEVEL}_REJECTED`:
            return {
                ...state,
                loading: false,
                current: {},
            };


        case `${types.FETCH_LEVELS}_REJECTED`:
            return {
                ...state,
                loading: false,
                data: []
            };

        case `${types.FETCH_LEVELS_SELECTOR}_REJECTED`:
            return {
                ...state,
                loading: false,
                selector: []
            };

        case `${types.FETCH_LEVEL}_FULFILLED`:
            return {
                ...state,
                loading: false,
                current: action.payload.data.data,
            };

        case `${types.FETCH_LEVELS_SELECTOR}_FULFILLED`:
            return {
                ...state,
                loading: false,
                selector: action.payload.data.data,
            };

        case `${types.FETCH_LEVELS}_FULFILLED`:
            return {
                ...state,
                loading: false,
                data: action.payload.data.data,
                meta: action.payload.data.meta,
            };

        case `${types.FETCH_LEVELS_AVAILABILITY}_FULFILLED`:
            return {
                ...state,
                loading: false,
                availability: action.payload.data.data,
            };

        case `${types.SET_CURRENT_LEVEL}`:
            return {
                ...state,
                loading: false,
                current: action.payload,
            };

        default:
            return state
    }
}