import { types } from "./types";
import axios from "axios";
import { stringify } from "query-string";
import { download } from "../../components/helper";

export const fetchReservations = (page = 1, filters = {}) => ({
    type: types.FETCH_RESERVATIONS,
    payload: axios.get(`${window.location.origin}/api/reservations?${stringify(filters, {
        arrayFormat: "index"
    })}&page=${page}`)
})

export const fetchReservationsPerMonth = (filters = {}) => ({
    type: types.FETCH_RESERVATIONS_PER_MONTH,
    payload: axios.get(`${window.location.origin}/api/reservations-per-month?${stringify(filters, {
        arrayFormat: "index"
    })}`)
})

export const fetchReservationsArchive = (page = 1, filters = {}) => ({
    type: types.FETCH_RESERVATIONS_ARCHIVE,
    payload: axios.get(`${window.location.origin}/api/reservations-archive?${stringify(filters, {
        arrayFormat: "index"
    })}&page=${page}`)
})

export const fetchTodayReservations = () => ({
    type: types.FETCH_TODAY_RESERVATIONS,
    payload: axios.get(`${window.location.origin}/api/reservations-today`)
})

export const fetchNextReservations = () => ({
    type: types.FETCH_NEXT_RESERVATIONS,
    payload: axios.get(`${window.location.origin}/api/reservations-next`)
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


export const updateReservationStatus = (id, data) => ({
    type: types.UPDATE_RESERVATION_STATUS,
    payload: axios.put(`${window.location.origin}/api/update-reservation-status/${id}`, data),
});

export const updateReservationPayment = (id, data) => ({
    type: types.UPDATE_RESERVATION_PAYMENT,
    payload: axios.put(`${window.location.origin}/api/update-reservation-payment/${id}`, data),
});

export const updateReservation = (id, data) => ({
    type: types.UPDATE_RESERVATION,
    payload: axios.put(`${window.location.origin}/api/reservations/${id}`, data),
});

export const confirmReservation = (data) => ({
    type: types.CONFIRM_RESERVATION,
    payload: axios.put(`${window.location.origin}/api/confirm/reservation`, data),
});

export const errorReservation = (data) => ({
    type: types.ERROR_RESERVATION,
    payload: axios.put(`${window.location.origin}/api/error/reservation`, data),
});

export const createReservation = (data) => ({
    type: types.CREATE_RESERVATION,
    payload: axios.post(`${window.location.origin}/api/reservations`, data),
});

export const createExternalReservation = (data) => ({
    type: types.CREATE_EXTERNAL_RESERVATION,
    payload: axios.post(`${window.location.origin}/api/external-reservation`, data),
});

export const exportReservationCsv = (filters = {}) => ({
    type: types.EXPORT_RESERVATION_CSV,
    payload: axios({
        url: `${window.location.origin}/api/export/reservations?${stringify(filters, {
            arrayFormat: "index"
        })}`,
        method: "GET",
        responseType: "blob",
    }).then(
        response => {
            download(response, ' reservas.xlsx')
        },
        error => {
            return error.data;
        }
    ),
    meta: { globalError: true }
});


export const setCurrentReservation = (data) => ({
    type: types.SET_CURRENT_RESERVATION,
    payload: data,
});

export const setCurrentReservationValues = (data) => ({
    type: types.SET_CURRENT_RESERVATION_VALUES,
    payload: data,
});

export const setCurrentErrors = (data) => ({
    type: types.SET_CURRENT_ERRORS,
    payload: data,
});


export const downloadInvoice = (token, ext = "pdf") => ({
    type: types.DOWNLOAD_INVOICE,
    payload: axios({
        url: `${window.location.origin}/api/download/invoice`,
        data: { token: token },
        method: "POST",
        responseType: "blob",
    }).then(
        response => {
            download(response, token + '.' + ext)
        },
        error => {
            return error.data;
        }
    ),
});

export const downloadContract = (token, ext = "pdf") => ({
    type: types.DOWNLOAD_CONTRACT,
    payload: axios({
        url: `${window.location.origin}/api/download/contract`,
        data: { token: token },
        method: "POST",
        responseType: "blob",
    }).then(
        response => {
            download(response, token + '.' + ext)
        },
        error => {
            return error.data;
        }
    ),
});