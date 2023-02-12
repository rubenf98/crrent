import { types } from "./types";

export const initialState = {
    data: [],
    loading: false,
    current: {},
}

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case `${types.FETCH_AGENCIES}_PENDING`:
        case `${types.CREATE_AGENCY}_PENDING`:
        case `${types.FETCH_AGENCY}_PENDING`:
        case `${types.UPDATE_AGENCY}_PENDING`:
            return {
                ...state,
                loading: true,
            };

        case `${types.FETCH_AGENCY}_REJECTED`:
        case `${types.CREATE_AGENCY}_REJECTED`:
        case `${types.UPDATE_AGENCY}_REJECTED`:
            return {
                ...state,
                loading: false,
            };

        case `${types.FETCH_AGENCY}_FULFILLED`:
            return {
                ...state,
                loading: false,
                current: action.payload.data.data,
            };

        case `${types.CREATE_AGENCY}_FULFILLED`:
            return {
                ...state,
                loading: false,
                data: [...state.data, action.payload.data.data]
            };


        case `${types.FETCH_AGENCIES}_REJECTED`:
            return {
                ...state,
                loading: false,
                data: []
            };

        case `${types.UPDATE_AGENCY}_FULFILLED`:
            return {
                ...state,
                loading: false,
                data: state.data.map(
                    (record) =>
                        record.id === action.payload.data.data.id
                            ? action.payload.data.data
                            : record
                ),
                current: action.payload.data.data,
            };


        case `${types.FETCH_AGENCIES}_FULFILLED`:
            return {
                ...state,
                loading: false,
                data: action.payload.data.data,
            };

        case `${types.SET_CURRENT_AGENCY}`:
            return {
                ...state,
                loading: false,
                current: action.payload,
            };

        default:
            return state
    }
}