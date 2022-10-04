import { createRoot } from 'react-dom/client'
import React from 'react'
import Router from "./router";
import reducer from './reducer'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import promise from 'redux-promise-middleware'
import { Provider } from 'react-redux'
import jwtDecode from "jwt-decode";
import 'antd/dist/antd.css';
const container = document.getElementById('index');
const root = createRoot(container);
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    reducer,
    composeEnhancers(
        applyMiddleware(
            thunk,
            promise,
        )
    )
)
// if (!localStorage.language) {
//     localStorage.setItem("language", "en")
// }

// if (localStorage.token) {
//     const token = jwtDecode(localStorage.token);
//     const tokenExp = token.exp < Date.now() / 1000;

//     if (tokenExp) {
//         store.dispatch(refreshAuthorizationToken(localStorage.token));
//     } else {
//         store.dispatch(loginSuccess());
//         setAuthorizationToken(localStorage.token);
//     }
// }

root.render(
    <Provider store={store}>
        <Router />
    </Provider>
)
