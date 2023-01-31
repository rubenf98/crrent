import { types } from "./types";
import axios from "axios";
import { stringify } from "query-string";

export const fetchCars = (page = 1, filters = {}) => ({
    type: types.FETCH_CARS,
    payload: axios.get(`${window.location.origin}/api/cars?${stringify(filters, {
        arrayFormat: "index"
    })}&page=${page}`)
})

export const fetchCarsSelector = (filters = {}) => ({
    type: types.FETCH_CARS_SELECTOR,
    payload: axios.get(`${window.location.origin}/api/selector/cars?${stringify(filters, {
        arrayFormat: "index"
    })}`)
})

export const fetchCarsAvailability = (filters = {}) => ({
    type: types.FETCH_CARS_AVAILABILITY,
    payload: axios.get(`${window.location.origin}/api/car-availability?${stringify(filters, {
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

export const createCar = (data) => ({
    type: types.CREATE_CAR,
    payload: axios.post(`${window.location.origin}/api/cars`, data),
});


export const setCarStatus = (id, status) => ({
    type: types.SET_CAR_STATUS,
    payload: axios.put(`${window.location.origin}/api/car-status/${id}`, status),
});


export const setCurrent = (data) => ({
    type: types.SET_CURRENT_CAR,
    payload: data,
});