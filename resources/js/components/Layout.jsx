import React, { useEffect } from "react";
import styled from "styled-components";
import Footer from "./common/Footer";
import Navbar from "./common/Navbar";
import NavbarMenu from "./common/NavbarMenu";
import ScrollToTop from "./common/ScrollToTop";
import ThemeContainer from "./ThemeContainer";
import { connect } from 'react-redux'
import { fetchGlobalParameters } from "../redux/globalParameter/actions";

const Container = styled.div`
    width: 100%;
    min-height: 100%;
    margin: auto;
    display: block;
    position: relative;
    box-sizing: border-box;
    overflow-x: hidden;
`;



export const Layout = ({ fetchGlobalParameters, children }) => {
    useEffect(() => {
        fetchGlobalParameters();
    }, [])

    return (
        <ThemeContainer>
            <ScrollToTop>
                <Container>
                    <Navbar />
                    <NavbarMenu />
                    <div> {children} </div>
                    <Footer />
                </Container>
            </ScrollToTop>
        </ThemeContainer>
    )
}



const mapDispatchToProps = (dispatch) => {
    return {
        fetchGlobalParameters: () => dispatch(fetchGlobalParameters())
    };
};

export default connect(null, mapDispatchToProps)(Layout);
