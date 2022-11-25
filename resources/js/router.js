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
export const history = createBrowserHistory();

function Router() {
    return (
        <BrowserRouter history={history}>
            <ScrollToTop>
                <Routes>
                    <Route
                        exact
                        path="/painel"
                        element={
                            <DashboardLayout><Dashboard /></DashboardLayout>
                        }
                    />
                    <Route path="/painel/datas" element={<DashboardLayout><Block /></DashboardLayout>} />
                    <Route path="/painel/reservas" element={<DashboardLayout><Reservation /></DashboardLayout>} />
                    <Route path="/painel/extras" element={<DashboardLayout><Extra /></DashboardLayout>} />
                    <Route path="/painel/carros" element={<DashboardLayout><Car /></DashboardLayout>} />
                    <Route path="/login" element={<Login />} />
                    <Route exact path="/privacy" element={<Layout><Privacy /></Layout>} />
                    <Route exact path="/conditions" element={<Layout><Conditions /></Layout>} />
                    <Route exact path="/summary" element={<Layout><Summary /></Layout>} />
                    <Route exact path="/garage" element={<Layout><Garage /></Layout>} />
                    <Route exact path="/checkout" element={<Layout><Checkout /></Layout>} />
                    <Route exact path="/" element={<Layout><Homepage /></Layout>} />


                </Routes>
            </ScrollToTop>
        </BrowserRouter>
    );
};

export default Router;
