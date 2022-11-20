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