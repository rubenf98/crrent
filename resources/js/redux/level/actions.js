import { types } from "./types";
import axios from "axios";
import { stringify } from "query-string";

export const fetchLevels = (page = 1, filters = {}) => ({
    type: types.FETCH_LEVELS,
    payload: axios.get(`${window.location.origin}/api/levels?${stringify(filters, {
        arrayFormat: "index"
    })}&page=${page}`)
})

export const fetchLevelsSelector = (filters = {}) => ({
    type: types.FETCH_LEVELS_SELECTOR,
    payload: axios.get(`${window.location.origin}/api/selector/levels?${stringify(filters, {
        arrayFormat: "index"
    })}`)
})

export const fetchLevelsAvailability = (filters = {}) => ({
    type: types.FETCH_LEVELS_AVAILABILITY,
    payload: axios.get(`${window.location.origin}/api/level-availability?${stringify(filters, {
        arrayFormat: "index"
    })}`)
})

export const fetchLevel = (id) => ({
    type: types.FETCH_LEVEL,
    payload: axios.get(`${window.location.origin}/api/levels/${id}`)
})

export const deleteLevel = id => ({
    type: types.DELETE_LEVEL,
    payload: axios.delete(`${window.location.origin}/api/levels/${id}`),
    meta: { id }
});

export const updateLevel = (id, data) => ({
    type: types.UPDATE_LEVEL,
    payload: axios.put(`${window.location.origin}/api/levels/${id}`, data),
});

export const createLevel = (data) => ({
    type: types.CREATE_LEVEL,
    payload: axios.post(`${window.location.origin}/api/levels/`, data),
});


export const setLevelStatus = (id, status) => ({
    type: types.SET_LEVEL_STATUS,
    payload: axios.put(`${window.location.origin}/api/level-status/${id}`, status),
});


export const setCurrent = (data = {}) => ({
    type: types.SET_CURRENT_LEVEL,
    payload: data,
});