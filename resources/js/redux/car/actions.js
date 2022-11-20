import { types } from "./types";
import axios from "axios";
import { stringify } from "query-string";

export const fetchCars = (filters = {}) => ({
    type: types.FETCH_CARS,
    payload: axios.get(`${window.location.origin}/api/cars?${stringify(filters, {
        arrayFormat: "index"
    })}`)
})

export const fetchCar = (id) => ({
    type: types.FETCH_CAR,
    payload: axios.get(`${window.location.origin}/api/cars/${id}`)
})

export const deleteCar = id => ({
    type: types.DELETE_CAR,
    payload: axios.delete(`${window.location.origin}/api/cars/${id}`),
    meta: { id }
});

export const updateCar = (id, data) => ({
    type: types.UPDATE_CAR,
    payload: axios.put(`${window.location.origin}/api/cars/${id}`, data),
});

export const createCar = (id, data) => ({
    type: types.CREATE_CAR,
    payload: axios.post(`${window.location.origin}/api/cars/${id}`, data),
});


export const setCurrent = (data) => ({
    type: types.SET_CURRENT,
    payload: data,
});