import { types } from "./types";
import axios from "axios";

export const fetchExtras = () => ({
    type: types.FETCH_EXTRAS,
    payload: axios.get(`${window.location.origin}/api/extras`)
})

export const fetchExtra = (id) => ({
    type: types.FETCH_EXTRA,
    payload: axios.get(`${window.location.origin}/api/extras/${id}`)
})

export const deleteExtra = id => ({
    type: types.DELETE_EXTRA,
    payload: axios.delete(`${window.location.origin}/api/extras/${id}`),
    meta: { id }
});

export const updateExtra = (id, data) => ({
    type: types.UPDATE_EXTRA,
    payload: axios.put(`${window.location.origin}/api/extras/${id}`, data),
});

export const createExtra = (data) => ({
    type: types.CREATE_EXTRA,
    payload: axios.post(`${window.location.origin}/api/extras`, data),
});


export const setCurrentExtra = (data = []) => ({
    type: types.SET_CURRENT_EXTRA,
    payload: data,
});