import { types } from "./types";
import axios from "axios";
import { stringify } from "query-string";

export const fetchGlobalParameters = (filters = {}) => ({
    type: types.FETCH_GLOBAL_PARAMETERS,
    payload: axios.get(`${window.location.origin}/api/globalParameters?${stringify(filters, {
        arrayFormat: "index"
    })}`)
})

export const deleteGlobalParameter = id => ({
    type: types.DELETE_GLOBAL_PARAMETER,
    payload: axios.delete(`${window.location.origin}/api/globalParameters/${id}`),
    meta: { id }
});

export const createGlobalParameter = (data) => ({
    type: types.CREATE_GLOBAL_PARAMETER,
    payload: axios.post(`${window.location.origin}/api/globalParameters`, data),
});