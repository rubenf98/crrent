import { types } from "./types";
import axios from "axios";
import { stringify } from "query-string";

export const fetchBlockPeriods = (page = 1, filters = {}) => ({
    type: types.FETCH_BLOCK_PERIODS,
    payload: axios.get(`${window.location.origin}/api/blockPeriods?${stringify(filters, {
        arrayFormat: "index"
    })}&page=${page}`)
})

export const fetchBlockPeriodSelector = () => ({
    type: types.FETCH_BLOCK_PERIODS_SELECTOR,
    payload: axios.get(`${window.location.origin}/api/selector/blockPeriods`)
})

export const deleteBlockPeriod = id => ({
    type: types.DELETE_BLOCK_PERIOD,
    payload: axios.delete(`${window.location.origin}/api/blockPeriods/${id}`),
    meta: { id }
});

export const createBlockPeriod = (data) => ({
    type: types.CREATE_BLOCK_PERIOD,
    payload: axios.post(`${window.location.origin}/api/blockPeriods`, data),
});