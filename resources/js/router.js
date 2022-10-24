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
export const history = createBrowserHistory();

function Router() {
    return (
        <BrowserRouter history={history}>
            <ScrollToTop>
                <Routes>
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
