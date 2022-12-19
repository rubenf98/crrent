import { types } from "./types";
import axios from "axios";

export const fetchPrices = () => ({
    type: types.FETCH_PRICES,
    payload: axios.get(`${window.location.origin}/api/prices`)
})

export const updatePrice = (id, data) => ({
    type: types.UPDATE_PRICE,
    payload: axios.put(`${window.location.origin}/api/prices/${id}`, data),
})

export const deletePrice = id => ({
    type: types.DELETE_PRICE,
    payload: axios.delete(`${window.location.origin}/api/price/${id}`),
    meta: { id }
});


export const setCurrentPrice = (data = []) => ({
    type: types.SET_CURRENT_PRICE,
    payload: data,
});

