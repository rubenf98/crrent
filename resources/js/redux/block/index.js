import { types } from "./types";

export const initialState = {
    data: [],
    loading: false,
    current: [],
}

export default (state = initialState, action = {}) => {
    switch (action.type) {
        case `${types.FETCH_BLOCKS}_PENDING`:
            return {
                ...state,
                loading: true,
            };



        case `${types.FETCH_BLOCKS}_REJECTED`:
            return {
                ...state,
                loading: false,
                data: []
            };


        case `${types.FETCH_BLOCKS}_FULFILLED`:
            return {
                ...state,
                loading: false,
                data: action.payload.data,
            };


        default:
            return state
    }
}