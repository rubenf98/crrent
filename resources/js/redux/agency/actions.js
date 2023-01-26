import { types } from "./types";
import axios from "axios";

export const fetchAgencies = () => ({
    type: types.FETCH_AGENCIES,
    payload: axios.get(`${window.location.origin}/api/agencies`)
})

export const updateAgency = (id, data) => ({
    type: types.UPDATE_AGENCY,
    payload: axios.put(`${window.location.origin}/api/agencies/${id}`, data),
})

export const deleteAgency = id => ({
    type: types.DELETE_AGENCY,
    payload: axios.delete(`${window.location.origin}/api/agencies/${id}`),
    meta: { id }
});


export const setCurrentAgency = (data = []) => ({
    type: types.SET_CURRENT_AGENCY,
    payload: data,
});

