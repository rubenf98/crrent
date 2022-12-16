import { types } from "./types";

export const initialState = {
    data: [],
    todayData: [],
    loading: false,
    loadingDownload: false,
    meta: {},
    current: {},
    values: {},
    errors: [],
}

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case `${types.DELETE_RESERVATION}_PENDING`:
        case `${types.CONFIRM_RESERVATION}_PENDING`:
        case `${types.UPDATE_RESERVATION}_PENDING`:
        case `${types.CREATE_RESERVATION}_PENDING`:
        case `${types.FETCH_RESERVATIONS}_PENDING`:
        case `${types.FETCH_NEXT_RESERVATIONS}_PENDING`:
        case `${types.FETCH_TODAY_RESERVATIONS}_PENDING`:
        case `${types.FETCH_RESERVATION}_PENDING`:
            return {
                ...state,
                loading: true,
            };

        case `${types.UPDATE_RESERVATION}_REJECTED`:
        case `${types.DELETE_RESERVATION}_REJECTED`:
        case `${types.CREATE_RESERVATION}_REJECTED`:
        case `${types.CONFIRM_RESERVATION}_REJECTED`:
        case `${types.CONFIRM_RESERVATION}_FULFILLED`:
            return {
                ...state,
                loading: false,
            };

        case `${types.CREATE_RESERVATION}_FULFILLED`:
            return {
                ...state,
                loading: false,
                current: {},
                values: {},
                errors: [],
            };



        case `${types.DELETE_RESERVATION}_FULFILLED`:
            return {
                ...state,
                loading: false,
                data: state.data.filter(
                    record => record.id !== actiFETCH_TODAY_RESERVATIONSon.meta.id
                )
            };

        case `${types.UPDATE_RESERVATION}_FULFILLED`:
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

        case `${types.FETCH_RESERVATION}_REJECTED`:
            return {
                ...state,
                loading: false,
                current: {},
            };

        case `${types.FETCH_TODAY_RESERVATIONS}_REJECTED`:
            return {
                ...state,
                loading: false,
                todayData: []
            };

        case `${types.FETCH_NEXT_RESERVATIONS}_REJECTED`:
            return {
                ...state,
                loading: false,
                nextData: []
            };

        case `${types.FETCH_RESERVATIONS}_REJECTED`:
            return {
                ...state,
                loading: false,
                data: []
            };
        case `${types.FETCH_RESERVATION}_FULFILLED`:
            return {
                ...state,
                loading: false,
                current: action.payload.data.data,
            };

        case `${types.FETCH_TODAY_RESERVATIONS}_FULFILLED`:
            return {
                ...state,
                loading: false,
                todayData: action.payload.data,
            };

        case `${types.FETCH_NEXT_RESERVATIONS}_FULFILLED`:
            return {
                ...state,
                loading: false,
                nextData: action.payload.data.data,
            };

        case `${types.FETCH_RESERVATIONS}_FULFILLED`:
            return {
                ...state,
                loading: false,
                data: action.payload.data.data,
                meta: action.payload.data.meta,
            };

        case `${types.SET_CURRENT_RESERVATION}`:
            return {
                ...state,
                loading: false,
                current: action.payload,
            };

        case `${types.SET_CURRENT_RESERVATION_VALUES}`:
            return {
                ...state,
                loading: false,
                values: action.payload,
            };

        case `${types.SET_CURRENT_ERRORS}`:
            return {
                ...state,
                loading: false,
                errors: action.payload,
            };

        case `${types.DOWNLOAD_CONTRACT}_PENDING`:
            return {
                ...state,
                loadingDownload: true,
            };

        case `${types.DOWNLOAD_CONTRACT}_REJECTED`:
        case `${types.DOWNLOAD_CONTRACT}_FULFILLED`:
            return {
                ...state,
                loadingDownload: false,
            };


        default:
            return state
    }
}