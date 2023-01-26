import { types } from "./types";
import axios from "axios";

export const fetchAgencies = () => ({
    type: types.FETCH_COMISSIONS,
    payload: axios.get(`${window.location.origin}/api/comissions`)
})

export const updateComission = (id, data) => ({
    type: types.UPDATE_COMISSION,
    payload: axios.put(`${window.location.origin}/api/comissions/${id}`, data),
})

export const createComission = (data) => ({
    type: types.CREATE_COMISSION,
    payload: axios.post(`${window.location.origin}/api/comissions`, data),
})

export const deleteComission = id => ({
    type: types.DELETE_COMISSION,
    payload: axios.delete(`${window.location.origin}/api/comissions/${id}`),
    meta: { id }
});


export const setCurrentComission = (data = []) => ({
    type: types.SET_CURRENT_COMISSION,
    payload: data,
});

