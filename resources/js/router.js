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
import CarDetail from "./components/pages/Dashboard/CarDetail/CarDetail";
import Client from "./components/pages/Dashboard/Client/Client";
import ClientDetail from "./components/pages/Dashboard/ClientDetail/ClientDetail";
import GlobalParameter from "./components/pages/Dashboard/GlobalParameter/GlobalParameter";
import Error from "./components/pages/Checkout/Error";
import Agency from "./components/pages/Dashboard/Agency/Agency";
import AgencyDetail from "./components/pages/Dashboard/AgencyDetail/AgencyDetail";

export const history = createBrowserHistory();

function Router() {
    return (
        <BrowserRouter history={history}>

            <Routes>
                <Route
                    exact
                    path="/painel"
                    element={
                        <DashboardLayout><Dashboard /></DashboardLayout>
                    }
                />
                <Route path="/painel/agencias" element={<DashboardLayout><Agency /></DashboardLayout>} />
                <Route path="/painel/agencias/:id" element={<DashboardLayout><AgencyDetail /></DashboardLayout>} />
                <Route path="/painel/configuracao" element={<DashboardLayout><GlobalParameter /></DashboardLayout>} />
                <Route path="/painel/clientes" element={<DashboardLayout><Client /></DashboardLayout>} />
                <Route path="/painel/clientes/:id" element={<DashboardLayout><ClientDetail /></DashboardLayout>} />
                <Route path="/painel/datas" element={<DashboardLayout><Block /></DashboardLayout>} />
                <Route path="/painel/reservas" element={<DashboardLayout><Reservation /></DashboardLayout>} />
                <Route path="/painel/extras" element={<DashboardLayout><Extra /></DashboardLayout>} />
                <Route path="/painel/carros" element={<DashboardLayout><Car /></DashboardLayout>} />
                <Route path="/painel/carros/:id" element={<DashboardLayout><CarDetail /></DashboardLayout>} />
                <Route path="/painel/precos" element={<DashboardLayout><Value /></DashboardLayout>} />
                <Route path="/login" element={<Login />} />
                <Route exact path="/privacy" element={<Layout><Privacy /></Layout>} />
                <Route exact path="/conditions" element={<Layout><Conditions /></Layout>} />
                <Route exact path="/summary" element={<Layout><Summary /></Layout>} />
                <Route exact path="/garage" element={<Layout><Garage /></Layout>} />
                <Route exact path="/checkout" element={<Layout><Checkout /></Layout>} />
                <Route exact path="/success" element={<Layout><Success /></Layout>} />
                <Route exact path="/error" element={<Layout><Error /></Layout>} />
                <Route exact path="/confirmation" element={<Layout><Confirmation /></Layout>} />
                <Route exact path="/" element={<Layout><Homepage /></Layout>} />


            </Routes>

        </BrowserRouter>
    );
};

export default Router;
