import { types } from "./types";
import axios from "axios";
import { stringify } from "query-string";

export const fetchClients = (page = 1, filters = {}) => ({
    type: types.FETCH_CLIENTS,
    payload: axios.get(`${window.location.origin}/api/clients?${stringify(filters, {
        arrayFormat: "index"
    })}&page=${page}`)
})

export const fetchClientsSelector = (filters = {}) => ({
    type: types.FETCH_CLIENTS_SELECTOR,
    payload: axios.get(`${window.location.origin}/api/selector/clients?${stringify(filters, {
        arrayFormat: "index"
    })}`)
})

export const fetchClient = (id) => ({
    type: types.FETCH_CLIENT,
    payload: axios.get(`${window.location.origin}/api/clients/${id}`)
})

export const deleteClient = id => ({
    type: types.DELETE_CLIENT,
    payload: axios.delete(`${window.location.origin}/api/clients/${id}`),
    meta: { id }
});

export const updateClient = (id, data) => ({
    type: types.UPDATE_CLIENT,
    payload: axios.put(`${window.location.origin}/api/clients/${id}`, data),
});

export const createClient = (data) => ({
    type: types.CREATE_CLIENT,
    payload: axios.post(`${window.location.origin}/api/clients/`, data),
});


export const setCurrentClient = (data) => ({
    type: types.SET_CURRENT_CLIENT,
    payload: data,
});