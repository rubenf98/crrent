import { types } from "./types";
import axios from "axios";

export const fetchPromotions = () => ({
    type: types.FETCH_PROMOTIONS,
    payload: axios.get(`${window.location.origin}/api/promotions`)
})


export const setCurrentPromotion = (data = []) => ({
    type: types.SET_CURRENT_PROMOTION,
    payload: data,
});


export const deletePromotion = id => ({
    type: types.DELETE_PROMOTION,
    payload: axios.delete(`${window.location.origin}/api/promotions/${id}`),
    meta: { id }
});

export const createPromotion = (data) => ({
    type: types.CREATE_PROMOTION,
    payload: axios.post(`${window.location.origin}/api/promotions`, data),
});
