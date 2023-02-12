import { types } from "./types";

export const initialState = {
    data: [],
    taxData: [],
    loading: false,
    current: [],
}

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case `${types.FETCH_LOCALIZATIONS}_PENDING`:
        case `${types.UPDATE_LOCALIZATION}_PENDING`:
        case `${types.FETCH_TAX_LOCALIZATIONS}_PENDING`:
        case `${types.CREATE_LOCALIZATION}_PENDING`:
        case `${types.DELETE_LOCALIZATION}_PENDING`:
            return {
                ...state,
                loading: true,
            };

        case `${types.FETCH_TAX_LOCALIZATIONS}_REJECTED`:
        case `${types.UPDATE_LOCALIZATION}_REJECTED`:
        case `${types.CREATE_LOCALIZATION}_REJECTED`:
        case `${types.DELETE_LOCALIZATION}_REJECTED`:
            return {
                ...state,
                loading: false,
            };

        case `${types.DELETE_LOCALIZATION}_FULFILLED`:
            return {
                ...state,
                loading: false,
                data: state.data.filter(
                    record => record.id !== action.meta.id
                )
            };

        case `${types.CREATE_LOCALIZATION}_FULFILLED`:
            return {
                ...state,
                loading: false,
                data: [...state.data, action.payload.data.data]
            };


        case `${types.FETCH_LOCALIZATIONS}_REJECTED`:
            return {
                ...state,
                loading: false,
                data: []
            };

        case `${types.UPDATE_LOCALIZATION}_FULFILLED`:
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
        case `${types.FETCH_TAX_LOCALIZATIONS}_FULFILLED`:
            return {
                ...state,
                loading: false,
                taxData: action.payload.data.data,
            };

        case `${types.FETCH_LOCALIZATIONS}_FULFILLED`:
            return {
                ...state,
                loading: false,
                data: action.payload.data.data,
            };

        case `${types.SET_CURRENT_LOCALIZATION}`:
            return {
                ...state,
                loading: false,
                current: action.payload,
            };

        default:
            return state
    }
}