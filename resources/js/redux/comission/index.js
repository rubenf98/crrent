import { types } from "./types";

export const initialState = {
    data: [],
    loading: false,
    current: [],
}

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case `${types.FETCH_COMISSIONS}_PENDING`:
        case `${types.UPDATE_COMISSION}_PENDING`:
        case `${types.CREATE_COMISSION}_PENDING`:
            return {
                ...state,
                loading: true,
            };

        case `${types.UPDATE_COMISSION}_REJECTED`:
        case `${types.CREATE_COMISSION}_REJECTED`:
            return {
                ...state,
                loading: false,
            };

        case `${types.CREATE_COMISSION}_FULFILLED`:
            return {
                ...state,
                loading: false,
                data: [...state.data, action.payload.data.data]
            };


        case `${types.FETCH_COMISSIONS}_REJECTED`:
            return {
                ...state,
                loading: false,
                data: []
            };

        case `${types.UPDATE_COMISSION}_FULFILLED`:
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


        case `${types.FETCH_COMISSIONS}_FULFILLED`:
            return {
                ...state,
                loading: false,
                data: action.payload.data.data,
            };

        case `${types.SET_CURRENT_COMISSION}`:
            return {
                ...state,
                loading: false,
                current: action.payload,
            };

        default:
            return state
    }
}