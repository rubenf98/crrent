import { types } from "./types";

export const initialState = {
    data: [],
    loading: false,
    current: {},
}

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case `${types.FETCH_GLOBAL_PARAMETERS}_PENDING`:
        case `${types.DELETE_GLOBAL_PARAMETER}_PENDING`:
        case `${types.CREATE_GLOBAL_PARAMETER}_PENDING`:
            return {
                ...state,
                loading: true,
            };

        case `${types.FETCH_GLOBAL_PARAMETERS}_REJECTED`:
        case `${types.DELETE_GLOBAL_PARAMETER}_REJECTED`:
        case `${types.CREATE_GLOBAL_PARAMETER}_REJECTED`:
            return {
                ...state,
                loading: false,
                data: [],
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
            };

        default:
            return state
    }
}