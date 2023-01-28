import { types } from "./types";
import axios from "axios";

export const fetchInsurances = () => ({
    type: types.FETCH_INSURANCES,
    payload: axios.get(`${window.location.origin}/api/insurances`)
})

export const updateInsurance = (id, data) => ({
    type: types.UPDATE_INSURANCE,
    payload: axios.put(`${window.location.origin}/api/insurances/${id}`, data),
})

export const createInsurance = (data) => ({
    type: types.CREATE_INSURANCE,
    payload: axios.post(`${window.location.origin}/api/insurances`, data),
})

export const deleteInsurance = id => ({
    type: types.DELETE_INSURANCE,
    payload: axios.delete(`${window.location.origin}/api/insurances/${id}`),
    meta: { id }
});


export const setCurrentInsurance = (data = []) => ({
    type: types.SET_CURRENT_INSURANCE,
    payload: data,
});

