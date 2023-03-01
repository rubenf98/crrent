import { types } from "./types";

export const initialState = {
    data: [],
    todayData: [],
    nextData: [],
    dataArchive: [],
    dataPerMonth: [],
    loading: false,
    loadingDownload: false,
    meta: {},
    metaArchive: {},
    current: {},
    values: {},
    errors: [],
    loadingExport: false,
    change: 0,
    card: {},
}

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case `${types.EXPORT_RESERVATION_CSV}_PENDING`:
            return {
                ...state,
                loadingExport: true
            };

        case `${types.EXPORT_RESERVATION_CSV}_REJECTED`:
        case `${types.EXPORT_RESERVATION_CSV}_FULFILLED`:
            return {
                ...state,
                loadingExport: false
            };


        case `${types.FETCH_CARD}_PENDING`:
        case `${types.GET_CARD}_PENDING`:
        case `${types.DELETE_RESERVATION}_PENDING`:
        case `${types.CONFIRM_RESERVATION}_PENDING`:
        case `${types.ERROR_RESERVATION}_PENDING`:
        case `${types.UPDATE_RESERVATION}_PENDING`:
        case `${types.UPDATE_RESERVATION_STATUS}_PENDING`:
        case `${types.UPDATE_RESERVATION_PAYMENT}_PENDING`:
        case `${types.CREATE_RESERVATION}_PENDING`:
        case `${types.CREATE_EXTERNAL_RESERVATION}_PENDING`:
        case `${types.FETCH_RESERVATIONS}_PENDING`:
        case `${types.FETCH_NEXT_RESERVATIONS}_PENDING`:
        case `${types.FETCH_TODAY_RESERVATIONS}_PENDING`:
        case `${types.FETCH_RESERVATION}_PENDING`:
        case `${types.FETCH_RESERVATIONS_PER_MONTH}_PENDING`:
        case `${types.FETCH_RESERVATIONS_ARCHIVE}_PENDING`:
            return {
                ...state,
                loading: true,
            };

        case `${types.FETCH_CARD}_REJECTED`:
        case `${types.GET_CARD}_REJECTED`:
        case `${types.GET_CARD}_FULFILLED`:
        case `${types.UPDATE_RESERVATION}_REJECTED`:
        case `${types.UPDATE_RESERVATION_STATUS}_REJECTED`:
        case `${types.UPDATE_RESERVATION_PAYMENT}_REJECTED`:
        case `${types.DELETE_RESERVATION}_REJECTED`:
        case `${types.CREATE_RESERVATION}_REJECTED`:
        case `${types.CREATE_EXTERNAL_RESERVATION}_REJECTED`:
        case `${types.CONFIRM_RESERVATION}_REJECTED`:
        case `${types.ERROR_RESERVATION}_REJECTED`:
        case `${types.ERROR_RESERVATION}_FULFILLED`:
        case `${types.FETCH_RESERVATIONS_ARCHIVE}_REJECTED`:
        case `${types.CONFIRM_RESERVATION}_FULFILLED`:
            return {
                ...state,
                loading: false,
            };

        case `${types.FETCH_CARD}_FULFILLED`:
            return {
                ...state,
                loading: false,
                card: action.payload.data.data,
            };

        case `${types.CREATE_EXTERNAL_RESERVATION}_FULFILLED`:
            return {
                ...state,
                loading: false,
                data: [...state.data, action.payload.data.data],
                change: state.change + 1
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
                    record => record.id !== action.meta.id
                ),
                change: state.change + 1
            };

        case `${types.UPDATE_RESERVATION_STATUS}_FULFILLED`:
        case `${types.UPDATE_RESERVATION_PAYMENT}_FULFILLED`:
        case `${types.UPDATE_RESERVATION}_FULFILLED`:
            return {
                ...state,
                loading: false,
                data: state.data.map(
                    (record) =>
                        record.id === action.payload.data.data.id
                            ? action.payload.data.data
                            : record
                ),
                change: state.change + 1
            };

        case `${types.FETCH_RESERVATION}_REJECTED`:
            return {
                ...state,
                loading: false,
                current: {},
            };

        case `${types.FETCH_RESERVATIONS_PER_MONTH}_REJECTED`:
            return {
                ...state,
                loading: false,
                dataPerMonth: []
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

        case `${types.FETCH_RESERVATIONS_ARCHIVE}_FULFILLED`:
            return {
                ...state,
                loading: false,
                dataArchive: action.payload.data.data,
                metaArchive: action.payload.data.meta,
            };

        case `${types.FETCH_RESERVATIONS_PER_MONTH}_FULFILLED`:
            return {
                ...state,
                loading: false,
                dataPerMonth: action.payload.data.data,
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
                errors: []
            };

        case `${types.SET_CURRENT_ERRORS}`:
            return {
                ...state,
                loading: false,
                errors: action.payload,
            };
        case `${types.DOWNLOAD_INVOICE}_PENDING`:
        case `${types.DOWNLOAD_CONTRACT}_PENDING`:
            return {
                ...state,
                loadingDownload: true,
            };

        case `${types.DOWNLOAD_INVOICE}_REJECTED`:
        case `${types.DOWNLOAD_INVOICE}_FULFILLED`:
        case `${types.DOWNLOAD_CONTRACT}_REJECTED`:
        case `${types.DOWNLOAD_CONTRACT}_FULFILLED`:
            return {
                ...state,
                loadingDownload: false,
            };
        case `${types.SET_CARD}`:
            return {
                ...state,
                card: action.payload,
            };


        default:
            return state
    }
}