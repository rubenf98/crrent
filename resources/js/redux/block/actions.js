import { types } from "./types";
import axios from "axios";
import { stringify } from "query-string";

export const fetchBlocks = (page = 1, filters = {}) => ({
    type: types.FETCH_BLOCKS,
    payload: axios.get(`${window.location.origin}/api/blockedDates?${stringify(filters, {
        arrayFormat: "index"
    })}&page=${page}`)
})

export const hasBlock = (filters = {}) => ({
    type: types.HAS_BLOCK,
    payload: axios.get(`${window.location.origin}/api/hasblock?${stringify(filters, {
        arrayFormat: "index"
    })}`)
})

export const fetchBlocksSelector = (filters) => ({
    type: types.FETCH_BLOCKS_SELECTOR,
    payload: axios.get(`${window.location.origin}/api/selector/blockedDates?${stringify(filters, {
        arrayFormat: "index"
    })}`)
})

export const deleteBlock = id => ({
    type: types.DELETE_BLOCK,
    payload: axios.delete(`${window.location.origin}/api/blockedDates/${id}`),
    meta: { id }
});

export const createBlock = (data) => ({
    type: types.CREATE_BLOCK,
    payload: axios.post(`${window.location.origin}/api/blockedDates`, data),
});

