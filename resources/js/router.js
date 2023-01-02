import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { createBrowserHistory } from "history";

//public pages
import Homepage from "./components/pages/Homepage/Homepage";
import Layout from "./components/Layout";
import ScrollToTop from "./components/common/ScrollToTop";
import Garage from "./components/pages/Garage/Garage";
import Checkout from "./components/pages/Checkout/Checkout";
import Summary from "./components/pages/Checkout/Summary";
import Login from "./components/pages/Login";
import DashboardLayout from "./components/pages/Dashboard/DashboardLayout";
import Dashboard from "./components/pages/Dashboard/Dashboard";
import Extra from "./components/pages/Dashboard/Extra/Extra";
import Car from "./components/pages/Dashboard/Car/Car";
import Reservation from "./components/pages/Dashboard/Reservation/Reservation";
import Privacy from "./components/pages/Privacy";
import Conditions from "./components/pages/Conditions";
import Block from "./components/pages/Dashboard/Block/Block";
import Value from "./components/pages/Dashboard/Value/Value";
import Success from "./components/pages/Checkout/Success";
import Confirmation from "./components/pages/Checkout/Confirmation";
export const history = createBrowserHistory();

function Router() {
    return (
        <BrowserRouter history={history}>

            <Routes>

                <Route exact path="/" element={<Layout><Homepage /></Layout>} />


            </Routes>

        </BrowserRouter>
    );
};

export default Router;
