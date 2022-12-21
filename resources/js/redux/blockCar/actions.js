import { types } from "./types";
import axios from "axios";
import { stringify } from "query-string";

export const fetchBlockCars = (filters = {}) => ({
    type: types.FETCH_BLOCK_CARS,
    payload: axios.get(`${window.location.origin}/api/blockedCars?${stringify(filters, {
        arrayFormat: "index"
    })}`)
})

export const deleteBlockCar = id => ({
    type: types.DELETE_BLOCK_CAR,
    payload: axios.delete(`${window.location.origin}/api/blockedCars/${id}`),
    meta: { id }
});

export const createBlockCar = (data) => ({
    type: types.CREATE_BLOCK_CAR,
    payload: axios.post(`${window.location.origin}/api/blockedCars`, data),
});