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
        case `${types.DELETE_CAR_CATEGORY}_PENDING`:
        case `${types.CREATE_CAR_CATEGORY}_PENDING`:
        case `${types.UPDATE_CAR_CATEGORY}_PENDING`:
        case `${types.FETCH_CAR_CATEGORY_SELECTOR}_PENDING`:
        case `${types.FETCH_CAR_CATEGORIES}_PENDING`:
        case `${types.FETCH_CAR_CATEGORY}_PENDING`:
        case `${types.SET_CAR_CATEGORY_STATUS}_PENDING`:
        case `${types.FETCH_CAR_CATEGORIES_AVAILABILITY}_PENDING`:
            return {
                ...state,
                loading: true,
            };

        case `${types.UPDATE_CAR_CATEGORY}_REJECTED`:
        case `${types.DELETE_CAR_CATEGORY}_REJECTED`:
        case `${types.CREATE_CAR_CATEGORY}_REJECTED`:
        case `${types.SET_CAR_CATEGORY_STATUS}_REJECTED`:
        case `${types.FETCH_CAR_CATEGORIES_AVAILABILITY}_REJECTED`:
            return {
                ...state,
                loading: false,
            };


        case `${types.CREATE_CAR_CATEGORY}_FULFILLED`:
            return {
                ...state,
                loading: false,
                data: [...state.data, action.payload.data.data]
            };

        case `${types.DELETE_CAR_CATEGORY}_FULFILLED`:
            return {
                ...state,
                loading: false,
                data: state.data.filter(
                    record => record.id !== action.meta.id
                )
            };

        case `${types.UPDATE_CAR_CATEGORY}_FULFILLED`:
        case `${types.SET_CAR_CATEGORY_STATUS}_FULFILLED`:
            return {
                ...state,
                loading: false,
                data: state.data.map(
                    (record) =>
                        record.id === action.payload.data.data.id
                            ? action.payload.data.data
                            : record
                ),
                current: state.current.id === action.payload.data.data.id ? action.payload.data.data : state.current,
            };

        case `${types.FETCH_CAR_CATEGORY}_REJECTED`:
            return {
                ...state,
                loading: false,
                current: {},
            };


        case `${types.FETCH_CAR_CATEGORIES}_REJECTED`:
            return {
                ...state,
                loading: false,
                data: []
            };

        case `${types.FETCH_CAR_CATEGORY_SELECTOR}_REJECTED`:
            return {
                ...state,
                loading: false,
                selector: []
            };

        case `${types.FETCH_CAR_CATEGORY}_FULFILLED`:
            return {
                ...state,
                loading: false,
                current: action.payload.data.data,
            };

        case `${types.FETCH_CAR_CATEGORY_SELECTOR}_FULFILLED`:
            return {
                ...state,
                loading: false,
                selector: action.payload.data.data,
            };

        case `${types.FETCH_CAR_CATEGORIES}_FULFILLED`:
            return {
                ...state,
                loading: false,
                data: action.payload.data.data,
                meta: action.payload.data.meta,
            };

        case `${types.FETCH_CAR_CATEGORIES_AVAILABILITY}_FULFILLED`:
            return {
                ...state,
                loading: false,
                availability: action.payload.data.data,
            };

        case `${types.SET_CURRENT_CAR_CATEGORY}`:
            return {
                ...state,
                loading: false,
                current: action.payload,
            };

        default:
            return state
    }
}