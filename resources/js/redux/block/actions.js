import { types } from "./types";
import axios from "axios";
import { stringify } from "query-string";

export const fetchBlocks = (page = 1, filters = {}) => ({
    type: types.FETCH_BLOCKS,
    payload: axios.get(`${window.location.origin}/api/blockedDates?${stringify(filters, {
        arrayFormat: "index"
    })}&page=${page}`)
})


export const fetchBlocksSelector = (level) => ({
    type: types.FETCH_BLOCKS_SELECTOR,
    payload: axios.get(`${window.location.origin}/api/selector/blockedDates?car_id=${level}`)
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

