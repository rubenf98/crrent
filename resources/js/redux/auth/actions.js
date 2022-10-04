import { types } from "./types";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { history } from "../../router";

export const login = data => {
    return (dispatch) => {
        const response = dispatch({
            type: types.LOGIN,
            payload: axios.post(`${window.location.origin}/api/login`, data)
        })

        response.then(
            res => {
                const token = res.value.data.access_token;
                localStorage.setItem("token", token);
                setAuthorizationToken(token);
                history.push("/painel");
                location.reload();
            },
            err => {

            }
        );
    }
};



export const me = () => ({
    type: types.ME,
    payload: axios.get(`${window.location.origin}/api/me`)
});

export function loginSuccess(token) {
    return {
        type: types.LOGIN_SUCCESS, payload: token
    };
}

export const logout = data => {
    return (dispatch) => {
        const response = dispatch({
            type: types.LOGOUT,
            payload: axios.post(`${window.location.origin}/api/logout`, data)
        })

        response.then((res) => {
            resetToken();
            history.push("/");
        })
    }
};

export function refreshAuthorizationToken(token) {
    return dispatch => {
        return axios.get({
            url: `${window.location.origin}/api/refresh`,
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(res => {
                const token = res.data.data.access_token;
                localStorage.setItem("token", token);
                setAuthorizationToken(token);
                dispatch(loginSuccess(jwtDecode(token)));
            })
            .catch(err => {
                resetToken();
            });
    };
}

export function setAuthorizationToken(token) {
    token ?
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`
        :
        delete axios.defaults.headers.common["Authorization"];
}

export function resetToken() {
    localStorage.removeItem("token");
    setAuthorizationToken(false);
}