import { types } from "./types";

export function setLightTheme() {
    return {
        type: types.SET_LIGHT_THEME, payload: "light"
    };
}

export function setDarkTheme() {
    return {
        type: types.SET_DARK_THEME, payload: "dark"
    };
}

export function handleMenu(state) {
    return {
        type: types.HANDLE_MENU, payload: state
    };
}

export function handleForm(state, activity = []) {
    return {
        type: types.HANDLE_FORM, payload: [state, activity]
    };
}

