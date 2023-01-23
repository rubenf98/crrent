import { types } from "./types";
import axios from "axios";
import { stringify } from "query-string";

export const fetchCarCategories = (page = 1, filters = {}) => ({
    type: types.FETCH_CAR_CATEGORIES,
    payload: axios.get(`${window.location.origin}/api/car-categories?${stringify(filters, {
        arrayFormat: "index"
    })}&page=${page}`)
})

export const fetchCarCategorySelector = (filters = {}) => ({
    type: types.FETCH_CAR_CATEGORY_SELECTOR,
    payload: axios.get(`${window.location.origin}/api/selector/car-categories?${stringify(filters, {
        arrayFormat: "index"
    })}`)
})

export const fetchCarCategoriesAvailability = (filters = {}) => ({
    type: types.FETCH_CAR_CATEGORIES_AVAILABILITY,
    payload: axios.get(`${window.location.origin}/api/car-availability?${stringify(filters, {
        arrayFormat: "index"
    })}`)
})

export const fetchCarCategory = (id) => ({
    type: types.FETCH_CAR_CATEGORY,
    payload: axios.get(`${window.location.origin}/api/car-categories/${id}`)
})

export const deleteCarCategory = id => ({
    type: types.DELETE_CAR_CATEGORY,
    payload: axios.delete(`${window.location.origin}/api/car-categories/${id}`),
    meta: { id }
});

export const updateCarCategory = (id, data) => ({
    type: types.UPDATE_CAR_CATEGORY,
    payload: axios.put(`${window.location.origin}/api/car-categories/${id}`, data),
});

export const createCarCategory = (data) => ({
    type: types.CREATE_CAR_CATEGORY,
    payload: axios.post(`${window.location.origin}/api/car-categories/`, data),
});


export const setCurrentCarCategory = (data) => ({
    type: types.SET_CURRENT_CAR_CATEGORY,
    payload: data,
});