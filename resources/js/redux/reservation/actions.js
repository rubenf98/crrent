import { types } from "./types";
import axios from "axios";

export const fetchReservations = () => ({
    type: types.FETCH_RESERVATIONS,
    payload: axios.get(`${window.location.origin}/api/reservations`)
})

export const fetchReservation = (id) => ({
    type: types.FETCH_RESERVATION,
    payload: axios.get(`${window.location.origin}/api/reservations/${id}`)
})

export const deleteReservation = id => ({
    type: types.DELETE_RESERVATION,
    payload: axios.delete(`${window.location.origin}/api/reservations/${id}`),
    meta: { id }
});

export const updateReservation = (id, data) => ({
    type: types.UPDATE_RESERVATION,
    payload: axios.put(`${window.location.origin}/api/reservations/${id}`, data),
});

export const createReservation = (data) => ({
    type: types.CREATE_RESERVATION,
    payload: axios.post(`${window.location.origin}/api/reservations/`, data),
});


export const setCurrentReservation = (data) => ({
    type: types.SET_CURRENT_RESERVATION,
    payload: data,
});

export const setCurrentReservationValues = (data) => ({
    type: types.SET_CURRENT_RESERVATION_VALUES,
    payload: data,
});
